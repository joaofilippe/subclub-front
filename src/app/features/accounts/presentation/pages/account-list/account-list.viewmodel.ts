import { Injectable, inject, signal, computed } from '@angular/core';
import { AccountTenantStore } from '../../../application/account-tenant.store';
import { AccountTenantService } from '../../../application/account-tenant.service';

@Injectable()
export class AccountListViewModel {
  private store   = inject(AccountTenantStore);
  private service = inject(AccountTenantService);

  readonly accounts   = this.store.accounts;
  readonly loading    = this.store.loading;
  readonly isEmpty    = this.store.isEmpty;
  readonly searchTerm = signal('');
  readonly removingId = signal<string | null>(null);

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.accounts().filter(a =>
      !term || a.name.toLowerCase().includes(term) || a.email.toLowerCase().includes(term) || a.slug.toLowerCase().includes(term)
    );
  });

  readonly counts = computed(() => ({
    total:    this.accounts().length,
    active:   this.accounts().filter(a => a.active).length,
    inactive: this.accounts().filter(a => !a.active).length,
  }));

  load(): void { this.store.load(); }

  remove(id: string): void {
    this.removingId.set(id);
    this.service.remove(id).subscribe({
      next: () => { this.store.removeFromList(id); this.removingId.set(null); },
      error: ()  => this.removingId.set(null),
    });
  }

  statusLabel(s: string): string {
    const map: Record<string, string> = { active: 'Ativo', inactive: 'Inativo', cancelled: 'Cancelado', suspended: 'Suspenso' };
    return map[s] ?? s;
  }
}
