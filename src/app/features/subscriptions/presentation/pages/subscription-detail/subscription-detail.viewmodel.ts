import { Injectable, inject } from '@angular/core';
import { SubscriptionStore } from '../../../application/subscription.store';
import { SubscriptionService } from '../../../application/subscription.service';

@Injectable()
export class SubscriptionDetailViewModel {
  private store = inject(SubscriptionStore);
  private service = inject(SubscriptionService);

  readonly subscription = this.store.selected;
  readonly loading = this.store.loading;

  load(id: string): void {
    this.store.loadOne(id);
  }

  cancel(id: string): void {
    this.service.cancel(id).subscribe(() => this.store.loadOne(id));
  }

  pause(id: string): void {
    this.service.pause(id).subscribe(() => this.store.loadOne(id));
  }

  resume(id: string): void {
    this.service.resume(id).subscribe(() => this.store.loadOne(id));
  }
}
