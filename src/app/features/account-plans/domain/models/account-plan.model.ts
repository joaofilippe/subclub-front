export interface AccountPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  maxCustomers: number;
  maxPlans: number;
  maxProducts: number;
  active: boolean;
  createdAt: string;
}

export interface AccountPlanRequest {
  name: string;
  description: string;
  price: number;
  maxCustomers: number;
  maxPlans: number;
  maxProducts: number;
  active: boolean;
}
