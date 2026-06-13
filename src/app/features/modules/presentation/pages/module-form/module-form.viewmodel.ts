import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModuleService } from '../../../application/module.service';
import { ModuleStore } from '../../../application/module.store';

@Injectable()
export class ModuleFormViewModel {
  private fb      = inject(FormBuilder);
  private service = inject(ModuleService);
  private store   = inject(ModuleStore);
  private router  = inject(Router);

  readonly loading = signal(false);
  readonly saving  = signal(false);
  readonly error   = signal<string | null>(null);

  readonly form = this.fb.group({
    name:   ['', Validators.required],
    active: [true],
  });

  load(id: string): void {
    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: m  => { this.form.patchValue({ name: m.name, active: m.active }); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  save(id?: string): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { name, active } = this.form.getRawValue();
    this.saving.set(true);
    this.error.set(null);

    const req$ = id
      ? this.service.update(id, { name: name!, active: active! })
      : this.service.create({ name: name! });

    req$.subscribe({
      next: m => {
        id ? this.store.updateInList(m) : this.store.addToList(m);
        this.saving.set(false);
        this.router.navigate(['/modules']);
      },
      error: err => { this.error.set(err?.error?.message ?? 'Erro ao salvar módulo'); this.saving.set(false); },
    });
  }
}
