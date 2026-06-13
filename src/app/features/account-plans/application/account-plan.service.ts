import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { AccountPlan, AccountPlanRequest } from '../domain/models/account-plan.model';

@Injectable({ providedIn: 'root' })
export class AccountPlanService {
  private api = inject(ApiService);

  getAll(): Observable<AccountPlan[]>                              { return this.api.get<AccountPlan[]>('/account-plans'); }
  getById(id: string): Observable<AccountPlan>                    { return this.api.get<AccountPlan>(`/account-plans/${id}`); }
  create(data: AccountPlanRequest): Observable<AccountPlan>       { return this.api.post<AccountPlan>('/account-plans', data); }
  update(id: string, data: AccountPlanRequest): Observable<AccountPlan> { return this.api.put<AccountPlan>(`/account-plans/${id}`, data); }
  remove(id: string): Observable<void>                            { return this.api.delete<void>(`/account-plans/${id}`); }
}
