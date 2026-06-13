import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { Account, CreateAccountRequest, UpdateAccountRequest } from '../domain/models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountTenantService {
  private api = inject(ApiService);

  getAll(): Observable<Account[]>                                          { return this.api.get<Account[]>('/accounts'); }
  getById(id: string): Observable<Account>                                 { return this.api.get<Account>(`/accounts/${id}`); }
  create(data: CreateAccountRequest): Observable<Account>                  { return this.api.post<Account>('/accounts', data); }
  update(id: string, data: UpdateAccountRequest): Observable<Account>      { return this.api.put<Account>(`/accounts/${id}`, data); }
  remove(id: string): Observable<void>                                     { return this.api.delete<void>(`/accounts/${id}`); }
}
