import { Injectable, inject, signal, computed } from '@angular/core';
import { AccountPlan } from '../domain/models/account-plan.model';
import { AccountPlanService } from './account-plan.service';

@Injectable({ providedIn: 'root' })
export class AccountPlanStore {
  private service = inject(AccountPlanService);

  private _plans  = signal<AccountPlan[]>([]);
  private _loading = signal(false);

  readonly plans   = this._plans.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isEmpty = computed(() => this._plans().length === 0 && !this._loading());

  load(): void {
    this._loading.set(true);
    this.service.getAll().subscribe({
      next: list => { this._plans.set(list); this._loading.set(false); },
      error: ()   => this._loading.set(false),
    });
  }

  addToList(p: AccountPlan): void      { this._plans.update(l => [p, ...l]); }
  updateInList(p: AccountPlan): void   { this._plans.update(l => l.map(x => x.id === p.id ? p : x)); }
  removeFromList(id: string): void     { this._plans.update(l => l.filter(x => x.id !== id)); }
}
