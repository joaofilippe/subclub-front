import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/http/api.service';
import { ChangePasswordRequest, UpdateProfileRequest } from '../domain/models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private api = inject(ApiService);

  updateProfile(data: UpdateProfileRequest): Observable<{ message: string }> {
    return this.api.put<{ message: string }>('/auth/profile', data);
  }

  changePassword(data: ChangePasswordRequest): Observable<{ message: string }> {
    return this.api.post<{ message: string }>('/auth/change-password', data);
  }
}
