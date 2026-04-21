import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Assinaturas', icon: 'subscriptions', route: '/subscriptions' },
    { label: 'Clientes', icon: 'people', route: '/clients' },
    { label: 'Planos', icon: 'inventory_2', route: '/plans' },
    { label: 'Produtos', icon: 'category', route: '/products' }
  ];
}
