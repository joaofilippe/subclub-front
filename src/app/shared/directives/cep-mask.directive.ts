import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[cepMask]', standalone: true })
export class CepMaskDirective {
  private control = inject(NgControl);

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    const masked = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
    this.control.control?.setValue(masked, { emitEvent: false });
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string): void {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 8) {
      this.control.control?.setValue(`${digits.slice(0, 5)}-${digits.slice(5)}`, { emitEvent: false });
    }
  }
}
