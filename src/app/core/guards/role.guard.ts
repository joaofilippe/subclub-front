import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../auth/auth.store';
import { UserRole } from '../auth/auth.model';

export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => () => {
  const store = inject(AuthStore);
  const router = inject(Router);
  const user = store.user();

  if (user && allowedRoles.includes(user.role)) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
