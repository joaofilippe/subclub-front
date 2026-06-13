import { Injectable, inject, signal, computed } from '@angular/core';
import { SystemUserStore } from '../../../application/system-user.store';
import { SystemUserService } from '../../../application/system-user.service';

@Injectable()
export class UserListViewModel {
  private store = inject(SystemUserStore);
  private service = inject(SystemUserService);

  readonly users = this.store.users;
  readonly loading = this.store.loading;
  readonly isEmpty = this.store.isEmpty;

  readonly searchTerm = signal('');
  readonly removingId = signal<string | null>(null);

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.users().filter(u =>
      !term ||
      u.email.toLowerCase().includes(term) ||
      u.name.toLowerCase().includes(term)
    );
  });

  readonly counts = computed(() => ({
    total: this.users().length,
    admin: this.users().filter(u => u.role === 'admin').length,
    operations: this.users().filter(u => u.role === 'operations').length,
  }));

  load(): void {
    this.store.load();
  }

  remove(id: string): void {
    this.removingId.set(id);
    this.service.remove(id).subscribe({
      next: () => {
        this.store.removeFromList(id);
        this.removingId.set(null);
      },
      error: () => this.removingId.set(null)
    });
  }
}
