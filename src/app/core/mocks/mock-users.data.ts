import { SystemUser } from '../../features/users/domain/models/system-user.model';

export const MOCK_USERS: SystemUser[] = [
  {
    id: 'usr-1',
    name: 'Admin Mock',
    username: 'admin',
    email: 'admin@subclub.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'usr-2',
    name: 'Operador',
    username: 'operador',
    email: 'operador@subclub.com',
    role: 'operations',
    createdAt: '2024-02-15T00:00:00Z',
  },
];
