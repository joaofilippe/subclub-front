import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { CreateUserRequest, SystemUser, UpdateUserRequest } from '../domain/models/system-user.model';

@Injectable({ providedIn: 'root' })
export class SystemUserService {
  private api = inject(ApiService);

  getAll(): Observable<SystemUser[]> {
    return this.api.get<SystemUser[]>('/users');
  }

  getById(id: string): Observable<SystemUser> {
    return this.api.get<SystemUser>(`/users/${id}`);
  }

  create(data: CreateUserRequest): Observable<SystemUser> {
    return this.api.post<SystemUser>('/users', data);
  }

  update(id: string, data: UpdateUserRequest): Observable<SystemUser> {
    return this.api.put<SystemUser>(`/users/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.api.delete<void>(`/users/${id}`);
  }
}
