import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrlCurrencyDirective } from '../../../../../shared/directives';
import { AccountPlanFormViewModel } from './account-plan-form.viewmodel';

@Component({
  selector: 'app-account-plan-form',
  standalone: true,
  providers: [AccountPlanFormViewModel],
  imports: [RouterLink, ReactiveFormsModule, CurrencyPipe, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSlideToggleModule, MatProgressSpinnerModule, MatTooltipModule,
    BrlCurrencyDirective],
  templateUrl: './account-plan-form.component.html',
  styleUrl: './account-plan-form.component.scss'
})
export class AccountPlanFormComponent implements OnInit {
  id = input<string>();
  vm = inject(AccountPlanFormViewModel);

  ngOnInit(): void { const id = this.id(); if (id) this.vm.load(id); }
}
