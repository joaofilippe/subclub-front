import { Directive, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { filter } from 'rxjs';

@Directive({ selector: '[brlCurrency]', standalone: true })
export class BrlCurrencyDirective implements OnInit {
  private control = inject(NgControl);
  private el = inject(ElementRef<HTMLInputElement>);
  private userTyping = false;

  ngOnInit(): void {
    setTimeout(() => this.formatDisplay(), 0);

    this.control.valueChanges
      ?.pipe(filter(() => !this.userTyping))
      .subscribe(() => this.formatDisplay());
  }

  @HostListener('focus')
  onFocus(): void {
    const num = this.control.control?.value;
    if (num !== null && num !== undefined && num !== '') {
      this.el.nativeElement.value = String(num).replace('.', ',');
    }
  }

  @HostListener('blur')
  onBlur(): void {
    this.formatDisplay();
  }

  @HostListener('input', ['$event.target.value'])
  onInput(raw: string): void {
    this.userTyping = true;
    const digits = raw.replace(/[^0-9,]/g, '');
    this.el.nativeElement.value = digits;
    const num = parseFloat(digits.replace(',', '.')) || 0;
    this.control.control?.setValue(num, { emitEvent: false });
    this.userTyping = false;
  }

  private formatDisplay(): void {
    const val = this.control.control?.value;
    if (val !== null && val !== undefined && val !== '') {
      this.el.nativeElement.value = Number(val).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }
}
