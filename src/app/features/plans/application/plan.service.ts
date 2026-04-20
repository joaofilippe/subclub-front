import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { Plan, PlanFilter } from '../domain/models/plan.model';

@Injectable({ providedIn: 'root' })
export class PlanService {
  private api = inject(ApiService);

  getAll(filter: PlanFilter = {}): Observable<Plan[]> {
    return this.api.get<Plan[]>('/plans', filter as Record<string, string | number>);
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
