import { Injectable, inject, signal, computed } from '@angular/core';
import { Product } from '../domain/models/product.model';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class ProductStore {
  private service = inject(ProductService);

  private _products = signal<Product[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly isEmpty = computed(() => this._products().length === 0 && !this._loading());

  load(): void {
    this._loading.set(true);
    this.service.getAll().subscribe({
      next: products => {
        this._products.set(products);
        this._loading.set(false);
      },
      error: err => {
        this._error.set(err?.error?.message ?? 'Erro ao carregar produtos');
        this._loading.set(false);
      }
    });
  }

  remove(id: string): void {
    this.service.delete(id).subscribe(() => {
      this._products.update(products => products.filter(p => p.id !== id));
    });
  }
}
