import { Component, inject, OnInit, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { BrlCurrencyDirective } from '../../../../../shared/directives';
import { PlanFormViewModel } from './plan-form.viewmodel';

const INTERVAL_PRESETS = [
  { label: '7 dias', value: 7 },
  { label: '14 dias', value: 14 },
  { label: '30 dias', value: 30 },
  { label: '60 dias', value: 60 },
  { label: '90 dias', value: 90 },
  { label: '120 dias', value: 120 },
];

@Component({
  selector: 'app-plan-form',
  standalone: true,
  providers: [PlanFormViewModel],
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    DecimalPipe,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    BrlCurrencyDirective,
  ],
  template: `
    <div class="page">
      <div class="page__header">
        <a mat-icon-button routerLink="/plans">
          <mat-icon>arrow_back</mat-icon>
        </a>
        <h1 class="page__title">{{ id() ? 'Editar Plano' : 'Novo Plano' }}</h1>
      </div>

      @if (vm.loading()) {
        <div class="loading">
          <mat-progress-spinner mode="indeterminate" diameter="40" />
        </div>
      } @else {
        <form [formGroup]="vm.form" (ngSubmit)="vm.save(id())" class="form">
          <!-- Identificação -->
          <div class="form-section">
            <h2 class="form-section__title">Identificação</h2>
            <mat-divider />
            <div class="form-section__body">
              <div class="field-row">
                <mat-form-field appearance="outline" class="field-row__field">
                  <mat-label>Nome do plano</mat-label>
                  <input matInput formControlName="name" />
                  @if (
                    vm.form.get('name')?.invalid && vm.form.get('name')?.touched
                  ) {
                    <mat-error>Nome é obrigatório</mat-error>
                  }
                </mat-form-field>

                <mat-slide-toggle
                  formControlName="active"
                  color="primary"
                  class="active-toggle"
                >
                  Plano ativo
                </mat-slide-toggle>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Descrição</mat-label>
                <textarea
                  matInput
                  formControlName="description"
                  rows="3"
                ></textarea>
                @if (
                  vm.form.get('description')?.invalid &&
                  vm.form.get('description')?.touched
                ) {
                  <mat-error>Descrição é obrigatória</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>URL da imagem</mat-label>
                <input
                  matInput
                  formControlName="imageUrl"
                  placeholder="https://..."
                />
              </mat-form-field>
            </div>
          </div>

          <!-- Precificação -->
          <div class="form-section">
            <h2 class="form-section__title">Precificação</h2>
            <mat-divider />
            <div class="form-section__body">
              <div class="field-row">
                <mat-form-field appearance="outline" class="field-row__field">
                  <mat-label>Valor dos produtos (R$)</mat-label>
                  <span matPrefix class="prefix">R$</span>
                  <input
                    matInput
                    type="text"
                    inputmode="decimal"
                    brlCurrency
                    formControlName="productValue"
                  />
                  @if (
                    vm.form.get('productValue')?.hasError('required') &&
                    vm.form.get('productValue')?.touched
                  ) {
                    <mat-error>Valor obrigatório</mat-error>
                  } @else if (
                    vm.form.get('productValue')?.hasError('min') &&
                    vm.form.get('productValue')?.touched
                  ) {
                    <mat-error>Deve ser maior que zero</mat-error>
                  }
                  <mat-hint>Valor de mercado dos itens da caixa</mat-hint>
                </mat-form-field>

                <mat-form-field appearance="outline" class="field-row__field">
                  <mat-label>Desconto para assinante (R$)</mat-label>
                  <span matPrefix class="prefix">R$</span>
                  <input
                    matInput
                    type="text"
                    inputmode="decimal"
                    brlCurrency
                    formControlName="discountValue"
                  />
                  @if (
                    vm.form
                      .get('discountValue')
                      ?.hasError('discountExceedsProduct') &&
                    vm.form.get('discountValue')?.touched
                  ) {
                    <mat-error
                      >Desconto não pode ser maior que o valor dos
                      produtos</mat-error
                    >
                  } @else if (
                    vm.form.get('discountValue')?.hasError('min') &&
                    vm.form.get('discountValue')?.touched
                  ) {
                    <mat-error>Deve ser zero ou maior</mat-error>
                  }
                  <mat-hint>Economia oferecida ao assinante</mat-hint>
                </mat-form-field>
              </div>

              <!-- Preview de preço -->
              <div class="price-preview">
                <div class="price-preview__item">
                  <span class="price-preview__label">Valor dos produtos</span>
                  <span class="price-preview__value">{{
                    vm.form.get('productValue')?.value
                      | currency: 'BRL' : 'symbol' : '1.2-2'
                  }}</span>
                </div>
                <div class="price-preview__item price-preview__item--discount">
                  <span class="price-preview__label">
                    Desconto
                    @if (vm.discountPercent() > 0) {
                      <span class="discount-badge"
                        >{{ vm.discountPercent() | number: '1.0-1' }}% off</span
                      >
                    }
                  </span>
                  <span
                    class="price-preview__value price-preview__value--discount"
                  >
                    −
                    {{
                      vm.form.get('discountValue')?.value
                        | currency: 'BRL' : 'symbol' : '1.2-2'
                    }}
                  </span>
                </div>
                <mat-divider />
                <div class="price-preview__item price-preview__item--total">
                  <span class="price-preview__label">Assinante paga</span>
                  <span
                    class="price-preview__value price-preview__value--total"
                    >{{
                      vm.finalPrice() | currency: 'BRL' : 'symbol' : '1.2-2'
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Entrega -->
          <div class="form-section">
            <h2 class="form-section__title">Entrega</h2>
            <mat-divider />
            <div class="form-section__body">
              <p class="field-label">Intervalo entre entregas</p>
              <div class="interval-presets">
                @for (preset of presets; track preset.value) {
                  <button
                    type="button"
                    class="preset-btn"
                    [class.preset-btn--active]="
                      vm.form.get('intervalDays')?.value === preset.value
                    "
                    (click)="
                      vm.form.get('intervalDays')?.setValue(preset.value)
                    "
                  >
                    {{ preset.label }}
                  </button>
                }
              </div>

              <mat-form-field appearance="outline" style="width:180px">
                <mat-label>Personalizado (dias)</mat-label>
                <input
                  matInput
                  type="number"
                  min="1"
                  formControlName="intervalDays"
                />
                @if (
                  vm.form.get('intervalDays')?.hasError('min') &&
                  vm.form.get('intervalDays')?.touched
                ) {
                  <mat-error>Mínimo 1 dia</mat-error>
                }
                <mat-hint>Ou digite um valor personalizado</mat-hint>
              </mat-form-field>
            </div>
          </div>

          @if (vm.error()) {
            <p class="form-error">{{ vm.error() }}</p>
          }

          <div class="form-actions">
            <a mat-stroked-button routerLink="/plans">Cancelar</a>
            <button
              mat-flat-button
              color="primary"
              type="submit"
              [disabled]="vm.saving()"
            >
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
  styles: [
    `
      .page {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .page__header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .page__title {
        font-size: 22px;
        font-weight: 700;
        margin: 0;
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .form-section {
        background: #fff;
        border-radius: 12px;
        padding: 32px 40px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
        display: flex;
        flex-direction: column;
      }
      .form-section__title {
        font-size: 15px;
        font-weight: 600;
        margin: 0 0 20px;
        color: #444;
      }
      .form-section__body {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 28px;
      }

      .field-row {
        display: flex;
        gap: 24px;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-bottom: 16px;
      }
      .field-row__field {
        flex: 1;
        min-width: 220px;
      }
      .active-toggle {
        align-self: center;
        margin-top: 4px;
      }

      mat-form-field {
        width: 100%;
      }
      .prefix {
        margin: 0 0.03rem 0 1rem;
      }

      /* Price preview */
      .price-preview {
        background: #f8f5ff;
        border-radius: 10px;
        padding: 16px 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .price-preview__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .price-preview__item--discount .price-preview__label {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .price-preview__item--total {
        margin-top: 4px;
      }
      .price-preview__label {
        font-size: 13px;
        color: #666;
      }
      .price-preview__value {
        font-size: 14px;
        font-weight: 500;
      }
      .price-preview__value--discount {
        color: #2e7d32;
      }
      .price-preview__value--total {
        font-size: 20px;
        font-weight: 700;
        color: #6750a4;
      }
      .discount-badge {
        background: #e8f5e9;
        color: #2e7d32;
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 99px;
      }

      /* Interval presets */
      .field-label {
        font-size: 13px;
        color: #555;
        margin: 0;
      }
      .interval-presets {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .preset-btn {
        padding: 6px 16px;
        border-radius: 99px;
        border: 1px solid #ccc;
        background: #fff;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.15s;
      }
      .preset-btn:hover {
        border-color: #6750a4;
        color: #6750a4;
      }
      .preset-btn--active {
        border-color: #6750a4;
        background: #6750a4;
        color: #fff;
        font-weight: 500;
      }

      .form-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }
      .form-error {
        color: #c62828;
        font-size: 13px;
        margin: 0;
      }
      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 64px;
      }
    `,
  ],
})
export class PlanFormComponent implements OnInit {
  id = input<string>();
  vm = inject(PlanFormViewModel);
  presets = INTERVAL_PRESETS;

  ngOnInit(): void {
    const id = this.id();
    if (id) this.vm.load(id);
  }
}
