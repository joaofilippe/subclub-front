import { Plan } from '../../features/plans/domain/models/plan.model';

export const MOCK_PLANS: Plan[] = [
  {
    id: '1',
    code: 'BASICO',
    name: 'Plano Básico',
    description: 'Receba todo mês uma seleção especial de produtos artesanais.',
    productValue: 120.00,
    discountValue: 30.10,
    price: 89.90,
    intervalDays: 30,
    active: true,
    imageUrl: 'https://placehold.co/400x300?text=Basico',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    code: 'PREMIUM',
    name: 'Plano Premium',
    description: 'Produtos exclusivos e embalagem especial entregues mensalmente.',
    productValue: 200.00,
    discountValue: 50.10,
    price: 149.90,
    intervalDays: 30,
    active: true,
    imageUrl: 'https://placehold.co/400x300?text=Premium',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '3',
    code: 'TRIMESTRAL',
    name: 'Plano Trimestral',
    description: 'A melhor experiência com envio a cada 3 meses.',
    productValue: 500.00,
    discountValue: 100.10,
    price: 399.90,
    intervalDays: 90,
    active: true,
    imageUrl: 'https://placehold.co/400x300?text=Trimestral',
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: '4',
    code: 'LEGADO',
    name: 'Plano Legado',
    description: 'Plano descontinuado.',
    productValue: 80.00,
    discountValue: 20.10,
    price: 59.90,
    intervalDays: 30,
    active: false,
    createdAt: '2023-06-01T10:00:00Z'
  }
];
