export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'expired';
export type ShipmentStatus = 'pending' | 'preparing' | 'shipped' | 'delivered';

export interface Subscription {
  id: string;
  clientId: string;
  clientName: string;
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

export interface SubscriptionFilter {
  search?: string;
  status?: SubscriptionStatus;
  clientId?: string;
  page?: number;
  pageSize?: number;
}
