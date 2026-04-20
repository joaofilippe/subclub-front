import { Injectable, inject, signal, computed } from '@angular/core';
import { Subscription, SubscriptionFilter } from '../domain/models/subscription.model';
import { SubscriptionService } from './subscription.service';
import { Pagination } from '../../../shared/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionStore {
  private service = inject(SubscriptionService);

  private _subscriptions = signal<Subscription[]>([]);
  private _selected = signal<Subscription | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  private _pagination = signal<Pagination>({ page: 1, pageSize: 10, total: 0 });

  readonly subscriptions = this._subscriptions.asReadonly();
  readonly selected = this._selected.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly pagination = this._pagination.asReadonly();
  readonly isEmpty = computed(() => this._subscriptions().length === 0 && !this._loading());

  load(filter: SubscriptionFilter = {}): void {
    this._loading.set(true);
    this.service.getAll(filter).subscribe({
      next: res => {
        this._subscriptions.set(res.data);
        this._pagination.set(res.pagination);
        this._loading.set(false);
      },
      error: err => {
        this._error.set(err?.error?.message ?? 'Erro ao carregar assinaturas');
        this._loading.set(false);
      }
    });
  }

  loadOne(id: string): void {
    this._loading.set(true);
    this.service.getById(id).subscribe({
      next: sub => {
        this._selected.set(sub);
        this._loading.set(false);
      },
      error: err => {
        this._error.set(err?.error?.message ?? 'Erro ao carregar assinatura');
        this._loading.set(false);
      }
    });
  }
}
