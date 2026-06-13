export interface MockModule { id: string; name: string; active: boolean; createdAt: string; }

export const MOCK_MODULES: MockModule[] = [
  { id: 'mod-1', name: 'Gestão de Assinaturas', active: true,  createdAt: '2024-01-01T00:00:00Z' },
  { id: 'mod-2', name: 'Relatórios',            active: true,  createdAt: '2024-01-01T00:00:00Z' },
  { id: 'mod-3', name: 'Integrações',           active: false, createdAt: '2024-02-01T00:00:00Z' },
];
