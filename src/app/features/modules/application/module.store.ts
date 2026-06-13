import { Injectable, inject, signal, computed } from '@angular/core';
import { Module } from '../domain/models/module.model';
import { ModuleService } from './module.service';

@Injectable({ providedIn: 'root' })
export class ModuleStore {
  private service = inject(ModuleService);

  private _modules = signal<Module[]>([]);
  private _loading = signal(false);

  readonly modules  = this._modules.asReadonly();
  readonly loading  = this._loading.asReadonly();
  readonly isEmpty  = computed(() => this._modules().length === 0 && !this._loading());

  load(): void {
    this._loading.set(true);
    this.service.getAll().subscribe({
      next: list => { this._modules.set(list); this._loading.set(false); },
      error: ()   => this._loading.set(false),
    });
  }

  addToList(m: Module): void     { this._modules.update(l => [m, ...l]); }
  updateInList(m: Module): void  { this._modules.update(l => l.map(x => x.id === m.id ? m : x)); }
  removeFromList(id: string): void { this._modules.update(l => l.filter(x => x.id !== id)); }
}
