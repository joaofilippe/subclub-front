import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/pages/account-profile/account-profile.component').then(m => m.AccountProfileComponent)
  }
];
