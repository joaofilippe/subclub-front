export interface Address {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  active: boolean;
  address?: Address;
  createdAt: string;
}

export interface ClientFilter {
  search?: string;
  active?: boolean;
  page?: number;
  pageSize?: number;
}
