import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthStore } from '../../../../../core/auth/auth.store';

@Injectable()
export class LoginViewModel {
  private fb = inject(FormBuilder);
  private store = inject(AuthStore);

  readonly loading = this.store.loading;
  readonly error = this.store.error;

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.login(this.form.getRawValue() as { email: string; password: string });
  }
}
