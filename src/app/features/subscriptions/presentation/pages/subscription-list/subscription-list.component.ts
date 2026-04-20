import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SubscriptionListViewModel } from './subscription-list.viewmodel';
import { SubscriptionStatus } from '../../../domain/models/subscription.model';

@Component({
  selector: 'app-subscription-list',
  standalone: true,
  providers: [SubscriptionListViewModel],
  imports: [
    RouterLink, FormsModule,
    MatTableModule, MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatChipsModule,
    MatProgressSpinnerModule, MatTooltipModule
  ],
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Assinaturas</h1>
      </div>

      <div class="stats-row">
        <div class="stat-card stat-card--active">
          <span class="stat-card__value">{{ vm.statusCounts().active }}</span>
          <span class="stat-card__label">Ativas</span>
        </div>
        <div class="stat-card stat-card--paused">
          <span class="stat-card__value">{{ vm.statusCounts().paused }}</span>
          <span class="stat-card__label">Pausadas</span>
        </div>
        <div class="stat-card stat-card--cancelled">
          <span class="stat-card__value">{{ vm.statusCounts().cancelled }}</span>
          <span class="stat-card__label">Canceladas</span>
        </div>
        <div class="stat-card stat-card--expired">
          <span class="stat-card__value">{{ vm.statusCounts().expired }}</span>
          <span class="stat-card__label">Expiradas</span>
        </div>
      </div>

      <div class="filters">
        <mat-form-field appearance="outline" class="filters__search">
          <mat-label>Buscar cliente ou plano</mat-label>
          <mat-icon matPrefix>search</mat-icon>
          <input matInput [(ngModel)]="searchTermValue" (ngModelChange)="vm.searchTerm.set($event)" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="filters__status">
          <mat-label>Status</mat-label>
          <mat-select [(ngModel)]="statusFilterValue" (ngModelChange)="vm.statusFilter.set($event)">
            <mat-option value="">Todos</mat-option>
            <mat-option value="active">Ativa</mat-option>
            <mat-option value="paused">Pausada</mat-option>
            <mat-option value="cancelled">Cancelada</mat-option>
            <mat-option value="expired">Expirada</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      @if (vm.loading()) {
        <div class="loading"><mat-progress-spinner mode="indeterminate" diameter="40" /></div>
      } @else if (vm.isEmpty()) {
        <div class="empty">
          <mat-icon>inbox</mat-icon>
          <p>Nenhuma assinatura encontrada</p>
        </div>
      } @else {
        <div class="table-container">
          <table mat-table [dataSource]="vm.filtered()">
            <ng-container matColumnDef="client">
              <th mat-header-cell *matHeaderCellDef>Cliente</th>
              <td mat-cell *matCellDef="let row">{{ row.clientName }}</td>
            </ng-container>

            <ng-container matColumnDef="plan">
              <th mat-header-cell *matHeaderCellDef>Plano</th>
              <td mat-cell *matCellDef="let row">{{ row.planName }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let row">
                <span class="badge badge--{{ row.status }}">{{ statusLabel(row.status) }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="shipment">
              <th mat-header-cell *matHeaderCellDef>Envio</th>
              <td mat-cell *matCellDef="let row">
                <span class="badge badge--shipment-{{ row.shipmentStatus }}">{{ shipmentLabel(row.shipmentStatus) }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="renewal">
              <th mat-header-cell *matHeaderCellDef>Renovação</th>
              <td mat-cell *matCellDef="let row">
                <span [class.text-warning]="row.daysUntilRenewal <= 7 && row.status === 'active'">
                  @if (row.status === 'active') {
                    {{ row.daysUntilRenewal }}d
                  } @else {
                    —
                  }
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let row">
                <a mat-icon-button [routerLink]="['/subscriptions', row.id]" matTooltip="Ver detalhes">
                  <mat-icon>chevron_right</mat-icon>
                </a>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="columns"></tr>
            <tr mat-row *matRowDef="let row; columns: columns" class="table-row"></tr>
          </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .page { display: flex; flex-direction: column; gap: 24px; }
    .page__header { display: flex; align-items: center; justify-content: space-between; }
    .page__title { font-size: 22px; font-weight: 700; margin: 0; }

    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .stat-card { background: #fff; border-radius: 12px; padding: 20px 24px; display: flex; flex-direction: column; gap: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); border-left: 4px solid transparent; }
    .stat-card__value { font-size: 28px; font-weight: 700; }
    .stat-card__label { font-size: 13px; color: #666; }
    .stat-card--active { border-color: #2e7d32; .stat-card__value { color: #2e7d32; } }
    .stat-card--paused { border-color: #f57c00; .stat-card__value { color: #f57c00; } }
    .stat-card--cancelled { border-color: #c62828; .stat-card__value { color: #c62828; } }
    .stat-card--expired { border-color: #555; .stat-card__value { color: #555; } }

    .filters { display: flex; gap: 16px; }
    .filters__search { flex: 1; }
    .filters__status { width: 200px; }

    .table-container { background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); overflow: hidden; }
    table { width: 100%; }
    .table-row:hover { background: #f9f9f9; cursor: pointer; }

    .badge { display: inline-block; padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 500; }
    .badge--active { background: #e8f5e9; color: #2e7d32; }
    .badge--paused { background: #fff3e0; color: #f57c00; }
    .badge--cancelled { background: #fdecea; color: #c62828; }
    .badge--expired { background: #f5f5f5; color: #555; }
    .badge--shipment-pending { background: #f5f5f5; color: #555; }
    .badge--shipment-preparing { background: #e3f2fd; color: #1565c0; }
    .badge--shipment-shipped { background: #ede7f6; color: #4527a0; }
    .badge--shipment-delivered { background: #e8f5e9; color: #2e7d32; }

    .text-warning { color: #f57c00; font-weight: 600; }
    .loading, .empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px; gap: 12px; color: #999; mat-icon { font-size: 48px; width: 48px; height: 48px; } }
  `]
})
export class SubscriptionListComponent implements OnInit {
  vm = inject(SubscriptionListViewModel);
  columns = ['client', 'plan', 'status', 'shipment', 'renewal', 'actions'];
  searchTermValue = '';
  statusFilterValue = '';

  ngOnInit(): void {
    this.vm.load();
  }

  statusLabel(status: SubscriptionStatus): string {
    const labels: Record<SubscriptionStatus, string> = {
      active: 'Ativa', paused: 'Pausada', cancelled: 'Cancelada', expired: 'Expirada'
    };
    return labels[status];
  }

  shipmentLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'Pendente', preparing: 'Preparando', shipped: 'Enviado', delivered: 'Entregue'
    };
    return labels[status] ?? status;
  }
}
