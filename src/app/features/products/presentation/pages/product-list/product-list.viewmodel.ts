import { Injectable, inject, signal, computed } from '@angular/core';
import { ProductStore } from '../../../application/product.store';
import { ProductCategory } from '../../../domain/models/product.model';

@Injectable()
export class ProductListViewModel {
  private store = inject(ProductStore);

  readonly products = this.store.products;
  readonly loading = this.store.loading;
  readonly isEmpty = this.store.isEmpty;

  readonly searchTerm = signal('');
  readonly categoryFilter = signal<ProductCategory | 'all'>('all');
  readonly activeFilter = signal<'all' | 'active' | 'inactive'>('all');

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.categoryFilter();
    const active = this.activeFilter();
    return this.products().filter(p => {
      const matchesSearch = !term || p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term);
      const matchesCategory = category === 'all' || p.category === category;
      const matchesActive = active === 'all' || (active === 'active' ? p.active : !p.active);
      return matchesSearch && matchesCategory && matchesActive;
    });
  });

  load(): void {
    this.store.load();
  }

  delete(id: string): void {
    this.store.remove(id);
  }
}
