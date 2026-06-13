import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountTenantService } from '../../../application/account-tenant.service';
import { AccountTenantStore } from '../../../application/account-tenant.store';
import { AccountPlanService } from '../../../../account-plans/application/account-plan.service';
import { AccountPlan } from '../../../../account-plans/domain/models/account-plan.model';

@Injectable()
export class AccountFormViewModel {
  private fb            = inject(FormBuilder);
  private service       = inject(AccountTenantService);
  private store         = inject(AccountTenantStore);
  private planService   = inject(AccountPlanService);
  private router        = inject(Router);

  readonly loading      = signal(false);
  readonly saving       = signal(false);
  readonly error        = signal<string | null>(null);
  readonly accountPlans = signal<AccountPlan[]>([]);

  readonly form = this.fb.group({
    name:                  ['', Validators.required],
    email:                 ['', [Validators.required, Validators.email]],
    document:              ['', Validators.required],
    slug:                  ['', Validators.required],
    accountPlanId:         ['', Validators.required],
    subscriptionStatus:    ['active'],
    subscriptionExpiresAt: [''],
    active:                [true],
  });

  loadPlans(): void {
    this.planService.getAll().subscribe({ next: plans => this.accountPlans.set(plans) });
  }

  load(id: string): void {
    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: a => {
        this.form.patchValue({
          name: a.name, email: a.email, document: a.document, slug: a.slug,
          accountPlanId: a.accountPlanId, subscriptionStatus: a.subscriptionStatus,
          subscriptionExpiresAt: a.subscriptionExpiresAt ? a.subscriptionExpiresAt.substring(0, 10) : '',
          active: a.active,
        });
        this.form.get('slug')?.disable();
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

    const expiresAt = v.subscriptionExpiresAt ? new Date(v.subscriptionExpiresAt).toISOString() : null;

    const req$ = id
      ? this.service.update(id, {
          name: v.name!, email: v.email!, document: v.document!, accountPlanId: v.accountPlanId!,
          subscriptionStatus: v.subscriptionStatus as any, subscriptionExpiresAt: expiresAt, active: v.active!,
        })
      : this.service.create({
          name: v.name!, email: v.email!, document: v.document!, slug: v.slug!, accountPlanId: v.accountPlanId!,
        });

    req$.subscribe({
      next: a => {
        id ? this.store.updateInList(a) : this.store.addToList(a);
        this.saving.set(false);
        this.router.navigate(['/accounts']);
      },
      error: err => { this.error.set(err?.error?.message ?? 'Erro ao salvar conta'); this.saving.set(false); },
    });
  }
}
