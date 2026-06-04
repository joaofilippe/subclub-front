import { Subscription } from '../../features/subscriptions/domain/models/subscription.model';
import { PagedResponse } from '../../shared/models/pagination.model';

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    customerId: '1',
    customerName: 'João Figueiredo',
    planId: '2',
    planName: 'Plano Premium',
    status: 'ACTIVE',
    shipmentStatus: 'SHIPPED',
    startDate: '2024-01-10T10:00:00Z',
    nextBillingDate: '2026-05-10T10:00:00Z',
    nextShipmentDate: '2026-05-10T10:00:00Z',
    daysUntilRenewal: 20,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    customerId: '2',
    customerName: 'Maria Souza',
    planId: '1',
    planName: 'Plano Básico',
    status: 'ACTIVE',
    shipmentStatus: 'DELIVERED',
    startDate: '2024-02-14T10:00:00Z',
    nextBillingDate: '2026-05-14T10:00:00Z',
    nextShipmentDate: '2026-05-14T10:00:00Z',
    daysUntilRenewal: 24,
    createdAt: '2024-02-14T10:00:00Z'
  },
  {
    id: '3',
    customerId: '4',
    customerName: 'Ana Paula Costa',
    planId: '2',
    planName: 'Plano Premium',
    status: 'ACTIVE',
    shipmentStatus: 'PREPARING',
    startDate: '2024-03-20T10:00:00Z',
    nextBillingDate: '2026-04-25T10:00:00Z',
    nextShipmentDate: '2026-04-25T10:00:00Z',
    daysUntilRenewal: 5,
    createdAt: '2024-03-20T10:00:00Z'
  },
  {
    id: '4',
    customerId: '6',
    customerName: 'Fernanda Rocha',
    planId: '3',
    planName: 'Plano Trimestral',
    status: 'ACTIVE',
    shipmentStatus: 'PENDING',
    startDate: '2024-04-15T10:00:00Z',
    nextBillingDate: '2026-07-15T10:00:00Z',
    nextShipmentDate: '2026-07-15T10:00:00Z',
    daysUntilRenewal: 86,
    createdAt: '2024-04-15T10:00:00Z'
  },
  {
    id: '5',
    customerId: '3',
    customerName: 'Carlos Lima',
    planId: '1',
    planName: 'Plano Básico',
    status: 'CANCELLED',
    shipmentStatus: 'DELIVERED',
    startDate: '2024-03-05T10:00:00Z',
    nextBillingDate: '2024-04-05T10:00:00Z',
    nextShipmentDate: '2024-04-05T10:00:00Z',
    daysUntilRenewal: 0,
    createdAt: '2024-03-05T10:00:00Z'
  },
  {
    id: '6',
    customerId: '5',
    customerName: 'Pedro Alves',
    planId: '1',
    planName: 'Plano Básico',
    status: 'PAUSED',
    shipmentStatus: 'DELIVERED',
    startDate: '2024-04-01T10:00:00Z',
    nextBillingDate: '2026-05-01T10:00:00Z',
    nextShipmentDate: '2026-05-01T10:00:00Z',
    daysUntilRenewal: 11,
    createdAt: '2024-04-01T10:00:00Z'
  }
];

export const MOCK_SUBSCRIPTIONS_PAGED: PagedResponse<Subscription> = {
  data: MOCK_SUBSCRIPTIONS,
  pagination: { page: 1, pageSize: 10, total: MOCK_SUBSCRIPTIONS.length }
};
