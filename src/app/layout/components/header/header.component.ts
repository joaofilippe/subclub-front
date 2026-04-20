import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthStore } from '../../../core/auth/auth.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  template: `
    <header class="header">
      <div class="header__spacer"></div>
      <div class="header__user">
        <span>{{ store.user()?.name }}</span>
        <button mat-icon-button (click)="store.logout()" title="Sair">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header { display: flex; align-items: center; padding: 0 24px; height: 64px; border-bottom: 1px solid #e0e0e0; background: #fff; }
    .header__spacer { flex: 1; }
    .header__user { display: flex; align-items: center; gap: 8px; }
  `]
})
export class HeaderComponent {
  store = inject(AuthStore);
}
