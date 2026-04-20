import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClientListViewModel } from './client-list.viewmodel';

@Component({
  selector: 'app-client-list',
  standalone: true,
  providers: [ClientListViewModel],
  imports: [
    RouterLink, FormsModule,
    MatTableModule, MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule, MatTooltipModule
  ],
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Clientes</h1>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-card__value">{{ vm.counts().total }}</span>
          <span class="stat-card__label">Total</span>
        </div>
        <div class="stat-card stat-card--active">
          <span class="stat-card__value">{{ vm.counts().active }}</span>
          <span class="stat-card__label">Ativos</span>
        </div>
        <div class="stat-card stat-card--inactive">
          <span class="stat-card__value">{{ vm.counts().inactive }}</span>
          <span class="stat-card__label">Inativos</span>
        </div>
      </div>

      <div class="filters">
        <mat-form-field appearance="outline" class="filters__search">
          <mat-label>Buscar por nome ou e-mail</mat-label>
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
          <mat-icon>people_outline</mat-icon>
          <p>Nenhum cliente encontrado</p>
        </div>
      } @else {
        <div class="table-container">
          <table mat-table [dataSource]="vm.filtered()">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Nome</th>
              <td mat-cell *matCellDef="let row">{{ row.name }}</td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>E-mail</th>
              <td mat-cell *matCellDef="let row">{{ row.email }}</td>
            </ng-container>

            <ng-container matColumnDef="phone">
              <th mat-header-cell *matHeaderCellDef>Telefone</th>
              <td mat-cell *matCellDef="let row">{{ row.phone }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let row">
                <span class="badge" [class.badge--active]="row.active" [class.badge--inactive]="!row.active">
                  {{ row.active ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let row">
                <a mat-icon-button [routerLink]="['/clients', row.id]" matTooltip="Ver detalhes">
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

    .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .stat-card { background: #fff; border-radius: 12px; padding: 20px 24px; display: flex; flex-direction: column; gap: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); border-left: 4px solid #ccc; }
    .stat-card__value { font-size: 28px; font-weight: 700; }
    .stat-card__label { font-size: 13px; color: #666; }
    .stat-card--active { border-color: #2e7d32; .stat-card__value { color: #2e7d32; } }
    .stat-card--inactive { border-color: #c62828; .stat-card__value { color: #c62828; } }

    .filters { display: flex; gap: 16px; }
    .filters__search { flex: 1; }
    .filters__status { width: 200px; }

    .table-container { background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); overflow: hidden; }
    table { width: 100%; }
    .table-row:hover { background: #f9f9f9; cursor: pointer; }

    .badge { display: inline-block; padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 500; }
    .badge--active { background: #e8f5e9; color: #2e7d32; }
    .badge--inactive { background: #fdecea; color: #c62828; }

    .loading, .empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px; gap: 12px; color: #999; mat-icon { font-size: 48px; width: 48px; height: 48px; } }
  `]
})
export class ClientListComponent implements OnInit {
  vm = inject(ClientListViewModel);
  columns = ['name', 'email', 'phone', 'status', 'actions'];
  searchTermValue = '';
  activeFilterValue: 'all' | 'active' | 'inactive' = 'all';

  ngOnInit(): void {
    this.vm.load();
  }
}
