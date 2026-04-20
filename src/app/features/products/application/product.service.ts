import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { Product, ProductFilter } from '../domain/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = inject(ApiService);

  getAll(filter: ProductFilter = {}): Observable<Product[]> {
    return this.api.get<Product[]>('/products', filter as Record<string, string | number>);
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
