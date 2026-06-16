import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthStore } from '../../../../../core/auth/auth.store';
import { LoginRequest, UsernameLoginRequest } from '../../../../../core/auth/auth.model';

@Injectable()
export class LoginViewModel {
  private fb = inject(FormBuilder);
  private store = inject(AuthStore);

  readonly loading = this.store.loading;
  readonly error = this.store.error;

  readonly emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  readonly usernameForm = this.fb.group({
    username: ['', [Validators.required]],
    account_slug: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onTabChange(): void {
    this.store.clearError();
  }

  submitEmail(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }
    this.store.login(this.emailForm.getRawValue() as LoginRequest);
  }

  submitUsername(): void {
    if (this.usernameForm.invalid) {
      this.usernameForm.markAllAsTouched();
      return;
    }
    this.store.loginWithUsername(this.usernameForm.getRawValue() as UsernameLoginRequest);
  }
}
