import { Component, inject, OnInit, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { CepMaskDirective } from '../../../../../shared/directives';
import { ClientEditViewModel } from './client-edit.viewmodel';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  providers: [ClientEditViewModel],
  imports: [
    ReactiveFormsModule, RouterLink,
    MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatSlideToggleModule,
    MatProgressSpinnerModule, MatDividerModule, CepMaskDirective,
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent implements OnInit {
  id = input.required<string>();
  vm = inject(ClientEditViewModel);

  ngOnInit(): void {
    this.vm.load(this.id());
  }
}
