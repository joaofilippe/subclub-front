import { Injectable, inject, signal, computed } from '@angular/core';
import { Client, ClientFilter } from '../domain/models/client.model';
import { ClientService } from './client.service';
import { Pagination } from '../../../shared/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class ClientStore {
  private service = inject(ClientService);

  private _clients = signal<Client[]>([]);
  private _selected = signal<Client | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  private _pagination = signal<Pagination>({ page: 1, pageSize: 10, total: 0 });

  readonly clients = this._clients.asReadonly();
  readonly selected = this._selected.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly pagination = this._pagination.asReadonly();
  readonly isEmpty = computed(() => this._clients().length === 0 && !this._loading());

  load(filter: ClientFilter = {}): void {
    this._loading.set(true);
    this.service.getAll(filter).subscribe({
      next: res => {
        this._clients.set(res.data);
        this._pagination.set(res.pagination);
        this._loading.set(false);
      },
      error: err => {
        this._error.set(err?.error?.message ?? 'Erro ao carregar clientes');
        this._loading.set(false);
      }
    });
  }

  loadOne(id: string): void {
    this._loading.set(true);
    this.service.getById(id).subscribe({
      next: client => {
        this._selected.set(client);
        this._loading.set(false);
      },
      error: err => {
        this._error.set(err?.error?.message ?? 'Erro ao carregar cliente');
        this._loading.set(false);
      }
    });
  }

  toggleActive(id: string, active: boolean): void {
    this.service.toggleActive(id, active).subscribe(updated => {
      this._selected.set(updated);
      this._clients.update(list => list.map(c => c.id === id ? updated : c));
    });
  }
}
