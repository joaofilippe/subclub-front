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
  templateUrl: './plan-form.component.html',
  styleUrl: './plan-form.component.scss',
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
