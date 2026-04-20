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
import { PlanListViewModel } from './plan-list.viewmodel';

@Component({
  selector: 'app-plan-list',
  standalone: true,
  providers: [PlanListViewModel],
  imports: [
    RouterLink, FormsModule, CurrencyPipe,
    MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule, MatTooltipModule
  ],
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Planos</h1>
        <a mat-flat-button color="primary" routerLink="/plans/new">
          <mat-icon>add</mat-icon> Novo plano
        </a>
      </div>

      <div class="filters">
        <mat-form-field appearance="outline" class="filters__search">
          <mat-label>Buscar plano</mat-label>
          <mat-icon matPrefix>search</mat-icon>
          <input matInput [(ngModel)]="searchTermValue" (ngModelChange)="vm.searchTerm.set($event)" />
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
          <p>Nenhum plano cadastrado</p>
          <a mat-flat-button color="primary" routerLink="/plans/new">Criar primeiro plano</a>
        </div>
      } @else {
        <div class="cards-grid">
          @for (plan of vm.filtered(); track plan.id) {
            <div class="plan-card" [class.plan-card--inactive]="!plan.active">
              @if (plan.imageUrl) {
                <img [src]="plan.imageUrl" [alt]="plan.name" class="plan-card__image" />
              } @else {
                <div class="plan-card__image plan-card__image--placeholder">
                  <mat-icon>inventory_2</mat-icon>
                </div>
              }
              <div class="plan-card__body">
                <div class="plan-card__header">
                  <h3 class="plan-card__name">{{ plan.name }}</h3>
                  <span class="badge" [class.badge--active]="plan.active" [class.badge--inactive]="!plan.active">
                    {{ plan.active ? 'Ativo' : 'Inativo' }}
                  </span>
                </div>
                <p class="plan-card__description">{{ plan.description }}</p>
                <div class="plan-card__footer">
                  <div class="plan-card__price">
                    <span class="plan-card__price-value">{{ plan.price | currency:'BRL':'symbol':'1.2-2' }}</span>
                    <span class="plan-card__price-interval">a cada {{ plan.intervalDays }}d</span>
                  </div>
                  <div class="plan-card__actions">
                    <a mat-icon-button [routerLink]="['/plans', plan.id, 'edit']" matTooltip="Editar">
                      <mat-icon>edit</mat-icon>
                    </a>
                    <button mat-icon-button color="warn" (click)="vm.delete(plan.id)" matTooltip="Excluir">
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

    .filters { display: flex; gap: 16px; }
    .filters__search { flex: 1; }
    .filters__status { width: 200px; }

    .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

    .plan-card { background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); overflow: hidden; display: flex; flex-direction: column; transition: box-shadow 0.2s; }
    .plan-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
    .plan-card--inactive { opacity: 0.65; }

    .plan-card__image { width: 100%; height: 160px; object-fit: cover; }
    .plan-card__image--placeholder { display: flex; align-items: center; justify-content: center; background: #f0f0f0; color: #bbb; mat-icon { font-size: 48px; width: 48px; height: 48px; } }

    .plan-card__body { padding: 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .plan-card__header { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .plan-card__name { font-size: 16px; font-weight: 600; margin: 0; }
    .plan-card__description { font-size: 13px; color: #666; margin: 0; line-height: 1.5; flex: 1; }

    .plan-card__footer { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
    .plan-card__price { display: flex; flex-direction: column; }
    .plan-card__price-value { font-size: 18px; font-weight: 700; color: #6750a4; }
    .plan-card__price-interval { font-size: 11px; color: #999; }
    .plan-card__actions { display: flex; gap: 4px; }

    .badge { display: inline-block; padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 500; white-space: nowrap; }
    .badge--active { background: #e8f5e9; color: #2e7d32; }
    .badge--inactive { background: #f5f5f5; color: #777; }

    .loading, .empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px; gap: 12px; color: #999; mat-icon { font-size: 48px; width: 48px; height: 48px; } }
  `]
})
export class PlanListComponent implements OnInit {
  vm = inject(PlanListViewModel);
  searchTermValue = '';
  activeFilterValue: 'all' | 'active' | 'inactive' = 'all';

  ngOnInit(): void {
    this.vm.load();
  }
}
