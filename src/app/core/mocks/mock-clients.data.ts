import { Client } from '../../features/clients/domain/models/client.model';
import { PagedResponse } from '../../shared/models/pagination.model';

export const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'João Figueiredo', email: 'joao@email.com', phone: '(11) 99999-0001', document: '111.111.111-01', active: true, createdAt: '2024-01-10T10:00:00Z',
    address: { zipCode: '01310-100', street: 'Av. Paulista', number: '1000', complement: 'Apto 42', neighborhood: 'Bela Vista', city: 'São Paulo', state: 'SP' } },
  { id: '2', name: 'Maria Souza', email: 'maria@email.com', phone: '(21) 99999-0002', document: '222.222.222-02', active: true, createdAt: '2024-02-14T10:00:00Z',
    address: { zipCode: '20040-020', street: 'Av. Rio Branco', number: '156', neighborhood: 'Centro', city: 'Rio de Janeiro', state: 'RJ' } },
  { id: '3', name: 'Carlos Lima', email: 'carlos@email.com', phone: '(31) 99999-0003', document: '333.333.333-03', active: false, createdAt: '2024-03-05T10:00:00Z',
    address: { zipCode: '30112-010', street: 'Av. Afonso Pena', number: '3000', complement: 'Sala 5', neighborhood: 'Centro', city: 'Belo Horizonte', state: 'MG' } },
  { id: '4', name: 'Ana Paula Costa', email: 'ana@email.com', phone: '(41) 99999-0004', document: '444.444.444-04', active: true, createdAt: '2024-03-20T10:00:00Z',
    address: { zipCode: '80010-020', street: 'Rua XV de Novembro', number: '700', neighborhood: 'Centro', city: 'Curitiba', state: 'PR' } },
  { id: '5', name: 'Pedro Alves', email: 'pedro@email.com', phone: '(51) 99999-0005', document: '555.555.555-05', active: false, createdAt: '2024-04-01T10:00:00Z',
    address: { zipCode: '90010-150', street: 'Rua dos Andradas', number: '1200', complement: 'Casa', neighborhood: 'Centro Histórico', city: 'Porto Alegre', state: 'RS' } },
  { id: '6', name: 'Fernanda Rocha', email: 'fernanda@email.com', phone: '(61) 99999-0006', document: '666.666.666-06', active: true, createdAt: '2024-04-15T10:00:00Z',
    address: { zipCode: '70040-010', street: 'Esplanada dos Ministérios', number: 'Bloco B', neighborhood: 'Plano Piloto', city: 'Brasília', state: 'DF' } },
];

export const MOCK_CLIENTS_PAGED: PagedResponse<Client> = {
  data: MOCK_CLIENTS,
  pagination: { page: 1, pageSize: 10, total: MOCK_CLIENTS.length }
};
