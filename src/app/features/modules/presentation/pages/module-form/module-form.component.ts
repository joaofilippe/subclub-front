import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModuleFormViewModel } from './module-form.viewmodel';

@Component({
  selector: 'app-module-form',
  standalone: true,
  providers: [ModuleFormViewModel],
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSlideToggleModule, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './module-form.component.html',
  styleUrl: './module-form.component.scss'
})
export class ModuleFormComponent implements OnInit {
  id = input<string>();
  vm = inject(ModuleFormViewModel);

  ngOnInit(): void { const id = this.id(); if (id) this.vm.load(id); }
}
