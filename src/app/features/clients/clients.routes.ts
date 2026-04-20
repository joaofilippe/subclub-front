import { Routes } from '@angular/router';

export const clientsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/pages/client-list/client-list.component').then(m => m.ClientListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./presentation/pages/client-detail/client-detail.component').then(m => m.ClientDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./presentation/pages/client-edit/client-edit.component').then(m => m.ClientEditComponent)
  }
];
