import { Product } from '../../features/products/domain/models/product.model';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mel Orgânico',
    description: 'Mel puro produzido por abelhas nativas, sem aditivos.',
    costPrice: 25.00,
    category: 'alimento',
    active: true,
    imageUrl: 'https://placehold.co/400x300?text=Mel',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    name: 'Café Especial Arábica',
    description: 'Grãos selecionados de altitude, torra média.',
    costPrice: 35.00,
    category: 'bebida',
    active: true,
    imageUrl: 'https://placehold.co/400x300?text=Cafe',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    name: 'Creme Hidratante Natural',
    description: 'Hidratante facial com ingredientes naturais e veganos.',
    costPrice: 42.00,
    category: 'cosmetico',
    active: true,
    imageUrl: 'https://placehold.co/400x300?text=Creme',
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: '4',
    name: 'Camiseta Algodão Orgânico',
    description: 'Confeccionada com algodão 100% orgânico e tingimento natural.',
    costPrice: 55.00,
    category: 'vestuario',
    active: true,
    imageUrl: 'https://placehold.co/400x300?text=Camiseta',
    createdAt: '2024-02-10T10:00:00Z'
  },
  {
    id: '5',
    name: 'Vela Aromática Lavanda',
    description: 'Vela artesanal de cera de soja com essência de lavanda.',
    costPrice: 30.00,
    category: 'decoracao',
    active: true,
    imageUrl: 'https://placehold.co/400x300?text=Vela',
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: '6',
    name: 'Granola Artesanal',
    description: 'Mix de grãos, frutas secas e sementes, sem açúcar refinado.',
    costPrice: 18.00,
    category: 'alimento',
    active: false,
    createdAt: '2023-11-01T10:00:00Z'
  }
];
