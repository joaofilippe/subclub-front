import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/shell/shell.component').then(m => m.ShellComponent),
    children: [
      { path: '', redirectTo: 'subscriptions', pathMatch: 'full' },
      {
        path: 'clients',
        loadChildren: () => import('./features/clients/clients.routes').then(m => m.clientsRoutes)
      },
      {
        path: 'plans',
        loadChildren: () => import('./features/plans/plans.routes').then(m => m.plansRoutes)
      },
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.routes').then(m => m.productsRoutes)
      },
      {
        path: 'subscriptions',
        loadChildren: () => import('./features/subscriptions/subscriptions.routes').then(m => m.subscriptionsRoutes)
      },
      {
        path: 'account',
        loadChildren: () => import('./features/account/account.routes').then(m => m.accountRoutes)
      },
      {
        path: 'users',
        canActivate: [roleGuard(['admin'])],
        loadChildren: () => import('./features/users/users.routes').then(m => m.usersRoutes)
      },
      {
        path: 'modules',
        canActivate: [roleGuard(['admin'])],
        loadChildren: () => import('./features/modules/modules.routes').then(m => m.modulesRoutes)
      },
      {
        path: 'account-plans',
        canActivate: [roleGuard(['admin'])],
        loadChildren: () => import('./features/account-plans/account-plans.routes').then(m => m.accountPlansRoutes)
      },
      {
        path: 'accounts',
        canActivate: [roleGuard(['admin'])],
        loadChildren: () => import('./features/accounts/accounts.routes').then(m => m.accountsRoutes)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
