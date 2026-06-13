import { Injectable, inject, signal, computed } from '@angular/core';
import { ModuleStore } from '../../../application/module.store';
import { ModuleService } from '../../../application/module.service';

@Injectable()
export class ModuleListViewModel {
  private store   = inject(ModuleStore);
  private service = inject(ModuleService);

  readonly modules    = this.store.modules;
  readonly loading    = this.store.loading;
  readonly isEmpty    = this.store.isEmpty;
  readonly searchTerm = signal('');
  readonly removingId = signal<string | null>(null);

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.modules().filter(m => !term || m.name.toLowerCase().includes(term));
  });

  readonly counts = computed(() => ({
    total:    this.modules().length,
    active:   this.modules().filter(m => m.active).length,
    inactive: this.modules().filter(m => !m.active).length,
  }));

  load(): void { this.store.load(); }

  remove(id: string): void {
    this.removingId.set(id);
    this.service.remove(id).subscribe({
      next: () => { this.store.removeFromList(id); this.removingId.set(null); },
      error: ()  => this.removingId.set(null),
    });
  }
}
