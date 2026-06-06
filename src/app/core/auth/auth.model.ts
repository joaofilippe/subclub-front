export interface LoginRequest {
  email: string;
  password: string;
}

export type UserRole = 'admin' | 'operations';
export type UserType = 'individual' | 'corporate' | 'system';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  type: UserType;
  accountSlug: string;
}

export interface JwtClaims {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
  type: UserType;
  account_slug: string;
  exp: number;
  iat: number;
}
