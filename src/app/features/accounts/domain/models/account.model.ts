export type AccountStatus = 'active' | 'inactive' | 'cancelled' | 'suspended';

export interface Account {
  id: string;
  name: string;
  email: string;
  document: string;
  slug: string;
  accountPlanId: string;
  subscriptionStatus: AccountStatus;
  subscriptionExpiresAt: string | null;
  active: boolean;
  createdAt: string;
}

export interface CreateAccountRequest {
  name: string;
  email: string;
  document: string;
  slug: string;
  accountPlanId: string;
}

export interface UpdateAccountRequest {
  name: string;
  email: string;
  document: string;
  accountPlanId: string;
  subscriptionStatus: AccountStatus;
  subscriptionExpiresAt: string | null;
  active: boolean;
}
