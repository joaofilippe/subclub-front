import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { Module, ModuleRequest } from '../domain/models/module.model';

@Injectable({ providedIn: 'root' })
export class ModuleService {
  private api = inject(ApiService);

  getAll(): Observable<Module[]>            { return this.api.get<Module[]>('/modules'); }
  getById(id: string): Observable<Module>   { return this.api.get<Module>(`/modules/${id}`); }
  create(data: ModuleRequest): Observable<Module> { return this.api.post<Module>('/modules', data); }
  update(id: string, data: ModuleRequest): Observable<Module> { return this.api.put<Module>(`/modules/${id}`, data); }
  remove(id: string): Observable<void>      { return this.api.delete<void>(`/modules/${id}`); }
}
