import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/pages/user-list/user-list.component').then(m => m.UserListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./presentation/pages/user-form/user-form.component').then(m => m.UserFormComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./presentation/pages/user-form/user-form.component').then(m => m.UserFormComponent)
  }
];
