import { Injectable, computed, effect, signal } from '@angular/core';

type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'subclub-theme';

  theme = signal<Theme>(this.getSavedTheme());
  isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => {
      const theme = this.theme();
      document.body.classList.remove('dark-theme', 'light-theme');
      document.body.classList.add(`${theme}-theme`);
      localStorage.setItem(this.storageKey, theme);
    });
  }

  toggle() {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }

  private getSavedTheme(): Theme {
    return (localStorage.getItem(this.storageKey) as Theme) ?? 'dark';
  }
}
