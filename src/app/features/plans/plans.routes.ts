import { Routes } from '@angular/router';

export const plansRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/pages/plan-list/plan-list.component').then(m => m.PlanListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./presentation/pages/plan-form/plan-form.component').then(m => m.PlanFormComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./presentation/pages/plan-form/plan-form.component').then(m => m.PlanFormComponent)
  }
];
