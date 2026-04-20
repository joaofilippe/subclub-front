import { Injectable, inject, signal, computed } from '@angular/core';
import { Plan } from '../domain/models/plan.model';
import { PlanService } from './plan.service';

@Injectable({ providedIn: 'root' })
export class PlanStore {
  private service = inject(PlanService);

  private _plans = signal<Plan[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  readonly plans = this._plans.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly isEmpty = computed(() => this._plans().length === 0 && !this._loading());

  load(): void {
    this._loading.set(true);
    this.service.getAll().subscribe({
      next: plans => {
        this._plans.set(plans);
        this._loading.set(false);
      },
      error: err => {
        this._error.set(err?.error?.message ?? 'Erro ao carregar planos');
        this._loading.set(false);
      }
    });
  }

  remove(id: string): void {
    this.service.delete(id).subscribe(() => {
      this._plans.update(plans => plans.filter(p => p.id !== id));
    });
  }
}
