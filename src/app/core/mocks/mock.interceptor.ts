import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { MOCK_AUTH_RESPONSE } from './mock-auth.data';
import { MOCK_CLIENTS, MOCK_CLIENTS_PAGED } from './mock-clients.data';
import { MOCK_PLANS } from './mock-plans.data';
import { MOCK_SUBSCRIPTIONS, MOCK_SUBSCRIPTIONS_PAGED } from './mock-subscriptions.data';

const MOCK_DELAY_MS = 400;

function respond<T>(body: T) {
  return of(new HttpResponse({ status: 200, body })).pipe(delay(MOCK_DELAY_MS));
}

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  const { method, url } = req;
  const path = url.replace(/.*\/api/, '');

  // Auth
  if (method === 'POST' && path === '/auth/login') return respond(MOCK_AUTH_RESPONSE);
  if (method === 'POST' && path === '/auth/register') return respond({ message: 'Conta criada com sucesso' });

  // Clients
  if (method === 'GET' && path.startsWith('/clients') && !path.match(/\/clients\/.+/)) return respond(MOCK_CLIENTS_PAGED);
  if (method === 'GET' && path.match(/\/clients\/.+/)) {
    const id = path.split('/').pop();
    return respond(MOCK_CLIENTS.find(c => c.id === id) ?? null);
  }
  if (method === 'POST' && path === '/clients') return respond({ ...req.body as object, id: String(Date.now()), createdAt: new Date().toISOString() });
  if ((method === 'PUT' || method === 'PATCH') && path.match(/\/clients\/.+/)) {
    const id = path.split('/')[2];
    const client = MOCK_CLIENTS.find(c => c.id === id);
    return respond({ ...client, ...req.body as object });
  }

  // Plans
  if (method === 'GET' && path.startsWith('/plans') && !path.match(/\/plans\/.+/)) return respond(MOCK_PLANS);
  if (method === 'GET' && path.match(/\/plans\/.+/)) {
    const id = path.split('/').pop();
    return respond(MOCK_PLANS.find(p => p.id === id) ?? null);
  }
  if (method === 'POST' && path === '/plans') return respond({ ...req.body as object, id: String(Date.now()), createdAt: new Date().toISOString() });
  if (method === 'PUT' && path.match(/\/plans\/.+/)) {
    const id = path.split('/')[2];
    const plan = MOCK_PLANS.find(p => p.id === id);
    return respond({ ...plan, ...req.body as object });
  }
  if (method === 'DELETE' && path.match(/\/plans\/.+/)) return respond(null);

  // Subscriptions
  if (method === 'GET' && path.startsWith('/subscriptions') && !path.match(/\/subscriptions\/.+/)) {
    const clientId = req.params.get('clientId');
    const data = clientId ? MOCK_SUBSCRIPTIONS.filter(s => s.clientId === clientId) : MOCK_SUBSCRIPTIONS;
    return respond({ data, pagination: { page: 1, pageSize: 10, total: data.length } });
  }
  if (method === 'GET' && path.match(/\/subscriptions\/.+/)) {
    const id = path.split('/')[2];
    return respond(MOCK_SUBSCRIPTIONS.find(s => s.id === id) ?? null);
  }
  if (method === 'PATCH' && path.match(/\/subscriptions\/.+\/(cancel|pause|resume)/)) return respond(null);

  return next(req);
};
