import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { ApiService } from '../../../../../core/http/api.service';

@Injectable()
export class RegisterViewModel {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.form.getRawValue() as { name: string; email: string; password: string; confirmPassword: string };

    this.loading.set(true);
    this.error.set(null);

    this.api.post('/auth/register', { name, email, password }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/auth/login']);
      },
      error: err => {
        this.error.set(err?.error?.message ?? 'Erro ao criar conta');
        this.loading.set(false);
      }
    });
  }
}
