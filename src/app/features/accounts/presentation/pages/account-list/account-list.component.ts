import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountListViewModel } from './account-list.viewmodel';

@Component({
  selector: 'app-account-list',
  standalone: true,
  providers: [AccountListViewModel],
  imports: [RouterLink, FormsModule, MatTableModule, MatButtonModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent implements OnInit {
  vm = inject(AccountListViewModel);
  columns = ['name', 'email', 'slug', 'subscriptionStatus', 'actions'];
  searchValue = '';

  ngOnInit(): void { this.vm.load(); }
}
