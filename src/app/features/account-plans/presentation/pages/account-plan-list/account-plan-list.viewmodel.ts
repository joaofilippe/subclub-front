import { Injectable, inject, signal, computed } from '@angular/core';
import { AccountPlanStore } from '../../../application/account-plan.store';
import { AccountPlanService } from '../../../application/account-plan.service';

@Injectable()
export class AccountPlanListViewModel {
  private store   = inject(AccountPlanStore);
  private service = inject(AccountPlanService);

  readonly plans      = this.store.plans;
  readonly loading    = this.store.loading;
  readonly isEmpty    = this.store.isEmpty;
  readonly searchTerm = signal('');
  readonly removingId = signal<string | null>(null);

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.plans().filter(p => !term || p.name.toLowerCase().includes(term));
  });

  readonly counts = computed(() => ({
    total:    this.plans().length,
    active:   this.plans().filter(p => p.active).length,
    inactive: this.plans().filter(p => !p.active).length,
  }));

  load(): void { this.store.load(); }

  remove(id: string): void {
    this.removingId.set(id);
    this.service.remove(id).subscribe({
      next: () => { this.store.removeFromList(id); this.removingId.set(null); },
      error: ()  => this.removingId.set(null),
    });
  }
}
