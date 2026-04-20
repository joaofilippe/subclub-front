import { Component, inject, OnInit, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClientDetailViewModel } from './client-detail.viewmodel';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  providers: [ClientDetailViewModel],
  imports: [
    DatePipe, RouterLink,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    MatDividerModule, MatTableModule, MatTooltipModule
  ],
  template: `
    <div class="page">
      <div class="page__header">
        <a mat-icon-button routerLink="/clients">
          <mat-icon>arrow_back</mat-icon>
        </a>
        <h1 class="page__title">Detalhe do Cliente</h1>
      </div>

      @if (vm.loading()) {
        <div class="loading"><mat-progress-spinner mode="indeterminate" diameter="40" /></div>
      } @else if (vm.client()) {
        <div class="detail-grid">
          <div class="detail-card">
            <div class="detail-card__title-row">
              <h2 class="detail-card__title">Informações Pessoais</h2>
              <span class="badge" [class.badge--active]="vm.client()!.active" [class.badge--inactive]="!vm.client()!.active">
                {{ vm.client()!.active ? 'Ativo' : 'Inativo' }}
              </span>
            </div>
            <mat-divider />
            <div class="detail-card__body">
              <div class="detail-row">
                <span class="detail-row__label">Nome</span>
                <span class="detail-row__value">{{ vm.client()!.name }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">E-mail</span>
                <span class="detail-row__value">{{ vm.client()!.email }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">Telefone</span>
                <span class="detail-row__value">{{ vm.client()!.phone }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">CPF / CNPJ</span>
                <span class="detail-row__value">{{ vm.client()!.document }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">Cliente desde</span>
                <span class="detail-row__value">{{ vm.client()!.createdAt | date:'dd/MM/yyyy' }}</span>
              </div>
            </div>
          </div>

          @if (vm.client()!.address) {
          <div class="detail-card">
            <h2 class="detail-card__title" style="margin-bottom:16px">Endereço</h2>
            <mat-divider />
            <div class="detail-card__body">
              <div class="detail-row">
                <span class="detail-row__label">CEP</span>
                <span class="detail-row__value">{{ vm.client()!.address!.zipCode }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">Logradouro</span>
                <span class="detail-row__value">{{ vm.client()!.address!.street }}, {{ vm.client()!.address!.number }}</span>
              </div>
              @if (vm.client()!.address!.complement) {
                <div class="detail-row">
                  <span class="detail-row__label">Complemento</span>
                  <span class="detail-row__value">{{ vm.client()!.address!.complement }}</span>
                </div>
              }
              <div class="detail-row">
                <span class="detail-row__label">Bairro</span>
                <span class="detail-row__value">{{ vm.client()!.address!.neighborhood }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">Cidade / UF</span>
                <span class="detail-row__value">{{ vm.client()!.address!.city }} — {{ vm.client()!.address!.state }}</span>
              </div>
            </div>
          </div>
          }

          <div class="detail-card detail-card--actions">
            <h2 class="detail-card__title">Ações</h2>
            <mat-divider />
            <div class="detail-card__body">
              <a mat-flat-button color="primary" [routerLink]="['/clients', id(), 'edit']">
                <mat-icon>edit</mat-icon> Editar cliente
              </a>
              @if (vm.client()!.active) {
                <button mat-stroked-button color="warn" (click)="vm.toggleActive()">
                  <mat-icon>block</mat-icon> Desativar cliente
                </button>
              } @else {
                <button mat-stroked-button color="primary" (click)="vm.toggleActive()">
                  <mat-icon>check_circle</mat-icon> Reativar cliente
                </button>
              }
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section__title">Assinaturas</h2>

          @if (vm.loadingSubs()) {
            <div class="loading"><mat-progress-spinner mode="indeterminate" diameter="32" /></div>
          } @else if (vm.subscriptions().length === 0) {
            <div class="empty">
              <mat-icon>inbox</mat-icon>
              <p>Nenhuma assinatura encontrada</p>
            </div>
          } @else {
            <div class="table-container">
              <table mat-table [dataSource]="vm.subscriptions()">
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

                <ng-container matColumnDef="nextBilling">
                  <th mat-header-cell *matHeaderCellDef>Próx. cobrança</th>
                  <td mat-cell *matCellDef="let row">{{ row.nextBillingDate | date:'dd/MM/yyyy' }}</td>
                </ng-container>

                <ng-container matColumnDef="startDate">
                  <th mat-header-cell *matHeaderCellDef>Início</th>
                  <td mat-cell *matCellDef="let row">{{ row.startDate | date:'dd/MM/yyyy' }}</td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let row">
                    <a mat-icon-button [routerLink]="['/subscriptions', row.id]" matTooltip="Ver detalhes">
                      <mat-icon>chevron_right</mat-icon>
                    </a>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="subColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: subColumns" class="table-row"></tr>
              </table>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page { display: flex; flex-direction: column; gap: 24px; }
    .page__header { display: flex; align-items: center; gap: 8px; }
    .page__title { font-size: 22px; font-weight: 700; margin: 0; }

    .detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .detail-card { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
    .detail-card__title-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .detail-card__title { font-size: 15px; font-weight: 600; margin: 0; color: #444; }
    .detail-card__body { display: flex; flex-direction: column; gap: 16px; padding-top: 16px; }
    .detail-card--actions .detail-card__body { gap: 12px; }

    .detail-row { display: flex; justify-content: space-between; align-items: center; }
    .detail-row__label { font-size: 13px; color: #777; }
    .detail-row__value { font-size: 14px; font-weight: 500; }

    .section { display: flex; flex-direction: column; gap: 16px; }
    .section__title { font-size: 17px; font-weight: 700; margin: 0; }

    .table-container { background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); overflow: hidden; }
    table { width: 100%; }
    .table-row:hover { background: #f9f9f9; cursor: pointer; }

    .badge { display: inline-block; padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 500; }
    .badge--active { background: #e8f5e9; color: #2e7d32; }
    .badge--inactive { background: #fdecea; color: #c62828; }
    .badge--paused { background: #fff3e0; color: #f57c00; }
    .badge--cancelled { background: #fdecea; color: #c62828; }
    .badge--expired { background: #f5f5f5; color: #555; }
    .badge--shipment-pending { background: #f5f5f5; color: #555; }
    .badge--shipment-preparing { background: #e3f2fd; color: #1565c0; }
    .badge--shipment-shipped { background: #ede7f6; color: #4527a0; }
    .badge--shipment-delivered { background: #e8f5e9; color: #2e7d32; }

    .loading { display: flex; align-items: center; justify-content: center; padding: 48px; }
    .empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px; gap: 8px; color: #999;
      mat-icon { font-size: 40px; width: 40px; height: 40px; } }
  `]
})
export class ClientDetailComponent implements OnInit {
  id = input.required<string>();
  vm = inject(ClientDetailViewModel);

  subColumns = ['plan', 'status', 'shipment', 'nextBilling', 'startDate', 'actions'];

  ngOnInit(): void {
    this.vm.load(this.id());
  }

  statusLabel(status: string): string {
    const labels: Record<string, string> = { active: 'Ativa', paused: 'Pausada', cancelled: 'Cancelada', expired: 'Expirada' };
    return labels[status] ?? status;
  }

  shipmentLabel(status: string): string {
    const labels: Record<string, string> = { pending: 'Pendente', preparing: 'Preparando', shipped: 'Enviado', delivered: 'Entregue' };
    return labels[status] ?? status;
  }
}
