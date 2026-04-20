import { Injectable, inject, signal, computed } from '@angular/core';
import { ClientStore } from '../../../application/client.store';

@Injectable()
export class ClientListViewModel {
  private store = inject(ClientStore);

  readonly clients = this.store.clients;
  readonly loading = this.store.loading;
  readonly isEmpty = this.store.isEmpty;

  readonly searchTerm = signal('');
  readonly activeFilter = signal<'all' | 'active' | 'inactive'>('all');

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const active = this.activeFilter();
    return this.clients().filter(c => {
      const matchesSearch = !term || c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term);
      const matchesActive = active === 'all' || (active === 'active' ? c.active : !c.active);
      return matchesSearch && matchesActive;
    });
  });

  readonly counts = computed(() => ({
    total: this.clients().length,
    active: this.clients().filter(c => c.active).length,
    inactive: this.clients().filter(c => !c.active).length,
  }));

  load(): void {
    this.store.load();
  }
}
