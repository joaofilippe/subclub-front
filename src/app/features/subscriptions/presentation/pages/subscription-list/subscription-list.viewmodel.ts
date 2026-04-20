import { Injectable, inject, signal, computed } from '@angular/core';
import { SubscriptionStore } from '../../../application/subscription.store';
import { SubscriptionFilter, SubscriptionStatus } from '../../../domain/models/subscription.model';

@Injectable()
export class SubscriptionListViewModel {
  private store = inject(SubscriptionStore);

  readonly subscriptions = this.store.subscriptions;
  readonly loading = this.store.loading;
  readonly pagination = this.store.pagination;
  readonly isEmpty = this.store.isEmpty;

  readonly searchTerm = signal('');
  readonly statusFilter = signal<SubscriptionStatus | ''>('');

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    return this.subscriptions().filter(s => {
      const matchesSearch = !term || s.clientName.toLowerCase().includes(term) || s.planName.toLowerCase().includes(term);
      const matchesStatus = !status || s.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  readonly statusCounts = computed(() => {
    const all = this.subscriptions();
    return {
      active: all.filter(s => s.status === 'active').length,
      paused: all.filter(s => s.status === 'paused').length,
      cancelled: all.filter(s => s.status === 'cancelled').length,
      expired: all.filter(s => s.status === 'expired').length,
    };
  });

  load(): void {
    this.store.load();
  }
}
