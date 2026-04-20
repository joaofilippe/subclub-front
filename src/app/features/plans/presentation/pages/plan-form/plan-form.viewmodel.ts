import { Injectable, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { PlanService } from '../../../application/plan.service';

function discountNotExceedsProduct(control: AbstractControl): ValidationErrors | null {
  const productValue = control.parent?.get('productValue')?.value ?? 0;
  const discountValue = control.value ?? 0;
  return discountValue >= productValue ? { discountExceedsProduct: true } : null;
}

@Injectable()
export class PlanFormViewModel {
  private fb = inject(FormBuilder);
  private service = inject(PlanService);
  private router = inject(Router);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.group({
    name:         ['', Validators.required],
    description:  ['', Validators.required],
    imageUrl:     [''],
    productValue: [0, [Validators.required, Validators.min(0.01)]],
    discountValue:[0, [Validators.required, Validators.min(0), discountNotExceedsProduct]],
    intervalDays: [30, [Validators.required, Validators.min(1)]],
    active:       [true],
  });

  private readonly formValues = toSignal(this.form.valueChanges, { initialValue: this.form.value });

  readonly finalPrice = computed(() => {
    const v = this.formValues();
    const p = Number(v.productValue ?? 0);
    const d = Number(v.discountValue ?? 0);
    return Math.max(0, p - d);
  });

  readonly discountPercent = computed(() => {
    const v = this.formValues();
    const p = Number(v.productValue ?? 0);
    const d = Number(v.discountValue ?? 0);
    if (p <= 0) return 0;
    return Math.min(100, (d / p) * 100);
  });

  load(id: string): void {
    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: plan => {
        this.form.patchValue({
          name: plan.name,
          description: plan.description,
          imageUrl: plan.imageUrl ?? '',
          productValue: plan.productValue,
          discountValue: plan.discountValue,
          intervalDays: plan.intervalDays,
          active: plan.active,
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  save(id?: string): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload = { ...this.form.value, price: this.finalPrice() };
    this.saving.set(true);
    this.error.set(null);

    const request$ = id
      ? this.service.update(id, payload as any)
      : this.service.create(payload as any);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/plans']);
      },
      error: err => {
        this.saving.set(false);
        this.error.set(err?.error?.message ?? 'Erro ao salvar plano');
      },
    });
  }
}
