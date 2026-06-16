# Frontend Conventions

## Angular & Signals

- Angular 19 com **standalone components** — sem NgModules nas features.
- Estado gerenciado via **NgRx SignalStore** (`@ngrx/signals`). Nunca usar Subject/BehaviorSubject para estado derivável de store.
- Signals para estado local de componente; `computed()` para derivações.
- Evitar `ngOnChanges` quando `input()` signal resolve.

## ViewModel

- Cada page component tem seu próprio `<page>.viewmodel.ts` fornecido no próprio componente (`providers: [PageViewModel]`).
- O ViewModel injeta o Store e expõe apenas o que a View precisa — sem lógica de negócio na View.
- O componente não acessa o Store diretamente; passa pelo ViewModel.

## ApiService

- Todas as chamadas HTTP passam pelo `ApiService` em `core/http/`.
- Services de feature chamam `ApiService`, nunca `HttpClient` diretamente.
- Usar `camelCase` nos modelos do front mesmo que o backend retorne `snake_case` — mapear no service.

## Tipagem

- Sem `any`. Usar `unknown` quando o tipo é realmente desconhecido e fazer type guard.
- Interfaces de domínio ficam em `domain/models/` — zero importações de `@angular/*` nesses arquivos.

## UI — Angular Material

- Usar componentes do **Angular Material** (`@angular/material`). Não misturar com outras bibliotecas de UI.
- Temas e tokens gerenciados pelo `theme.service.ts` para dark/light mode.

## Testes

- Testes unitários com Karma/Jasmine (`ng test`).
- Testar stores e services isoladamente com mocks do `ApiService`.
- Nunca fazer chamadas HTTP reais em testes unitários.
