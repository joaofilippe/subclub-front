import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

const ACCOUNT_BLOCKED_KEYWORDS = ['suspended', 'cancelled', 'inactive', 'blocked', 'suspensa', 'cancelada'];

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        authService.logout();
      }

      if (err.status === 403) {
        const message: string = (err.error?.message ?? '').toLowerCase();
        const isAccountBlocked = ACCOUNT_BLOCKED_KEYWORDS.some(kw => message.includes(kw));
        router.navigate([isAccountBlocked ? '/account-suspended' : '/unauthorized']);
      }

      return throwError(() => err);
    })
  );
};
