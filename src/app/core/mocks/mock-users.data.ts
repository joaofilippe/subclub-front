import { SystemUser } from '../../features/users/domain/models/system-user.model';

export const MOCK_USERS: SystemUser[] = [
  {
    id: 'usr-1',
    email: 'admin@subclub.com',
    name: 'Admin Mock',
    role: 'admin',
    type: 'system',
    active: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'usr-2',
    email: 'operador@subclub.com',
    name: 'Operador',
    role: 'operations',
    type: 'individual',
    active: true,
    createdAt: '2024-02-15T00:00:00Z',
  },
];
