import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { Plan, PlanFilter } from '../domain/models/plan.model';

function extractItems<T>(res: unknown): T[] {
  if (Array.isArray(res)) return res as T[];
  const r = res as Record<string, unknown>;
  if (Array.isArray(r['items'])) return r['items'] as T[];
  if (Array.isArray(r['data'])) return r['data'] as T[];
  const nested = r['data'] as Record<string, unknown> | undefined;
  if (nested && Array.isArray(nested['items'])) return nested['items'] as T[];
  return [];
}

@Injectable({ providedIn: 'root' })
export class PlanService {
  private api = inject(ApiService);

  getAll(filter: PlanFilter = {}): Observable<Plan[]> {
    const params: Record<string, string | number> = {};
    if (filter.search) params['search'] = filter.search;
    if (filter.active !== undefined) params['active'] = String(filter.active);

    return this.api.get<unknown>('/plans', params).pipe(
      map(res => extractItems<Plan>(res))
    );
  }

  getById(id: string): Observable<Plan> {
    return this.api.get<Plan>(`/plans/${id}`);
  }

  create(data: Omit<Plan, 'id' | 'createdAt'>): Observable<Plan> {
    return this.api.post<Plan>('/plans', data);
  }

  update(id: string, data: Partial<Plan>): Observable<Plan> {
    return this.api.put<Plan>(`/plans/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`/plans/${id}`);
  }
}
