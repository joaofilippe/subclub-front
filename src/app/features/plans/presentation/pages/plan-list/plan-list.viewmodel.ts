import { Injectable, inject, signal, computed } from '@angular/core';
import { PlanStore } from '../../../application/plan.store';

@Injectable()
export class PlanListViewModel {
  private store = inject(PlanStore);

  readonly plans = this.store.plans;
  readonly loading = this.store.loading;
  readonly isEmpty = this.store.isEmpty;

  readonly searchTerm = signal('');
  readonly activeFilter = signal<'all' | 'active' | 'inactive'>('all');

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const active = this.activeFilter();
    return this.plans().filter(p => {
      const matchesSearch = !term || p.name.toLowerCase().includes(term);
      const matchesActive = active === 'all' || (active === 'active' ? p.active : !p.active);
      return matchesSearch && matchesActive;
    });
  });

  load(): void {
    this.store.load();
  }

  delete(id: string): void {
    this.store.remove(id);
  }
}
