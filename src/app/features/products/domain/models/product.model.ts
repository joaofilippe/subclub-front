export type ProductCategory = 'alimento' | 'bebida' | 'cosmetico' | 'vestuario' | 'decoracao' | 'outro';

export interface Product {
  id: string;
  name: string;
  description: string;
  costPrice: number;
  category: ProductCategory;
  imageUrl?: string;
  active: boolean;
  createdAt: string;
}

export interface ProductFilter {
  search?: string;
  category?: ProductCategory | 'all';
  active?: boolean;
}

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'alimento', label: 'Alimento' },
  { value: 'bebida', label: 'Bebida' },
  { value: 'cosmetico', label: 'Cosmético' },
  { value: 'vestuario', label: 'Vestuário' },
  { value: 'decoracao', label: 'Decoração' },
  { value: 'outro', label: 'Outro' },
];
