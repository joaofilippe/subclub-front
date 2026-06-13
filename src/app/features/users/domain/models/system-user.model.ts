import { UserRole, UserType } from '../../../../core/auth/auth.model';

export interface SystemUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  type: UserType;
  active: boolean;
  createdAt: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: UserRole;
  type: UserType;
}

export interface UpdateUserRequest {
  email: string;
  role: UserRole;
  type: UserType;
}
