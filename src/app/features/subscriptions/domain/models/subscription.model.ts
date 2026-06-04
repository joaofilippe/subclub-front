export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED';
export type ShipmentStatus = 'PENDING' | 'PREPARING' | 'SHIPPED' | 'DELIVERED';

export interface Subscription {
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

export interface SubscriptionFilter {
  search?: string;
  status?: SubscriptionStatus;
  customerId?: string;
  page?: number;
  pageSize?: number;
}
