import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClientListViewModel } from './client-list.viewmodel';

@Component({
  selector: 'app-client-list',
  standalone: true,
  providers: [ClientListViewModel],
  imports: [
    RouterLink, FormsModule,
    MatTableModule, MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule, MatTooltipModule
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {
  vm = inject(ClientListViewModel);
  columns = ['name', 'email', 'phone', 'status', 'actions'];
  searchTermValue = '';
  activeFilterValue: 'all' | 'active' | 'inactive' = 'all';

  ngOnInit(): void {
    this.vm.load();
  }
}
