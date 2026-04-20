import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { Client, ClientFilter } from '../domain/models/client.model';
import { PagedResponse } from '../../../shared/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private api = inject(ApiService);

  getAll(filter: ClientFilter = {}): Observable<PagedResponse<Client>> {
    return this.api.get<PagedResponse<Client>>('/clients', filter as Record<string, string | number>);
  }

  getById(id: string): Observable<Client> {
    return this.api.get<Client>(`/clients/${id}`);
  }

  create(data: Omit<Client, 'id' | 'createdAt'>): Observable<Client> {
    return this.api.post<Client>('/clients', data);
  }

  update(id: string, data: Partial<Client>): Observable<Client> {
    return this.api.put<Client>(`/clients/${id}`, data);
  }

  toggleActive(id: string, active: boolean): Observable<Client> {
    return this.api.patch<Client>(`/clients/${id}/active`, { active });
  }
}
