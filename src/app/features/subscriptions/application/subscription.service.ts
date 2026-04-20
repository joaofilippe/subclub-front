import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { Subscription, SubscriptionFilter } from '../domain/models/subscription.model';
import { PagedResponse } from '../../../shared/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private api = inject(ApiService);

  getAll(filter: SubscriptionFilter = {}): Observable<PagedResponse<Subscription>> {
    return this.api.get<PagedResponse<Subscription>>('/subscriptions', filter as Record<string, string | number>);
  }

  getById(id: string): Observable<Subscription> {
    return this.api.get<Subscription>(`/subscriptions/${id}`);
  }

  cancel(id: string): Observable<void> {
    return this.api.patch<void>(`/subscriptions/${id}/cancel`, {});
  }

  pause(id: string): Observable<void> {
    return this.api.patch<void>(`/subscriptions/${id}/pause`, {});
  }

  resume(id: string): Observable<void> {
    return this.api.patch<void>(`/subscriptions/${id}/resume`, {});
  }
}
