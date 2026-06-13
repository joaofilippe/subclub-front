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
import { UserListViewModel } from './user-list.viewmodel';

@Component({
  selector: 'app-user-list',
  standalone: true,
  providers: [UserListViewModel],
  imports: [
    RouterLink, FormsModule,
    MatTableModule, MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatProgressSpinnerModule, MatTooltipModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  vm = inject(UserListViewModel);
  columns = ['name', 'email', 'role', 'type', 'status', 'actions'];
  searchValue = '';

  ngOnInit(): void {
    this.vm.load();
  }
}
