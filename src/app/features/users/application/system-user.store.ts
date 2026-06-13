import { Injectable, inject, signal, computed } from '@angular/core';
import { SystemUser } from '../domain/models/system-user.model';
import { SystemUserService } from './system-user.service';

@Injectable({ providedIn: 'root' })
export class SystemUserStore {
  private service = inject(SystemUserService);

  private _users = signal<SystemUser[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  readonly users = this._users.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly isEmpty = computed(() => this._users().length === 0 && !this._loading());

  load(): void {
    this._loading.set(true);
    this.service.getAll().subscribe({
      next: users => {
        this._users.set(users);
        this._loading.set(false);
      },
      error: err => {
        this._error.set(err?.error?.message ?? 'Erro ao carregar usuários');
        this._loading.set(false);
      }
    });
  }

  removeFromList(id: string): void {
    this._users.update(list => list.filter(u => u.id !== id));
  }

  addToList(user: SystemUser): void {
    this._users.update(list => [user, ...list]);
  }

  updateInList(user: SystemUser): void {
    this._users.update(list => list.map(u => u.id === user.id ? user : u));
  }
}
