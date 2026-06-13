import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountPlanService } from '../../../application/account-plan.service';
import { AccountPlanStore } from '../../../application/account-plan.store';

@Injectable()
export class AccountPlanFormViewModel {
  private fb      = inject(FormBuilder);
  private service = inject(AccountPlanService);
  private store   = inject(AccountPlanStore);
  private router  = inject(Router);

  readonly loading = signal(false);
  readonly saving  = signal(false);
  readonly error   = signal<string | null>(null);

  readonly form = this.fb.group({
    name:         ['', Validators.required],
    description:  ['', Validators.required],
    price:        [0,  [Validators.required, Validators.min(0.01)]],
    maxCustomers: [100, [Validators.required, Validators.min(1)]],
    maxPlans:     [3,   [Validators.required, Validators.min(1)]],
    maxProducts:  [10,  [Validators.required, Validators.min(1)]],
    active:       [true],
  });

  load(id: string): void {
    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: p => {
        this.form.patchValue({ name: p.name, description: p.description, price: p.price,
          maxCustomers: p.maxCustomers, maxPlans: p.maxPlans, maxProducts: p.maxProducts, active: p.active });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  save(id?: string): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    this.saving.set(true);
    this.error.set(null);

    const payload = { name: v.name!, description: v.description!, price: v.price!,
      maxCustomers: v.maxCustomers!, maxPlans: v.maxPlans!, maxProducts: v.maxProducts!, active: v.active! };

    const req$ = id ? this.service.update(id, payload) : this.service.create(payload);

    req$.subscribe({
      next: p => {
        id ? this.store.updateInList(p) : this.store.addToList(p);
        this.saving.set(false);
        this.router.navigate(['/account-plans']);
      },
      error: err => { this.error.set(err?.error?.message ?? 'Erro ao salvar plano'); this.saving.set(false); },
    });
  }
}
