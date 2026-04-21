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
    const labels: Record<string, string> = { active: 'Ativa', paused: 'Pausada', cancelled: 'Cancelada', expired: 'Expirada' };
    return labels[status] ?? status;
  }

  shipmentLabel(status: string): string {
    const labels: Record<string, string> = { pending: 'Pendente', preparing: 'Preparando', shipped: 'Enviado', delivered: 'Entregue' };
    return labels[status] ?? status;
  }
}
