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
import { ModuleListViewModel } from './module-list.viewmodel';

@Component({
  selector: 'app-module-list',
  standalone: true,
  providers: [ModuleListViewModel],
  imports: [RouterLink, FormsModule, MatTableModule, MatButtonModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './module-list.component.html',
  styleUrl: './module-list.component.scss'
})
export class ModuleListComponent implements OnInit {
  vm = inject(ModuleListViewModel);
  columns = ['name', 'status', 'actions'];
  searchValue = '';

  ngOnInit(): void { this.vm.load(); }
}
