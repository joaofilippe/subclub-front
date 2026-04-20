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
  template: `
    <nav class="sidebar">
      <div class="sidebar__brand">SubClub</div>
      <ul class="sidebar__nav">
        @for (item of navItems; track item.route) {
          <li>
            <a [routerLink]="item.route" routerLinkActive="active" class="sidebar__link">
              <mat-icon>{{ item.icon }}</mat-icon>
              <span>{{ item.label }}</span>
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [`
    :host { display: flex; height: 100%; }
    .sidebar { width: 240px; background: #1e1e2e; color: #fff; display: flex; flex-direction: column; padding: 16px 0; flex: 1; }
    .sidebar__brand { font-size: 20px; font-weight: 700; padding: 0 24px 24px; }
    .sidebar__nav { list-style: none; padding: 0; margin: 0; }
    .sidebar__link { display: flex; align-items: center; gap: 12px; padding: 12px 24px; color: #ccc; text-decoration: none; }
    .sidebar__link:hover, .sidebar__link.active { color: #fff; background: rgba(255,255,255,0.1); }
  `]
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Assinaturas', icon: 'subscriptions', route: '/subscriptions' },
    { label: 'Clientes', icon: 'people', route: '/clients' },
    { label: 'Planos', icon: 'inventory_2', route: '/plans' },
    { label: 'Produtos', icon: 'category', route: '/products' }
  ];
}
