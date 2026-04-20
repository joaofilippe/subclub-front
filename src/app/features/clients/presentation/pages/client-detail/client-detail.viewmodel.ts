import { Injectable, inject, signal } from '@angular/core';
import { ClientStore } from '../../../application/client.store';
import { SubscriptionService } from '../../../../subscriptions/application/subscription.service';
import { Subscription } from '../../../../subscriptions/domain/models/subscription.model';

@Injectable()
export class ClientDetailViewModel {
  private clientStore = inject(ClientStore);
  private subscriptionService = inject(SubscriptionService);

  readonly client = this.clientStore.selected;
  readonly loading = this.clientStore.loading;

  private _subscriptions = signal<Subscription[]>([]);
  private _loadingSubs = signal(false);
  readonly subscriptions = this._subscriptions.asReadonly();
  readonly loadingSubs = this._loadingSubs.asReadonly();

  load(id: string): void {
    this.clientStore.loadOne(id);
    this._loadingSubs.set(true);
    this.subscriptionService.getAll({ clientId: id }).subscribe({
      next: res => {
        this._subscriptions.set(res.data);
        this._loadingSubs.set(false);
      },
      error: () => this._loadingSubs.set(false)
    });
  }

  toggleActive(): void {
    const client = this.client();
    if (!client) return;
    this.clientStore.toggleActive(client.id, !client.active);
  }
}
