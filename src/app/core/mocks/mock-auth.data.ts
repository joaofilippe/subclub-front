import { AuthResponse } from '../auth/auth.model';

export const MOCK_AUTH_RESPONSE: AuthResponse = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  user: {
    id: '1',
    name: 'Admin Mock',
    email: 'admin@subclub.com',
    role: 'admin'
  }
};
