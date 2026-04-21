import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { PlanListViewModel } from './plan-list.viewmodel';

@Component({
  selector: 'app-plan-list',
  standalone: true,
  providers: [PlanListViewModel],
  imports: [
    RouterLink,
    FormsModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSliderModule,
  ],
  templateUrl: './plan-list.component.html',
  styleUrl: './plan-list.component.scss',
})
export class PlanListComponent implements OnInit {
  vm = inject(PlanListViewModel);
  searchTermValue = '';
  activeFilterValue: 'all' | 'active' | 'inactive' = 'all';

  zoomValue = 4;

  get viewMode(): 'list' | 'detailed' | 'cards' {
    if (this.zoomValue === 1) return 'detailed';
    if (this.zoomValue === 2) return 'list';
    return 'cards';
  }

  get cardWidth(): number {
    switch (this.zoomValue) {
      case 3:
        return 200;
      case 4:
        return 300;
      case 5:
        return 400;
      default:
        return 300;
    }
  }

  formatSliderLabel(value: number): string {
    switch (value) {
      case 1:
        return 'Detalhada';
      case 2:
        return 'Lista';
      case 3:
        return 'Pequeno';
      case 4:
        return 'Médio';
      case 5:
        return 'Grande';
      default:
        return '';
    }
  }

  ngOnInit(): void {
    this.vm.load();
  }
}
