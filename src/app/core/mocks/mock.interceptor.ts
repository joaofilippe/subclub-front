import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { MOCK_AUTH_RESPONSE } from './mock-auth.data';
import { MOCK_CLIENTS, MOCK_CLIENTS_PAGED } from './mock-clients.data';
import { MOCK_PLANS } from './mock-plans.data';
import { MOCK_PRODUCTS } from './mock-products.data';
import { MOCK_SUBSCRIPTIONS } from './mock-subscriptions.data';
import { MOCK_USERS } from './mock-users.data';
import { MOCK_MODULES } from './mock-modules.data';
import { MOCK_ACCOUNT_PLANS } from './mock-account-plans.data';
import { MOCK_ACCOUNTS } from './mock-accounts.data';
import { CreateUserRequest } from '../../features/users/domain/models/system-user.model';

const MOCK_DELAY_MS = 400;

function respond<T>(body: T) {
  return of(new HttpResponse({ status: 200, body })).pipe(delay(MOCK_DELAY_MS));
}

function crudHandlers<T extends { id: string }>(
  list: T[],
  basePath: string,
  method: string,
  path: string,
  body: unknown
): ReturnType<typeof respond> | null {
  const listRx  = new RegExp(`^/${basePath}$`);
  const itemRx  = new RegExp(`^/${basePath}/([^/]+)$`);
  const idMatch = path.match(itemRx);

  if (method === 'GET' && listRx.test(path)) return respond([...list]);
  if (method === 'POST' && listRx.test(path)) {
    const created = { ...(body as object), id: String(Date.now()), createdAt: new Date().toISOString() } as unknown as T;
    list.push(created);
    return respond(created);
  }
  if (idMatch) {
    const id = idMatch[1];
    const idx = list.findIndex(i => i.id === id);
    if (method === 'GET')    return respond(list[idx] ?? null);
    if (method === 'PUT' && idx !== -1) { list[idx] = { ...list[idx], ...(body as object) }; return respond(list[idx]); }
    if (method === 'DELETE') { if (idx !== -1) list.splice(idx, 1); return respond(null); }
  }
  return null;
}

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  const { method, url } = req;
  const path = url.replace(/.*\/api/, '');
  const body = req.body;

  // Auth
  if (method === 'POST' && path === '/auth/login') return respond(MOCK_AUTH_RESPONSE);
  if (method === 'POST' && path === '/auth/register') return respond({ message: 'Conta criada com sucesso' });
  if (method === 'PUT'  && path === '/auth/profile') return respond({ message: 'Perfil atualizado com sucesso' });
  if (method === 'POST' && path === '/auth/change-password') return respond({ message: 'Senha alterada com sucesso' });

  // Users (custom POST to inject name from email)
  if (method === 'GET' && path === '/users') return respond([...MOCK_USERS]);
  if (method === 'GET' && path.match(/^\/users\/[^/]+$/)) return respond(MOCK_USERS.find(u => u.id === path.split('/')[2]) ?? null);
  if (method === 'PUT' && path.match(/^\/users\/[^/]+$/)) {
    const idx = MOCK_USERS.findIndex(u => u.id === path.split('/')[2]);
    if (idx !== -1) { MOCK_USERS[idx] = { ...MOCK_USERS[idx], ...(body as object) }; return respond(MOCK_USERS[idx]); }
    return respond(null);
  }
  if (method === 'POST' && path === '/users') {
    const b = body as CreateUserRequest;
    const created = { id: String(Date.now()), name: b.email.split('@')[0], ...b, active: true, createdAt: new Date().toISOString() };
    MOCK_USERS.push(created);
    return respond(created);
  }
  if (method === 'DELETE' && path.match(/^\/users\/[^/]+$/)) {
    const idx = MOCK_USERS.findIndex(u => u.id === path.split('/')[2]);
    if (idx !== -1) MOCK_USERS.splice(idx, 1);
    return respond(null);
  }

  // Admin: Modules, Account Plans, Accounts
  const modulesResult      = crudHandlers(MOCK_MODULES,       'modules',       method, path, body);
  if (modulesResult) return modulesResult;

  const accountPlansResult = crudHandlers(MOCK_ACCOUNT_PLANS, 'account-plans', method, path, body);
  if (accountPlansResult) return accountPlansResult;

  const accountsResult     = crudHandlers(MOCK_ACCOUNTS,      'accounts',      method, path, body);
  if (accountsResult) return accountsResult;

  // Customers (previously /clients)
  if (method === 'GET' && path.startsWith('/customers') && !path.match(/\/customers\/.+/)) return respond(MOCK_CLIENTS_PAGED);
  if (method === 'GET' && path.match(/\/customers\/.+/)) return respond(MOCK_CLIENTS.find(c => c.id === path.split('/')[2]) ?? null);
  if (method === 'POST' && path === '/customers') return respond({ ...(body as object), id: String(Date.now()), createdAt: new Date().toISOString() });
  if ((method === 'PUT' || method === 'PATCH') && path.match(/\/customers\/.+/)) {
    const client = MOCK_CLIENTS.find(c => c.id === path.split('/')[2]);
    return respond({ ...client, ...(body as object) });
  }

  // Plans
  if (method === 'GET' && path.startsWith('/plans') && !path.match(/\/plans\/.+/)) return respond(MOCK_PLANS);
  if (method === 'GET' && path.match(/\/plans\/.+/)) return respond(MOCK_PLANS.find(p => p.id === path.split('/')[2]) ?? null);
  if (method === 'POST' && path === '/plans') return respond({ ...(body as object), id: String(Date.now()), createdAt: new Date().toISOString() });
  if (method === 'PUT' && path.match(/\/plans\/.+/)) { const p = MOCK_PLANS.find(p => p.id === path.split('/')[2]); return respond({ ...p, ...(body as object) }); }
  if (method === 'DELETE' && path.match(/\/plans\/.+/)) return respond(null);

  // Products
  if (method === 'GET' && path.startsWith('/products') && !path.match(/\/products\/.+/)) return respond(MOCK_PRODUCTS);
  if (method === 'GET' && path.match(/\/products\/.+/)) return respond(MOCK_PRODUCTS.find(p => p.id === path.split('/')[2]) ?? null);
  if (method === 'POST' && path === '/products') return respond({ ...(body as object), id: String(Date.now()), createdAt: new Date().toISOString() });
  if (method === 'PUT' && path.match(/\/products\/.+/)) { const p = MOCK_PRODUCTS.find(p => p.id === path.split('/')[2]); return respond({ ...p, ...(body as object) }); }
  if (method === 'DELETE' && path.match(/\/products\/.+/)) return respond(null);

  // Subscriptions
  if (method === 'GET' && path.startsWith('/subscriptions') && !path.match(/\/subscriptions\/.+/)) {
    const clientId = req.params.get('clientId');
    const data = clientId ? MOCK_SUBSCRIPTIONS.filter(s => s.clientId === clientId) : MOCK_SUBSCRIPTIONS;
    return respond({ data, pagination: { page: 1, pageSize: 10, total: data.length } });
  }
  if (method === 'GET' && path.match(/\/subscriptions\/.+/)) return respond(MOCK_SUBSCRIPTIONS.find(s => s.id === path.split('/')[2]) ?? null);
  if (method === 'PATCH' && path.match(/\/subscriptions\/.+\/(cancel|pause|resume)/)) return respond(null);

  return next(req);
};
