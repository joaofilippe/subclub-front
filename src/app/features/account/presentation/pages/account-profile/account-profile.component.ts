import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountProfileViewModel } from './account-profile.viewmodel';

@Component({
  selector: 'app-account-profile',
  standalone: true,
  providers: [AccountProfileViewModel],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatProgressSpinnerModule
  ],
  templateUrl: './account-profile.component.html',
  styleUrl: './account-profile.component.scss'
})
export class AccountProfileComponent {
  vm = inject(AccountProfileViewModel);
}
