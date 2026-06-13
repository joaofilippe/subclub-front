import { Routes } from '@angular/router';

export const accountsRoutes: Routes = [
  { path: '', loadComponent: () => import('./presentation/pages/account-list/account-list.component').then(m => m.AccountListComponent) },
  { path: 'new', loadComponent: () => import('./presentation/pages/account-form/account-form.component').then(m => m.AccountFormComponent) },
  { path: ':id/edit', loadComponent: () => import('./presentation/pages/account-form/account-form.component').then(m => m.AccountFormComponent) },
];
