# Frontend Architecture

## Princípio

Clean Architecture para organização de pastas + MVVM dentro da camada de apresentação. Dependências sempre apontam para dentro:

```
domain → application → presentation
```

## Estrutura por feature (complexa)

```
features/<feature>/
├── domain/
│   ├── models/          # interfaces/enums puros, zero dependência Angular
│   └── rules/           # funções puras de negócio
├── application/
│   ├── <feature>.store.ts    # Use Case — orquestra service, expõe estado via Signals
│   └── <feature>.service.ts  # chama ApiService, retorna Observable/Promise
└── presentation/
    ├── pages/
    │   └── <page>/
    │       ├── <page>.component.ts    # View — HTML + binding
    │       └── <page>.viewmodel.ts    # ViewModel — injeta Store, expõe signals/métodos
    └── components/                    # componentes reutilizáveis da feature
```

Features simples (ex: auth) podem usar estrutura flat sem subpastas.

## Fluxo de dados

```
View → ViewModel → Store → Service → ApiService → Backend
```

## Core (`src/app/core/`)

| Pasta | Conteúdo |
|---|---|
| `auth/` | `auth.service`, `auth.store` |
| `guards/` | `auth.guard`, `role.guard` |
| `interceptors/` | `auth.interceptor`, `error.interceptor` |
| `http/` | `api.service` — wrapper base do HttpClient |

## Features existentes

`auth`, `clients`, `plans`, `products`, `subscriptions`, `users`, `accounts`, `account-plans`
