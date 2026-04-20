import { Component, inject, OnInit, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { CepMaskDirective } from '../../../../../shared/directives';
import { ClientEditViewModel } from './client-edit.viewmodel';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  providers: [ClientEditViewModel],
  imports: [
    ReactiveFormsModule, RouterLink,
    MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatSlideToggleModule,
    MatProgressSpinnerModule, MatDividerModule, CepMaskDirective,
  ],
  template: `
    <div class="page">
      <div class="page__header">
        <a mat-icon-button [routerLink]="['/clients', id()]">
          <mat-icon>arrow_back</mat-icon>
        </a>
        <h1 class="page__title">Editar Cliente</h1>
      </div>

      @if (vm.loading()) {
        <div class="loading"><mat-progress-spinner mode="indeterminate" diameter="40" /></div>
      } @else {
        <form [formGroup]="vm.form" (ngSubmit)="vm.save(id())" class="form">

          <div class="form-section">
            <h2 class="form-section__title">Informações Pessoais</h2>
            <mat-divider />
            <div class="form-section__body">

              <div class="field-row">
                <mat-form-field appearance="outline" class="field-row__field">
                  <mat-label>Nome</mat-label>
                  <input matInput formControlName="name" />
                  @if (vm.form.get('name')?.invalid && vm.form.get('name')?.touched) {
                    <mat-error>Nome é obrigatório</mat-error>
                  }
                </mat-form-field>

                <mat-form-field appearance="outline" class="field-row__field">
                  <mat-label>CPF / CNPJ</mat-label>
                  <input matInput formControlName="document" />
                  @if (vm.form.get('document')?.invalid && vm.form.get('document')?.touched) {
                    <mat-error>Documento é obrigatório</mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="field-row">
                <mat-form-field appearance="outline" class="field-row__field">
                  <mat-label>E-mail</mat-label>
                  <input matInput formControlName="email" type="email" />
                  @if (vm.form.get('email')?.hasError('required') && vm.form.get('email')?.touched) {
                    <mat-error>E-mail é obrigatório</mat-error>
                  } @else if (vm.form.get('email')?.hasError('email') && vm.form.get('email')?.touched) {
                    <mat-error>E-mail inválido</mat-error>
                  }
                </mat-form-field>

                <mat-form-field appearance="outline" class="field-row__field">
                  <mat-label>Telefone</mat-label>
                  <input matInput formControlName="phone" />
                  @if (vm.form.get('phone')?.invalid && vm.form.get('phone')?.touched) {
                    <mat-error>Telefone é obrigatório</mat-error>
                  }
                </mat-form-field>
              </div>

              <mat-slide-toggle formControlName="active" color="primary">
                Cliente ativo
              </mat-slide-toggle>

            </div>
          </div>

          <div class="form-section" formGroupName="address">
            <h2 class="form-section__title">Endereço</h2>
            <mat-divider />
            <div class="form-section__body">

              <div class="field-row">
                <mat-form-field appearance="outline" style="width:180px">
                  <mat-label>CEP</mat-label>
                  <input matInput formControlName="zipCode" cepMask (blur)="vm.lookupCep()" />
                  @if (vm.cepLoading()) {
                    <mat-progress-spinner matSuffix mode="indeterminate" diameter="18" />
                  }
                  @if (vm.form.get('address.zipCode')?.invalid && vm.form.get('address.zipCode')?.touched) {
                    <mat-error>CEP é obrigatório</mat-error>
                  }
                </mat-form-field>

                <mat-form-field appearance="outline" class="field-row__field">
                  <mat-label>Logradouro</mat-label>
                  <input matInput formControlName="street" />
                  @if (vm.form.get('address.street')?.invalid && vm.form.get('address.street')?.touched) {
                    <mat-error>Logradouro é obrigatório</mat-error>
                  }
                </mat-form-field>

                <mat-form-field appearance="outline" style="width:120px">
                  <mat-label>Número</mat-label>
                  <input matInput formControlName="number" />
                  @if (vm.form.get('address.number')?.invalid && vm.form.get('address.number')?.touched) {
                    <mat-error>Obrigatório</mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="field-row">
                <mat-form-field appearance="outline" style="width:200px">
                  <mat-label>Complemento</mat-label>
                  <input matInput formControlName="complement" />
                </mat-form-field>

                <mat-form-field appearance="outline" class="field-row__field">
                  <mat-label>Bairro</mat-label>
                  <input matInput formControlName="neighborhood" />
                  @if (vm.form.get('address.neighborhood')?.invalid && vm.form.get('address.neighborhood')?.touched) {
                    <mat-error>Bairro é obrigatório</mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="field-row">
                <mat-form-field appearance="outline" class="field-row__field">
                  <mat-label>Cidade</mat-label>
                  <input matInput formControlName="city" />
                  @if (vm.form.get('address.city')?.invalid && vm.form.get('address.city')?.touched) {
                    <mat-error>Cidade é obrigatória</mat-error>
                  }
                </mat-form-field>

                <mat-form-field appearance="outline" style="width:100px">
                  <mat-label>UF</mat-label>
                  <input matInput formControlName="state" maxlength="2" style="text-transform:uppercase" />
                  @if (vm.form.get('address.state')?.invalid && vm.form.get('address.state')?.touched) {
                    <mat-error>UF inválida</mat-error>
                  }
                </mat-form-field>
              </div>

            </div>
          </div>

          @if (vm.error()) {
            <p class="form-error">{{ vm.error() }}</p>
          }

          <div class="form-actions">
            <a mat-stroked-button [routerLink]="['/clients', id()]">Cancelar</a>
            <button mat-flat-button color="primary" type="submit" [disabled]="vm.saving()">
              @if (vm.saving()) {
                <mat-progress-spinner mode="indeterminate" diameter="18" />
              } @else {
                <mat-icon>save</mat-icon>
              }
              Salvar
            </button>
          </div>

        </form>
      }
    </div>
  `,
  styles: [`
    .page { display: flex; flex-direction: column; gap: 24px; }
    .page__header { display: flex; align-items: center; gap: 8px; }
    .page__title { font-size: 22px; font-weight: 700; margin: 0; }

    .form { display: flex; flex-direction: column; gap: 24px; }

    .form-section { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); display: flex; flex-direction: column; gap: 0; }
    .form-section__title { font-size: 15px; font-weight: 600; margin: 0 0 16px; color: #444; }
    .form-section__body { display: flex; flex-direction: column; gap: 4px; padding-top: 20px; }

    .field-row { display: flex; gap: 16px; align-items: flex-start; flex-wrap: wrap; }
    .field-row__field { flex: 1; min-width: 200px; }

    .form-actions { display: flex; gap: 12px; justify-content: flex-end; }
    .form-error { color: #c62828; font-size: 13px; margin: 0; }

    .loading { display: flex; align-items: center; justify-content: center; padding: 64px; }

    mat-slide-toggle { margin-top: 8px; }
  `]
})
export class ClientEditComponent implements OnInit {
  id = input.required<string>();
  vm = inject(ClientEditViewModel);

  ngOnInit(): void {
    this.vm.load(this.id());
  }
}
