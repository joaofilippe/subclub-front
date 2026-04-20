import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ClientService } from '../../../application/client.service';

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

@Injectable()
export class ClientEditViewModel {
  private fb = inject(FormBuilder);
  private service = inject(ClientService);
  private http = inject(HttpClient);
  private router = inject(Router);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly cepLoading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.group({
    name:     ['', Validators.required],
    email:    ['', [Validators.required, Validators.email]],
    phone:    ['', Validators.required],
    document: ['', Validators.required],
    active:   [true],
    address: this.fb.group({
      zipCode:      ['', Validators.required],
      street:       ['', Validators.required],
      number:       ['', Validators.required],
      complement:   [''],
      neighborhood: ['', Validators.required],
      city:         ['', Validators.required],
      state:        ['', [Validators.required, Validators.maxLength(2)]],
    }),
  });

  load(id: string): void {
    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: client => {
        this.form.patchValue({
          name: client.name,
          email: client.email,
          phone: client.phone,
          document: client.document,
          active: client.active,
          address: client.address ?? {},
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  lookupCep(): void {
    const raw = this.form.get('address.zipCode')?.value ?? '';
    const cep = raw.replace(/\D/g, '');
    if (cep.length !== 8) return;

    this.cepLoading.set(true);
    this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: res => {
        this.cepLoading.set(false);
        if (res.erro) return;
        const addr = this.form.get('address');
        addr?.get('street')?.setValue(res.logradouro);
        addr?.get('neighborhood')?.setValue(res.bairro);
        addr?.get('city')?.setValue(res.localidade);
        addr?.get('state')?.setValue(res.uf);
        this.form.get('address.number')?.markAsUntouched();
      },
      error: () => this.cepLoading.set(false),
    });
  }

  save(id: string): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    this.error.set(null);
    this.service.update(id, this.form.value as any).subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/clients', id]);
      },
      error: err => {
        this.saving.set(false);
        this.error.set(err?.error?.message ?? 'Erro ao salvar cliente');
      },
    });
  }
}
