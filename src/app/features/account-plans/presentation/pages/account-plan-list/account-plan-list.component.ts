import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountPlanListViewModel } from './account-plan-list.viewmodel';

@Component({
  selector: 'app-account-plan-list',
  standalone: true,
  providers: [AccountPlanListViewModel],
  imports: [RouterLink, FormsModule, CurrencyPipe, MatTableModule, MatButtonModule,
    MatIconModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './account-plan-list.component.html',
  styleUrl: './account-plan-list.component.scss'
})
export class AccountPlanListComponent implements OnInit {
  vm = inject(AccountPlanListViewModel);
  columns = ['name', 'price', 'limits', 'status', 'actions'];
  searchValue = '';

  ngOnInit(): void { this.vm.load(); }
}
