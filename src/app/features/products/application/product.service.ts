import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { Product, ProductFilter } from '../domain/models/product.model';

function extractItems<T>(res: unknown): T[] {
  if (Array.isArray(res)) return res as T[];
  const r = res as Record<string, unknown>;
  if (Array.isArray(r['items'])) return r['items'] as T[];
  if (Array.isArray(r['data'])) return r['data'] as T[];
  const nested = r['data'] as Record<string, unknown> | undefined;
  if (nested && Array.isArray(nested['items'])) return nested['items'] as T[];
  return [];
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = inject(ApiService);

  getAll(filter: ProductFilter = {}): Observable<Product[]> {
    const params: Record<string, string | number> = {};
    if (filter.search) params['search'] = filter.search;
    if (filter.category && filter.category !== 'all') params['category'] = filter.category;
    if (filter.active !== undefined) params['active'] = String(filter.active);

    return this.api.get<unknown>('/products', params).pipe(
      map(res => extractItems<Product>(res))
    );
  }

  getById(id: string): Observable<Product> {
    return this.api.get<Product>(`/products/${id}`);
  }

  create(data: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    return this.api.post<Product>('/products', data);
  }

  update(id: string, data: Partial<Product>): Observable<Product> {
    return this.api.put<Product>(`/products/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`/products/${id}`);
  }
}
