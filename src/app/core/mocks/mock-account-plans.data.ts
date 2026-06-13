export interface MockAccountPlan {
  id: string; name: string; description: string;
  price: number; maxCustomers: number; maxPlans: number; maxProducts: number;
  active: boolean; createdAt: string;
}

export const MOCK_ACCOUNT_PLANS: MockAccountPlan[] = [
  { id: 'ap-1', name: 'Starter',    description: 'Para pequenas cafeterias',      price: 99.90,  maxCustomers: 100,  maxPlans: 3,  maxProducts: 10, active: true,  createdAt: '2024-01-01T00:00:00Z' },
  { id: 'ap-2', name: 'Pro',        description: 'Para cafeterias em crescimento', price: 199.90, maxCustomers: 500,  maxPlans: 10, maxProducts: 30, active: true,  createdAt: '2024-01-01T00:00:00Z' },
  { id: 'ap-3', name: 'Enterprise', description: 'Para grandes redes',             price: 499.90, maxCustomers: 9999, maxPlans: 99, maxProducts: 99, active: true,  createdAt: '2024-01-01T00:00:00Z' },
];
