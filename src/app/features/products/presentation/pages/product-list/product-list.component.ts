import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductListViewModel } from './product-list.viewmodel';
import { PRODUCT_CATEGORIES } from '../../../domain/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  providers: [ProductListViewModel],
  imports: [
    RouterLink, FormsModule, CurrencyPipe,
    MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule, MatTooltipModule
  ],
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Produtos</h1>
        <a mat-flat-button color="primary" routerLink="/products/new">
          <mat-icon>add</mat-icon> Novo produto
        </a>
      </div>

      <div class="filters">
        <mat-form-field appearance="outline" class="filters__search">
          <mat-label>Buscar produto</mat-label>
          <mat-icon matPrefix>search</mat-icon>
          <input matInput [(ngModel)]="searchTermValue" (ngModelChange)="vm.searchTerm.set($event)" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="filters__category">
          <mat-label>Categoria</mat-label>
          <mat-select [(ngModel)]="categoryFilterValue" (ngModelChange)="vm.categoryFilter.set($event)">
            <mat-option value="all">Todas</mat-option>
            @for (cat of categories; track cat.value) {
              <mat-option [value]="cat.value">{{ cat.label }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="filters__status">
          <mat-label>Status</mat-label>
          <mat-select [(ngModel)]="activeFilterValue" (ngModelChange)="vm.activeFilter.set($event)">
            <mat-option value="all">Todos</mat-option>
            <mat-option value="active">Ativos</mat-option>
            <mat-option value="inactive">Inativos</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      @if (vm.loading()) {
        <div class="loading"><mat-progress-spinner mode="indeterminate" diameter="40" /></div>
      } @else if (vm.isEmpty()) {
        <div class="empty">
          <mat-icon>inventory_2</mat-icon>
          <p>Nenhum produto cadastrado</p>
          <a mat-flat-button color="primary" routerLink="/products/new">Criar primeiro produto</a>
        </div>
      } @else {
        <div class="cards-grid">
          @for (product of vm.filtered(); track product.id) {
            <div class="product-card" [class.product-card--inactive]="!product.active">
              @if (product.imageUrl) {
                <img [src]="product.imageUrl" [alt]="product.name" class="product-card__image" />
              } @else {
                <div class="product-card__image product-card__image--placeholder">
                  <mat-icon>inventory_2</mat-icon>
                </div>
              }
              <div class="product-card__body">
                <div class="product-card__header">
                  <h3 class="product-card__name">{{ product.name }}</h3>
                  <span class="badge" [class.badge--active]="product.active" [class.badge--inactive]="!product.active">
                    {{ product.active ? 'Ativo' : 'Inativo' }}
                  </span>
                </div>
                <p class="product-card__description">{{ product.description }}</p>
                <div class="product-card__footer">
                  <div class="product-card__meta">
                    <span class="category-chip">{{ categoryLabel(product.category) }}</span>
                    <span class="product-card__price">{{ product.costPrice | currency:'BRL':'symbol':'1.2-2' }}</span>
                  </div>
                  <div class="product-card__actions">
                    <a mat-icon-button [routerLink]="['/products', product.id, 'edit']" matTooltip="Editar">
                      <mat-icon>edit</mat-icon>
                    </a>
                    <button mat-icon-button color="warn" (click)="vm.delete(product.id)" matTooltip="Excluir">
                      <mat-icon>delete_outline</mat-icon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page { display: flex; flex-direction: column; gap: 24px; }
    .page__header { display: flex; align-items: center; justify-content: space-between; }
    .page__title { font-size: 22px; font-weight: 700; margin: 0; }

    .filters { display: flex; gap: 16px; flex-wrap: wrap; }
    .filters__search { flex: 1; min-width: 200px; }
    .filters__category { width: 180px; }
    .filters__status { width: 160px; }

    .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

    .product-card { background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); overflow: hidden; display: flex; flex-direction: column; transition: box-shadow 0.2s; }
    .product-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
    .product-card--inactive { opacity: 0.65; }

    .product-card__image { width: 100%; height: 160px; object-fit: cover; }
    .product-card__image--placeholder { display: flex; align-items: center; justify-content: center; background: #f0f0f0; color: #bbb; mat-icon { font-size: 48px; width: 48px; height: 48px; } }

    .product-card__body { padding: 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .product-card__header { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .product-card__name { font-size: 16px; font-weight: 600; margin: 0; }
    .product-card__description { font-size: 13px; color: #666; margin: 0; line-height: 1.5; flex: 1; }

    .product-card__footer { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
    .product-card__meta { display: flex; flex-direction: column; gap: 4px; }
    .product-card__price { font-size: 16px; font-weight: 700; color: #6750a4; }
    .product-card__actions { display: flex; gap: 4px; }

    .badge { display: inline-block; padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 500; white-space: nowrap; }
    .badge--active { background: #e8f5e9; color: #2e7d32; }
    .badge--inactive { background: #f5f5f5; color: #777; }

    .category-chip { display: inline-block; padding: 2px 8px; background: #f0eeff; color: #6750a4; border-radius: 99px; font-size: 11px; font-weight: 500; }

    .loading, .empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px; gap: 12px; color: #999; mat-icon { font-size: 48px; width: 48px; height: 48px; } }
  `]
})
export class ProductListComponent implements OnInit {
  vm = inject(ProductListViewModel);
  categories = PRODUCT_CATEGORIES;
  searchTermValue = '';
  categoryFilterValue: string = 'all';
  activeFilterValue: 'all' | 'active' | 'inactive' = 'all';

  ngOnInit(): void {
    this.vm.load();
  }

  categoryLabel(value: string): string {
    return this.categories.find(c => c.value === value)?.label ?? value;
  }
}
