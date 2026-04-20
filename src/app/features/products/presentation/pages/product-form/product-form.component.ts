import { Component, inject, OnInit, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ProductFormViewModel } from './product-form.viewmodel';
import { PRODUCT_CATEGORIES } from '../../../domain/models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  providers: [ProductFormViewModel],
  imports: [
    ReactiveFormsModule, RouterLink,
    MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatSlideToggleModule,
    MatProgressSpinnerModule, MatDividerModule,
  ],
  template: `
    <div class="page">
      <div class="page__header">
        <a mat-icon-button routerLink="/products">
          <mat-icon>arrow_back</mat-icon>
        </a>
        <h1 class="page__title">{{ id() ? 'Editar Produto' : 'Novo Produto' }}</h1>
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
                  <mat-label>Nome do produto</mat-label>
                  <input matInput formControlName="name" />
                  @if (vm.form.get('name')?.invalid && vm.form.get('name')?.touched) {
                    <mat-error>Nome é obrigatório</mat-error>
                  }
                </mat-form-field>

                <mat-slide-toggle formControlName="active" color="primary" class="active-toggle">
                  Produto ativo
                </mat-slide-toggle>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Descrição</mat-label>
                <textarea matInput formControlName="description" rows="3"></textarea>
                @if (vm.form.get('description')?.invalid && vm.form.get('description')?.touched) {
                  <mat-error>Descrição é obrigatória</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>URL da imagem</mat-label>
                <input matInput formControlName="imageUrl" placeholder="https://..." />
              </mat-form-field>
            </div>
          </div>

          <!-- Classificação -->
          <div class="form-section">
            <h2 class="form-section__title">Classificação</h2>
            <mat-divider />
            <div class="form-section__body">
              <mat-form-field appearance="outline" style="width: 280px">
                <mat-label>Categoria</mat-label>
                <mat-select formControlName="category">
                  @for (cat of categories; track cat.value) {
                    <mat-option [value]="cat.value">{{ cat.label }}</mat-option>
                  }
                </mat-select>
                @if (vm.form.get('category')?.invalid && vm.form.get('category')?.touched) {
                  <mat-error>Categoria é obrigatória</mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <!-- Precificação -->
          <div class="form-section">
            <h2 class="form-section__title">Precificação</h2>
            <mat-divider />
            <div class="form-section__body">
              <mat-form-field appearance="outline" style="width: 280px">
                <mat-label>Custo do produto (R$)</mat-label>
                <span matPrefix class="prefix">R$</span>
                <input matInput type="number" min="0" step="0.01" formControlName="costPrice" />
                @if (vm.form.get('costPrice')?.hasError('required') && vm.form.get('costPrice')?.touched) {
                  <mat-error>Valor obrigatório</mat-error>
                } @else if (vm.form.get('costPrice')?.hasError('min') && vm.form.get('costPrice')?.touched) {
                  <mat-error>Deve ser maior que zero</mat-error>
                }
                <mat-hint>Valor de custo utilizado para composição dos planos</mat-hint>
              </mat-form-field>
            </div>
          </div>

          @if (vm.error()) {
            <p class="form-error">{{ vm.error() }}</p>
          }

          <div class="form-actions">
            <a mat-stroked-button routerLink="/products">Cancelar</a>
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

    .form-section { background: #fff; border-radius: 12px; padding: 32px 40px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); display: flex; flex-direction: column; }
    .form-section__title { font-size: 15px; font-weight: 600; margin: 0 0 20px; color: #444; }
    .form-section__body { display: flex; flex-direction: column; gap: 8px; padding-top: 28px; }

    .field-row { display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap; margin-bottom: 16px; }
    .field-row__field { flex: 1; min-width: 220px; }
    .active-toggle { align-self: center; margin-top: 4px; }

    mat-form-field { width: 100%; }
    .prefix { margin: 0 0.03rem 0 1rem; }

    .form-actions { display: flex; gap: 12px; justify-content: flex-end; }
    .form-error { color: #c62828; font-size: 13px; margin: 0; }
    .loading { display: flex; align-items: center; justify-content: center; padding: 64px; }
  `]
})
export class ProductFormComponent implements OnInit {
  id = input<string>();
  vm = inject(ProductFormViewModel);
  categories = PRODUCT_CATEGORIES;

  ngOnInit(): void {
    const id = this.id();
    if (id) this.vm.load(id);
  }
}
