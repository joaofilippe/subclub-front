import { Routes } from '@angular/router';

export const modulesRoutes: Routes = [
  { path: '', loadComponent: () => import('./presentation/pages/module-list/module-list.component').then(m => m.ModuleListComponent) },
  { path: 'new', loadComponent: () => import('./presentation/pages/module-form/module-form.component').then(m => m.ModuleFormComponent) },
  { path: ':id/edit', loadComponent: () => import('./presentation/pages/module-form/module-form.component').then(m => m.ModuleFormComponent) },
];
