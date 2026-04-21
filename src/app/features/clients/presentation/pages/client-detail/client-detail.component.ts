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
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss'
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
