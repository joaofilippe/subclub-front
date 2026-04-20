import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/pages/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./presentation/pages/product-form/product-form.component').then(m => m.ProductFormComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./presentation/pages/product-form/product-form.component').then(m => m.ProductFormComponent)
  }
];
