import { Subscription } from '../../features/subscriptions/domain/models/subscription.model';
import { PagedResponse } from '../../shared/models/pagination.model';

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'João Figueiredo',
    planId: '2',
    planName: 'Plano Premium',
    status: 'active',
    shipmentStatus: 'shipped',
    startDate: '2024-01-10T10:00:00Z',
    nextBillingDate: '2026-05-10T10:00:00Z',
    nextShipmentDate: '2026-05-10T10:00:00Z',
    daysUntilRenewal: 20,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Maria Souza',
    planId: '1',
    planName: 'Plano Básico',
    status: 'active',
    shipmentStatus: 'delivered',
    startDate: '2024-02-14T10:00:00Z',
    nextBillingDate: '2026-05-14T10:00:00Z',
    nextShipmentDate: '2026-05-14T10:00:00Z',
    daysUntilRenewal: 24,
    createdAt: '2024-02-14T10:00:00Z'
  },
  {
    id: '3',
    clientId: '4',
    clientName: 'Ana Paula Costa',
    planId: '2',
    planName: 'Plano Premium',
    status: 'active',
    shipmentStatus: 'preparing',
    startDate: '2024-03-20T10:00:00Z',
    nextBillingDate: '2026-04-25T10:00:00Z',
    nextShipmentDate: '2026-04-25T10:00:00Z',
    daysUntilRenewal: 5,
    createdAt: '2024-03-20T10:00:00Z'
  },
  {
    id: '4',
    clientId: '6',
    clientName: 'Fernanda Rocha',
    planId: '3',
    planName: 'Plano Trimestral',
    status: 'active',
    shipmentStatus: 'pending',
    startDate: '2024-04-15T10:00:00Z',
    nextBillingDate: '2026-07-15T10:00:00Z',
    nextShipmentDate: '2026-07-15T10:00:00Z',
    daysUntilRenewal: 86,
    createdAt: '2024-04-15T10:00:00Z'
  },
  {
    id: '5',
    clientId: '3',
    clientName: 'Carlos Lima',
    planId: '1',
    planName: 'Plano Básico',
    status: 'cancelled',
    shipmentStatus: 'delivered',
    startDate: '2024-03-05T10:00:00Z',
    nextBillingDate: '2024-04-05T10:00:00Z',
    nextShipmentDate: '2024-04-05T10:00:00Z',
    daysUntilRenewal: 0,
    createdAt: '2024-03-05T10:00:00Z'
  },
  {
    id: '6',
    clientId: '5',
    clientName: 'Pedro Alves',
    planId: '1',
    planName: 'Plano Básico',
    status: 'paused',
    shipmentStatus: 'delivered',
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
