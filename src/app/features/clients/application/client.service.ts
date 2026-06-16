import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { Client, ClientFilter } from '../domain/models/client.model';
import { PagedResponse } from '../../../shared/models/pagination.model';

function extractItems<T>(res: unknown): T[] {
  if (Array.isArray(res)) return res as T[];
  const r = res as Record<string, unknown>;
  if (Array.isArray(r['items'])) return r['items'] as T[];
  if (Array.isArray(r['data'])) return r['data'] as T[];
  const nested = r['data'] as Record<string, unknown> | undefined;
  if (nested && Array.isArray(nested['items'])) return nested['items'] as T[];
  return [];
}

function extractTotal(res: unknown): number {
  if (Array.isArray(res)) return res.length;
  const r = res as Record<string, unknown>;
  if (typeof r['totalCount'] === 'number') return r['totalCount'];
  const nested = r['data'] as Record<string, unknown> | undefined;
  if (nested && typeof nested['totalCount'] === 'number') return nested['totalCount'];
  return 0;
}

@Injectable({ providedIn: 'root' })
export class ClientService {
  private api = inject(ApiService);

  getAll(filter: ClientFilter = {}): Observable<PagedResponse<Client>> {
    const params: Record<string, string | number> = {};
    if (filter.search)   params['search']   = filter.search;
    if (filter.active !== undefined) params['active'] = String(filter.active);
    if (filter.page)     params['page']     = filter.page;
    if (filter.pageSize) params['pageSize'] = filter.pageSize;

    return this.api.get<unknown>('/customers', params).pipe(
      map(res => ({
        data: extractItems<Client>(res),
        pagination: { page: filter.page ?? 1, pageSize: filter.pageSize ?? 10, total: extractTotal(res) },
      }))
    );
  }

  getById(id: string): Observable<Client> {
    return this.api.get<Client>(`/customers/${id}`);
  }

  create(data: Omit<Client, 'id' | 'createdAt'>): Observable<Client> {
    return this.api.post<Client>('/customers', data);
  }

  update(id: string, data: Partial<Client>): Observable<Client> {
    return this.api.put<Client>(`/customers/${id}`, data);
  }

  toggleActive(id: string, active: boolean): Observable<Client> {
    return this.api.patch<Client>(`/customers/${id}/active`, { active });
  }
}
