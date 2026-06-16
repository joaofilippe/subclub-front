import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { Subscription, SubscriptionFilter, SubscriptionStatus, ShipmentStatus } from '../domain/models/subscription.model';
import { PagedResponse } from '../../../shared/models/pagination.model';

interface BackendSubscriptionDTO {
  id: string;
  customerId: string;
  customerName: string;
  planId: string;
  planName: string;
  status: SubscriptionStatus;
  shipmentStatus: ShipmentStatus;
  startDate: string;
  nextBillingDate: string;
  nextShipmentDate: string;
  daysUntilRenewal: number;
  createdAt: string;
}

interface BackendPagedResponse {
  items: BackendSubscriptionDTO[];
  totalCount: number;
}

function toSubscription(dto: BackendSubscriptionDTO): Subscription {
  return {
    id: dto.id,
    clientId: dto.customerId,
    clientName: dto.customerName,
    planId: dto.planId,
    planName: dto.planName,
    status: dto.status,
    shipmentStatus: dto.shipmentStatus,
    startDate: dto.startDate,
    nextBillingDate: dto.nextBillingDate,
    nextShipmentDate: dto.nextShipmentDate,
    daysUntilRenewal: dto.daysUntilRenewal,
    createdAt: dto.createdAt,
  };
}

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private api = inject(ApiService);

  getAll(filter: SubscriptionFilter = {}): Observable<PagedResponse<Subscription>> {
    const params: Record<string, string | number> = {};
    if (filter.clientId)  params['customerId'] = filter.clientId;
    if (filter.status)    params['status']     = filter.status;
    if (filter.page)      params['page']       = filter.page;
    if (filter.pageSize)  params['pageSize']   = filter.pageSize;

    return this.api.get<BackendPagedResponse>('/subscriptions', params).pipe(
      map(res => ({
        data: (res.items ?? []).map(toSubscription),
        pagination: { page: filter.page ?? 1, pageSize: filter.pageSize ?? 10, total: res.totalCount ?? 0 },
      }))
    );
  }

  getById(id: string): Observable<Subscription> {
    return this.api.get<BackendSubscriptionDTO>(`/subscriptions/${id}`).pipe(
      map(toSubscription)
    );
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
