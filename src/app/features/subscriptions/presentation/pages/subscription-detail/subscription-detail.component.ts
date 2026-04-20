import { Component, inject, OnInit, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { SubscriptionDetailViewModel } from './subscription-detail.viewmodel';
import { canCancelSubscription, canPauseSubscription } from '../../../domain/rules/subscription.rules';

@Component({
  selector: 'app-subscription-detail',
  standalone: true,
  providers: [SubscriptionDetailViewModel],
  imports: [DatePipe, RouterLink, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatDividerModule],
  template: `
    <div class="page">
      <div class="page__header">
        <a mat-icon-button routerLink="/subscriptions">
          <mat-icon>arrow_back</mat-icon>
        </a>
        <h1 class="page__title">Detalhe da Assinatura</h1>
      </div>

      @if (vm.loading()) {
        <div class="loading"><mat-progress-spinner mode="indeterminate" diameter="40" /></div>
      } @else if (vm.subscription()) {
        <div class="detail-grid">
          <div class="detail-card">
            <h2 class="detail-card__title">Cliente & Plano</h2>
            <mat-divider />
            <div class="detail-card__body">
              <div class="detail-row">
                <span class="detail-row__label">Cliente</span>
                <span class="detail-row__value">{{ vm.subscription()!.clientName }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">Plano</span>
                <span class="detail-row__value">{{ vm.subscription()!.planName }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">Início</span>
                <span class="detail-row__value">{{ vm.subscription()!.startDate | date:'dd/MM/yyyy' }}</span>
              </div>
            </div>
          </div>

          <div class="detail-card">
            <h2 class="detail-card__title">Status</h2>
            <mat-divider />
            <div class="detail-card__body">
              <div class="detail-row">
                <span class="detail-row__label">Assinatura</span>
                <span class="badge badge--{{ vm.subscription()!.status }}">{{ statusLabel(vm.subscription()!.status) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">Envio</span>
                <span class="badge badge--shipment-{{ vm.subscription()!.shipmentStatus }}">{{ shipmentLabel(vm.subscription()!.shipmentStatus) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">Próx. cobrança</span>
                <span class="detail-row__value" [class.text-warning]="vm.subscription()!.daysUntilRenewal <= 7 && vm.subscription()!.status === 'active'">
                  {{ vm.subscription()!.nextBillingDate | date:'dd/MM/yyyy' }}
                  @if (vm.subscription()!.status === 'active') {
                    <small>({{ vm.subscription()!.daysUntilRenewal }}d)</small>
                  }
                </span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">Próx. envio</span>
                <span class="detail-row__value">{{ vm.subscription()!.nextShipmentDate | date:'dd/MM/yyyy' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="actions">
          @if (canPause(vm.subscription()!)) {
            <button mat-stroked-button color="warn" (click)="vm.pause(vm.subscription()!.id)">
              <mat-icon>pause</mat-icon> Pausar assinatura
            </button>
          }
          @if (vm.subscription()!.status === 'paused') {
            <button mat-stroked-button color="primary" (click)="vm.resume(vm.subscription()!.id)">
              <mat-icon>play_arrow</mat-icon> Retomar assinatura
            </button>
          }
          @if (canCancel(vm.subscription()!)) {
            <button mat-stroked-button color="warn" (click)="vm.cancel(vm.subscription()!.id)">
              <mat-icon>cancel</mat-icon> Cancelar assinatura
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page { display: flex; flex-direction: column; gap: 24px; }
    .page__header { display: flex; align-items: center; gap: 8px; }
    .page__title { font-size: 22px; font-weight: 700; margin: 0; }

    .detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .detail-card { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
    .detail-card__title { font-size: 15px; font-weight: 600; margin: 0 0 16px; color: #444; }
    .detail-card__body { display: flex; flex-direction: column; gap: 16px; padding-top: 16px; }

    .detail-row { display: flex; justify-content: space-between; align-items: center; }
    .detail-row__label { font-size: 13px; color: #777; }
    .detail-row__value { font-size: 14px; font-weight: 500; }

    .actions { display: flex; gap: 12px; }

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
    .loading { display: flex; align-items: center; justify-content: center; padding: 64px; }
  `]
})
export class SubscriptionDetailComponent implements OnInit {
  id = input.required<string>();
  vm = inject(SubscriptionDetailViewModel);

  ngOnInit(): void {
    this.vm.load(this.id());
  }

  canCancel = canCancelSubscription;
  canPause = canPauseSubscription;

  statusLabel(status: string): string {
    const labels: Record<string, string> = { active: 'Ativa', paused: 'Pausada', cancelled: 'Cancelada', expired: 'Expirada' };
    return labels[status] ?? status;
  }

  shipmentLabel(status: string): string {
    const labels: Record<string, string> = { pending: 'Pendente', preparing: 'Preparando', shipped: 'Enviado', delivered: 'Entregue' };
    return labels[status] ?? status;
  }
}
