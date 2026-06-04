import { Component, inject, OnInit, input } from '@angular/core';
import { DatePipe, LowerCasePipe } from '@angular/common';
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
  imports: [DatePipe, LowerCasePipe, RouterLink, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatDividerModule],
  templateUrl: './subscription-detail.component.html',
  styleUrl: './subscription-detail.component.scss'
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
    const labels: Record<string, string> = { ACTIVE: 'Ativa', PAUSED: 'Pausada', CANCELLED: 'Cancelada', EXPIRED: 'Expirada' };
    return labels[status] ?? status;
  }

  shipmentLabel(status: string): string {
    const labels: Record<string, string> = { PENDING: 'Pendente', PREPARING: 'Preparando', SHIPPED: 'Enviado', DELIVERED: 'Entregue' };
    return labels[status] ?? status;
  }
}
