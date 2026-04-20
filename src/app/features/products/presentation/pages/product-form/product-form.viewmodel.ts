import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../application/product.service';

@Injectable()
export class ProductFormViewModel {
  private fb = inject(FormBuilder);
  private service = inject(ProductService);
  private router = inject(Router);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.group({
    name:        ['', Validators.required],
    description: ['', Validators.required],
    costPrice:   [0, [Validators.required, Validators.min(0.01)]],
    category:    ['outro', Validators.required],
    imageUrl:    [''],
    active:      [true],
  });

  load(id: string): void {
    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: product => {
        this.form.patchValue({
          name:        product.name,
          description: product.description,
          costPrice:   product.costPrice,
          category:    product.category,
          imageUrl:    product.imageUrl ?? '',
          active:      product.active,
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  save(id?: string): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    this.error.set(null);

    const request$ = id
      ? this.service.update(id, this.form.value as any)
      : this.service.create(this.form.value as any);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/products']);
      },
      error: err => {
        this.saving.set(false);
        this.error.set(err?.error?.message ?? 'Erro ao salvar produto');
      },
    });
  }
}
