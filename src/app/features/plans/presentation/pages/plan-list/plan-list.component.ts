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
import { MatSliderModule } from '@angular/material/slider';
import { PlanListViewModel } from './plan-list.viewmodel';

@Component({
  selector: 'app-plan-list',
  standalone: true,
  providers: [PlanListViewModel],
  imports: [
    RouterLink,
    FormsModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSliderModule,
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
          <input
            matInput
            [(ngModel)]="searchTermValue"
            (ngModelChange)="vm.searchTerm.set($event)"
          />
        </mat-form-field>

        <mat-form-field appearance="outline" class="filters__status">
          <mat-label>Status</mat-label>
          <mat-select
            [(ngModel)]="activeFilterValue"
            (ngModelChange)="vm.activeFilter.set($event)"
          >
            <mat-option value="all">Todos</mat-option>
            <mat-option value="active">Ativos</mat-option>
            <mat-option value="inactive">Inativos</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="filters__view-controls">
          <mat-icon matTooltip="Lista Detalhada" class="slider-icon">table_rows</mat-icon>
          <mat-slider min="1" max="5" step="1" class="view-slider" color="primary">
            <input matSliderThumb [(ngModel)]="zoomValue" />
          </mat-slider>
          <mat-icon matTooltip="Cards Grandes" class="slider-icon">grid_view</mat-icon>
          <div class="view-mode-badge">{{ formatSliderLabel(zoomValue) }}</div>
        </div>
      </div>

      @if (vm.loading()) {
        <div class="loading">
          <mat-progress-spinner mode="indeterminate" diameter="40" />
        </div>
      } @else if (vm.isEmpty()) {
        <div class="empty">
          <mat-icon>inventory_2</mat-icon>
          <p>Nenhum plano cadastrado</p>
          <a mat-flat-button color="primary" routerLink="/plans/new"
            >Criar primeiro plano</a
          >
        </div>
      } @else {
        @if (viewMode === 'cards') {
          <div
            class="cards-grid"
            [style.grid-template-columns]="
              'repeat(auto-fill, minmax(' + cardWidth + 'px, 1fr))'
            "
          >
            @for (plan of vm.filtered(); track plan.id) {
              <div class="plan-card" [class.plan-card--inactive]="!plan.active">
                @if (plan.imageUrl) {
                  <img
                    [src]="plan.imageUrl"
                    [alt]="plan.name"
                    class="plan-card__image"
                  />
                } @else {
                  <div class="plan-card__image plan-card__image--placeholder">
                    <mat-icon>inventory_2</mat-icon>
                  </div>
                }
                <div class="plan-card__body">
                  <div class="plan-card__header">
                    <h3 class="plan-card__name">{{ plan.name }}</h3>
                    <span
                      class="badge"
                      [class.badge--active]="plan.active"
                      [class.badge--inactive]="!plan.active"
                    >
                      {{ plan.active ? 'Ativo' : 'Inativo' }}
                    </span>
                  </div>
                  <p class="plan-card__description">{{ plan.description }}</p>
                  <div class="plan-card__footer">
                    <div class="plan-card__price">
                      <span class="plan-card__price-value">{{
                        plan.price | currency: 'BRL' : 'symbol' : '1.2-2'
                      }}</span>
                      <span class="plan-card__price-interval"
                        >a cada {{ plan.intervalDays }}d</span
                      >
                    </div>
                    <div class="plan-card__actions">
                      <a
                        mat-icon-button
                        [routerLink]="['/plans', plan.id, 'edit']"
                        matTooltip="Editar"
                      >
                        <mat-icon>edit</mat-icon>
                      </a>
                      <button
                        mat-icon-button
                        color="warn"
                        (click)="vm.delete(plan.id)"
                        matTooltip="Excluir"
                      >
                        <mat-icon>delete_outline</mat-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else if (viewMode === 'list') {
          <div class="simple-list">
            @for (plan of vm.filtered(); track plan.id) {
              <div
                class="simple-list-item"
                [class.simple-list-item--inactive]="!plan.active"
              >
                <div class="simple-list-item__info">
                  <h3 class="simple-list-item__name">{{ plan.name }}</h3>
                </div>
                <div class="simple-list-item__meta">
                  <span
                    class="badge"
                    [class.badge--active]="plan.active"
                    [class.badge--inactive]="!plan.active"
                  >
                    {{ plan.active ? 'Ativo' : 'Inativo' }}
                  </span>
                  <span class="simple-list-item__price">{{
                    plan.price | currency: 'BRL' : 'symbol' : '1.2-2'
                  }}</span>
                </div>
                <div class="simple-list-item__actions">
                  <a
                    mat-icon-button
                    [routerLink]="['/plans', plan.id, 'edit']"
                    matTooltip="Editar"
                  >
                    <mat-icon>edit</mat-icon>
                  </a>
                  <button
                    mat-icon-button
                    color="warn"
                    (click)="vm.delete(plan.id)"
                    matTooltip="Excluir"
                  >
                    <mat-icon>delete_outline</mat-icon>
                  </button>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="detailed-list">
            <div class="detailed-list-header">
              <div class="detailed-cell detailed-cell--image">Imagem</div>
              <div class="detailed-cell detailed-cell--name">
                Nome / Descrição
              </div>
              <div class="detailed-cell detailed-cell--status">Status</div>
              <div class="detailed-cell detailed-cell--price">
                Preço e Intervalo
              </div>
              <div class="detailed-cell detailed-cell--actions">Ações</div>
            </div>
            @for (plan of vm.filtered(); track plan.id) {
              <div
                class="detailed-list-row"
                [class.detailed-list-row--inactive]="!plan.active"
              >
                <div class="detailed-cell detailed-cell--image">
                  @if (plan.imageUrl) {
                    <img
                      [src]="plan.imageUrl"
                      [alt]="plan.name"
                      class="detailed-image"
                    />
                  } @else {
                    <div class="detailed-image detailed-image--placeholder">
                      <mat-icon>inventory_2</mat-icon>
                    </div>
                  }
                </div>
                <div class="detailed-cell detailed-cell--name">
                  <div class="detailed-name">{{ plan.name }}</div>
                  <div class="detailed-description">{{ plan.description }}</div>
                </div>
                <div class="detailed-cell detailed-cell--status">
                  <span
                    class="badge"
                    [class.badge--active]="plan.active"
                    [class.badge--inactive]="!plan.active"
                  >
                    {{ plan.active ? 'Ativo' : 'Inativo' }}
                  </span>
                </div>
                <div class="detailed-cell detailed-cell--price">
                  <div class="detailed-price">
                    {{ plan.price | currency: 'BRL' : 'symbol' : '1.2-2' }}
                  </div>
                  <div class="detailed-interval">
                    a cada {{ plan.intervalDays }}d
                  </div>
                </div>
                <div class="detailed-cell detailed-cell--actions">
                  <a
                    mat-icon-button
                    [routerLink]="['/plans', plan.id, 'edit']"
                    matTooltip="Editar"
                  >
                    <mat-icon>edit</mat-icon>
                  </a>
                  <button
                    mat-icon-button
                    color="warn"
                    (click)="vm.delete(plan.id)"
                    matTooltip="Excluir"
                  >
                    <mat-icon>delete_outline</mat-icon>
                  </button>
                </div>
              </div>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [
    `
      .page {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .page__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .page__title {
        font-size: 22px;
        font-weight: 700;
        margin: 0;
      }

      .filters {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        align-items: flex-start;
      }
      .filters__search {
        flex: 1;
        min-width: 200px;
      }
      .filters__status {
        width: 160px;
      }
      .filters__view-controls {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-left: auto;
        height: 56px;
        background: #fff;
        padding: 0 16px;
        border-radius: 99px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .view-slider {
        width: 160px;
      }
      .slider-icon {
        color: #666;
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
      .view-mode-badge {
        display: inline-block;
        padding: 4px 12px;
        background: #f0eeff;
        color: #6750a4;
        border-radius: 99px;
        font-size: 13px;
        font-weight: 600;
        min-width: 80px;
        text-align: center;
        margin-left: 8px;
        transition: all 0.2s;
      }

      .cards-grid {
        display: grid;
        gap: 20px;
      }

      .plan-card {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: box-shadow 0.2s;
      }
      .plan-card:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      }
      .plan-card--inactive {
        opacity: 0.65;
      }

      .plan-card__image {
        width: 100%;
        height: 160px;
        object-fit: cover;
      }
      .plan-card__image--placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f0f0f0;
        color: #bbb;
        mat-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
        }
      }

      .plan-card__body {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
      }
      .plan-card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .plan-card__name {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
      }
      .plan-card__description {
        font-size: 13px;
        color: #666;
        margin: 0;
        line-height: 1.5;
        flex: 1;
      }

      .plan-card__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
      }
      .plan-card__price {
        display: flex;
        flex-direction: column;
      }
      .plan-card__price-value {
        font-size: 18px;
        font-weight: 700;
        color: #6750a4;
      }
      .plan-card__price-interval {
        font-size: 11px;
        color: #999;
      }
      .plan-card__actions {
        display: flex;
        gap: 4px;
      }

      /* Simple List */
      .simple-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .simple-list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      }
      .simple-list-item:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }
      .simple-list-item--inactive {
        opacity: 0.65;
      }
      .simple-list-item__info {
        flex: 1;
      }
      .simple-list-item__name {
        font-size: 16px;
        font-weight: 500;
        margin: 0;
      }
      .simple-list-item__meta {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-right: 16px;
      }
      .simple-list-item__price {
        font-weight: 600;
        color: #6750a4;
      }
      .simple-list-item__actions {
        display: flex;
        gap: 4px;
      }

      /* Detailed List */
      .detailed-list {
        display: flex;
        flex-direction: column;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
        overflow: hidden;
      }
      .detailed-list-header {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        background: #f8f9fa;
        border-bottom: 1px solid #eee;
        font-weight: 600;
        font-size: 13px;
        color: #555;
      }
      .detailed-list-row {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
        transition: background 0.2s;
      }
      .detailed-list-row:last-child {
        border-bottom: none;
      }
      .detailed-list-row:hover {
        background: #fcfcfc;
      }
      .detailed-list-row--inactive {
        opacity: 0.65;
      }

      .detailed-cell {
        display: flex;
        flex-direction: column;
        padding: 0 8px;
      }
      .detailed-cell--image {
        width: 80px;
      }
      .detailed-cell--name {
        flex: 1;
        min-width: 200px;
      }
      .detailed-cell--status {
        width: 100px;
      }
      .detailed-cell--price {
        width: 140px;
      }
      .detailed-cell--actions {
        width: 100px;
        align-items: flex-end;
      }

      .detailed-image {
        width: 64px;
        height: 48px;
        border-radius: 6px;
        object-fit: cover;
      }
      .detailed-image--placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f0f0f0;
        color: #bbb;
        mat-icon {
          font-size: 24px;
          width: 24px;
          height: 24px;
        }
      }
      .detailed-name {
        font-weight: 600;
        font-size: 15px;
        margin-bottom: 4px;
      }
      .detailed-description {
        font-size: 13px;
        color: #666;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .detailed-price {
        font-weight: 700;
        color: #6750a4;
      }
      .detailed-interval {
        font-size: 12px;
        color: #888;
      }

      .badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 99px;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
      }
      .badge--active {
        background: #e8f5e9;
        color: #2e7d32;
      }
      .badge--inactive {
        background: #f5f5f5;
        color: #777;
      }

      .loading,
      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 64px;
        gap: 12px;
        color: #999;
        mat-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
        }
      }
    `,
  ],
})
export class PlanListComponent implements OnInit {
  vm = inject(PlanListViewModel);
  searchTermValue = '';
  activeFilterValue: 'all' | 'active' | 'inactive' = 'all';

  zoomValue = 4; // default: 4 = card médio

  get viewMode(): 'list' | 'detailed' | 'cards' {
    if (this.zoomValue === 1) return 'detailed';
    if (this.zoomValue === 2) return 'list';
    return 'cards';
  }

  get cardWidth(): number {
    switch (this.zoomValue) {
      case 3:
        return 200; // pequeno
      case 4:
        return 300; // médio
      case 5:
        return 400; // grande
      default:
        return 300;
    }
  }

  formatSliderLabel(value: number): string {
    switch (value) {
      case 1:
        return 'Detalhada';
      case 2:
        return 'Lista';
      case 3:
        return 'Pequeno';
      case 4:
        return 'Médio';
      case 5:
        return 'Grande';
      default:
        return '';
    }
  }

  ngOnInit(): void {
    this.vm.load();
  }
}
