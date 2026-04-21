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
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
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
