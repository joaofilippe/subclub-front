import { Injectable, inject, signal, computed } from '@angular/core';
import { Account } from '../domain/models/account.model';
import { AccountTenantService } from './account-tenant.service';

@Injectable({ providedIn: 'root' })
export class AccountTenantStore {
  private service = inject(AccountTenantService);

  private _accounts = signal<Account[]>([]);
  private _loading  = signal(false);

  readonly accounts = this._accounts.asReadonly();
  readonly loading  = this._loading.asReadonly();
  readonly isEmpty  = computed(() => this._accounts().length === 0 && !this._loading());

  load(): void {
    this._loading.set(true);
    this.service.getAll().subscribe({
      next: list => { this._accounts.set(list); this._loading.set(false); },
      error: ()   => this._loading.set(false),
    });
  }

  addToList(a: Account): void     { this._accounts.update(l => [a, ...l]); }
  updateInList(a: Account): void  { this._accounts.update(l => l.map(x => x.id === a.id ? a : x)); }
  removeFromList(id: string): void{ this._accounts.update(l => l.filter(x => x.id !== id)); }
}
