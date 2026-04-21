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
  templateUrl: './subscription-list.component.html',
  styleUrl: './subscription-list.component.scss'
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
