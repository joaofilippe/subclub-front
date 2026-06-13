import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../core/theme.service';
import { AuthStore } from '../../../core/auth/auth.store';

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
  themeService = inject(ThemeService);
  authStore = inject(AuthStore);

  navItems: NavItem[] = [
    { label: 'Assinaturas', icon: 'subscriptions', route: '/subscriptions' },
    { label: 'Clientes', icon: 'people', route: '/clients' },
    { label: 'Planos', icon: 'inventory_2', route: '/plans' },
    { label: 'Produtos', icon: 'category', route: '/products' },
  ];

  adminNavItems: NavItem[] = [
    { label: 'Contas',        icon: 'domain',       route: '/accounts' },
    { label: 'Planos de conta', icon: 'layers',     route: '/account-plans' },
    { label: 'Módulos',       icon: 'extension',    route: '/modules' },
    { label: 'Usuários',      icon: 'group',        route: '/users' },
  ];

  accountNavItem: NavItem = { label: 'Minha Conta', icon: 'manage_accounts', route: '/account' };
}
