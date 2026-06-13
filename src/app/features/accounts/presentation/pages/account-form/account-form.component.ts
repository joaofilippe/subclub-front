import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountFormViewModel } from './account-form.viewmodel';

@Component({
  selector: 'app-account-form',
  standalone: true,
  providers: [AccountFormViewModel],
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatSelectModule, MatSlideToggleModule, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent implements OnInit {
  id = input<string>();
  vm = inject(AccountFormViewModel);

  ngOnInit(): void {
    this.vm.loadPlans();
    const id = this.id();
    if (id) this.vm.load(id);
  }
}
