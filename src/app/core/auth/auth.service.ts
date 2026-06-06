import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ApiService } from '../http/api.service';
import { AuthUser, JwtClaims, LoginRequest } from './auth.model';

const TOKEN_KEY = 'subclub_token';

interface LoginApiResponse {
  data: { token: string };
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);

  login(credentials: LoginRequest): Observable<AuthUser> {
    return this.api.post<LoginApiResponse>('/auth/login', credentials).pipe(
      tap(res => localStorage.setItem(TOKEN_KEY, res.data.token)),
      map(res => this.buildUser(this.decodeClaims(res.data.token)))
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      return Date.now() < this.decodeClaims(token).exp * 1000;
    } catch {
      return false;
    }
  }

  getCurrentUser(): AuthUser | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const claims = this.decodeClaims(token);
      if (Date.now() >= claims.exp * 1000) return null;
      return this.buildUser(claims);
    } catch {
      return null;
    }
  }

  private decodeClaims(token: string): JwtClaims {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64)) as JwtClaims;
  }

  private buildUser(claims: JwtClaims): AuthUser {
    return {
      id: claims.sub,
      name: claims.name ?? '',
      email: claims.email ?? '',
      role: claims.role,
      type: claims.type,
      accountSlug: claims.account_slug,
    };
  }
}
