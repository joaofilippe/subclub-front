import { Injectable, inject, signal, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthStore } from '../../../../../core/auth/auth.store';
import { AccountService } from '../../../application/account.service';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const newPw = group.get('newPassword')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return newPw && confirm && newPw !== confirm ? { passwordMismatch: true } : null;
}

@Injectable()
export class AccountProfileViewModel implements OnDestroy {
  private authStore = inject(AuthStore);
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  private sub = new Subscription();

  readonly user = this.authStore.user;

  readonly profileForm = this.fb.group({
    name: [this.user()?.name ?? '', [Validators.required, Validators.minLength(2)]],
    email: [this.user()?.email ?? '', [Validators.required, Validators.email]]
  });

  readonly passwordForm = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  readonly profileLoading = signal(false);
  readonly profileSuccess = signal(false);
  readonly profileError = signal<string | null>(null);

  readonly passwordLoading = signal(false);
  readonly passwordSuccess = signal(false);
  readonly passwordError = signal<string | null>(null);

  updateProfile(): void {
    if (this.profileForm.invalid || this.profileLoading()) return;

    this.profileLoading.set(true);
    this.profileSuccess.set(false);
    this.profileError.set(null);

    const { name, email } = this.profileForm.getRawValue();

    this.sub.add(
      this.accountService.updateProfile({ name: name!, email: email! }).subscribe({
        next: () => {
          this.authStore.updateUser({ name: name!, email: email! });
          this.profileSuccess.set(true);
          this.profileLoading.set(false);
          setTimeout(() => this.profileSuccess.set(false), 3000);
        },
        error: err => {
          this.profileError.set(err?.error?.message ?? 'Erro ao atualizar perfil');
          this.profileLoading.set(false);
        }
      })
    );
  }

  changePassword(): void {
    if (this.passwordForm.invalid || this.passwordLoading()) return;

    this.passwordLoading.set(true);
    this.passwordSuccess.set(false);
    this.passwordError.set(null);

    const { currentPassword, newPassword } = this.passwordForm.getRawValue();

    this.sub.add(
      this.accountService.changePassword({ currentPassword: currentPassword!, newPassword: newPassword! }).subscribe({
        next: () => {
          this.passwordSuccess.set(true);
          this.passwordLoading.set(false);
          this.passwordForm.reset();
          setTimeout(() => this.passwordSuccess.set(false), 3000);
        },
        error: err => {
          this.passwordError.set(err?.error?.message ?? 'Erro ao alterar senha');
          this.passwordLoading.set(false);
        }
      })
    );
  }

  roleLabel(role: string | undefined): string {
    return role === 'admin' ? 'Administrador' : 'Operações';
  }

  typeLabel(type: string | undefined): string {
    const map: Record<string, string> = { individual: 'Individual', corporate: 'Corporativo', system: 'Sistema' };
    return map[type ?? ''] ?? type ?? '';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
