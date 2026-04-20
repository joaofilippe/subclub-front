import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { LoginViewModel } from './login.viewmodel';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [LoginViewModel],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-card__logo">
          <mat-icon>subscriptions</mat-icon>
          <h1>SubClub</h1>
        </div>

        <h2 class="auth-card__title">Entrar na plataforma</h2>

        @if (vm.error()) {
          <div class="auth-card__error">
            <mat-icon>error_outline</mat-icon>
            {{ vm.error() }}
          </div>
        }

        <form [formGroup]="vm.form" (ngSubmit)="vm.submit()" class="auth-card__form">
          <mat-form-field appearance="outline">
            <mat-label>E-mail</mat-label>
            <input matInput type="email" formControlName="email" autocomplete="email" />
            @if (vm.form.controls.email.hasError('required') && vm.form.controls.email.touched) {
              <mat-error>E-mail é obrigatório</mat-error>
            } @else if (vm.form.controls.email.hasError('email') && vm.form.controls.email.touched) {
              <mat-error>E-mail inválido</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Senha</mat-label>
            <input matInput [type]="showPassword ? 'text' : 'password'" formControlName="password" autocomplete="current-password" />
            <button mat-icon-button matSuffix type="button" (click)="showPassword = !showPassword">
              <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            @if (vm.form.controls.password.hasError('required') && vm.form.controls.password.touched) {
              <mat-error>Senha é obrigatória</mat-error>
            } @else if (vm.form.controls.password.hasError('minlength') && vm.form.controls.password.touched) {
              <mat-error>Mínimo 6 caracteres</mat-error>
            }
          </mat-form-field>

          <button
            mat-flat-button
            color="primary"
            type="submit"
            class="auth-card__submit"
            [disabled]="vm.loading()"
          >
            @if (vm.loading()) {
              <mat-progress-spinner diameter="20" mode="indeterminate" />
            } @else {
              Entrar
            }
          </button>
        </form>

        <p class="auth-card__footer">
          Não tem conta? <a routerLink="/auth/register">Cadastre-se</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
    }
    .auth-card {
      background: #fff;
      border-radius: 12px;
      padding: 40px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }
    .auth-card__logo {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
      color: #6750a4;
      mat-icon { font-size: 32px; width: 32px; height: 32px; }
      h1 { font-size: 24px; font-weight: 700; margin: 0; }
    }
    .auth-card__title {
      font-size: 18px;
      font-weight: 500;
      margin: 0 0 24px;
      color: #333;
    }
    .auth-card__error {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #fdecea;
      color: #c62828;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 16px;
      font-size: 14px;
    }
    .auth-card__form {
      display: flex;
      flex-direction: column;
      gap: 4px;
      mat-form-field { width: 100%; }
    }
    .auth-card__submit {
      width: 100%;
      height: 44px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .auth-card__footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #666;
      a { color: #6750a4; text-decoration: none; font-weight: 500; }
    }
  `]
})
export class LoginComponent {
  vm = inject(LoginViewModel);
  showPassword = false;
}
