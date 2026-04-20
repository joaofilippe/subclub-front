import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthUser, LoginRequest } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private authService = inject(AuthService);
  private router = inject(Router);

  private _user = signal<AuthUser | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());
  readonly isAdmin = computed(() => this._user()?.role === 'admin');

  login(credentials: LoginRequest): void {
    this._loading.set(true);
    this._error.set(null);

    this.authService.login(credentials).subscribe({
      next: res => {
        this._user.set(res.user);
        this._loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this._error.set(err?.error?.message ?? 'Erro ao fazer login');
        this._loading.set(false);
      }
    });
  }

  logout(): void {
    this._user.set(null);
    this.authService.logout();
  }
}
