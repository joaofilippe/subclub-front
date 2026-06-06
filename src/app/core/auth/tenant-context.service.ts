import { Injectable, inject, computed } from '@angular/core';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class TenantContextService {
  private authStore = inject(AuthStore);

  readonly accountSlug = computed(() => this.authStore.accountSlug());

  readonly displayName = computed(() => {
    const slug = this.authStore.accountSlug();
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  });

  readonly hasTenantContext = computed(() => !!this.authStore.accountSlug());
}
