import { Injectable, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemUserService } from '../../../application/system-user.service';
import { SystemUserStore } from '../../../application/system-user.store';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pw && confirm && pw !== confirm ? { passwordMismatch: true } : null;
}

@Injectable()
export class UserFormViewModel {
  private fb = inject(FormBuilder);
  private service = inject(SystemUserService);
  private store = inject(SystemUserStore);
  private router = inject(Router);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
    role: ['operations' as 'admin' | 'operations', Validators.required],
    type: ['individual' as 'individual' | 'corporate' | 'system', Validators.required],
  }, { validators: passwordMatchValidator });

  load(id: string): void {
    this.loading.set(true);

    const pwCtrl = this.form.get('password')!;
    const confirmCtrl = this.form.get('confirmPassword')!;
    pwCtrl.clearValidators();
    confirmCtrl.clearValidators();
    pwCtrl.updateValueAndValidity();
    confirmCtrl.updateValueAndValidity();

    this.service.getById(id).subscribe({
      next: user => {
        this.form.patchValue({ email: user.email, role: user.role, type: user.type });
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  save(id?: string): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const { email, password, role, type } = this.form.getRawValue();
    this.saving.set(true);
    this.error.set(null);

    const request$ = id
      ? this.service.update(id, { email: email!, role: role!, type: type! })
      : this.service.create({ email: email!, password: password!, role: role!, type: type! });

    request$.subscribe({
      next: user => {
        id ? this.store.updateInList(user) : this.store.addToList(user);
        this.saving.set(false);
        this.router.navigate(['/users']);
      },
      error: err => {
        this.error.set(err?.error?.message ?? (id ? 'Erro ao atualizar usuário' : 'Erro ao criar usuário'));
        this.saving.set(false);
      }
    });
  }
}
