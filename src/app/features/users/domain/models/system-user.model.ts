import { UserRole } from '../../../../core/auth/auth.model';

export interface SystemUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateUserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserRequest {
  name: string;
  role: UserRole;
}
