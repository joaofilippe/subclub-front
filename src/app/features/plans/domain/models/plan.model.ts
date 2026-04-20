export interface Plan {
  id: string;
  name: string;
  description: string;
  productValue: number;
  discountValue: number;
  price: number;
  intervalDays: number;
  active: boolean;
  imageUrl?: string;
  createdAt: string;
}

export interface PlanFilter {
  search?: string;
  active?: boolean;
}
