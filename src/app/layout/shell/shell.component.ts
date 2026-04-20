import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="shell">
      <app-sidebar />
      <div class="shell__main">
        <app-header />
        <main class="shell__content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .shell { display: flex; height: 100vh; overflow: hidden; }
    .shell__main { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
    .shell__content { flex: 1; overflow-y: auto; padding: 24px; }
  `]
})
export class ShellComponent {}
