import { Routes } from '@angular/router';

export const accountPlansRoutes: Routes = [
  { path: '', loadComponent: () => import('./presentation/pages/account-plan-list/account-plan-list.component').then(m => m.AccountPlanListComponent) },
  { path: 'new', loadComponent: () => import('./presentation/pages/account-plan-form/account-plan-form.component').then(m => m.AccountPlanFormComponent) },
  { path: ':id/edit', loadComponent: () => import('./presentation/pages/account-plan-form/account-plan-form.component').then(m => m.AccountPlanFormComponent) },
];
