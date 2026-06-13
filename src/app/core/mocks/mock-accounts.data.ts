export type AccountStatus = 'active' | 'inactive' | 'cancelled' | 'suspended';

export interface MockAccount {
  id: string; name: string; email: string; document: string; slug: string;
  accountPlanId: string; subscriptionStatus: AccountStatus;
  subscriptionExpiresAt: string | null; active: boolean; createdAt: string;
}

export const MOCK_ACCOUNTS: MockAccount[] = [
  { id: 'acc-1', name: 'Café do Norte',  email: 'contato@cafenorte.com.br',  document: '12.345.678/0001-90', slug: 'cafe-do-norte', accountPlanId: 'ap-2', subscriptionStatus: 'active',   subscriptionExpiresAt: '2027-01-01T00:00:00Z', active: true,  createdAt: '2024-01-15T00:00:00Z' },
  { id: 'acc-2', name: 'Café Origem',    email: 'contato@cafeorigem.com.br', document: '98.765.432/0001-10', slug: 'cafe-origem',   accountPlanId: 'ap-1', subscriptionStatus: 'active',   subscriptionExpiresAt: '2026-12-31T00:00:00Z', active: true,  createdAt: '2024-02-01T00:00:00Z' },
  { id: 'acc-3', name: 'Grão Fino',      email: 'contato@graofino.com.br',   document: '11.222.333/0001-44', slug: 'grao-fino',     accountPlanId: 'ap-1', subscriptionStatus: 'inactive', subscriptionExpiresAt: null,                   active: false, createdAt: '2024-03-01T00:00:00Z' },
];
