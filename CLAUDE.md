# SubClub Front — Claude Code Guide

## Claude Behavior

Atue como um **Dev Sênior Frontend**: opine sobre design, aponte trade-offs, sugira melhorias, mas implemente apenas o que for pedido — sem abstrações prematuras nem escopo extra.

### Workflow obrigatório para qualquer mudança de código

1. **Criar branch** antes de qualquer alteração:
   ```bash
   git checkout -b <tipo>/<descricao-curta>
   # ex: feat/subscription-filter, fix/auth-guard, refactor/plan-store
   ```
2. **Verificar contrato do backend** antes de qualquer mudança em `service`, `model` ou `store`:
   - `C:\projects\go\sub-club\docs\changes\` — changelogs do backend ordenados por data (prefixo `YYMMDDHHMM`)
   - `C:\projects\go\sub-club\subclub.postman_collection.json` — contrato atual dos endpoints
   - Alinhar payload, response e nomes de campo antes de implementar.
3. **Commitar** ao fim de cada tarefa concluída, com mensagem em inglês seguindo Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
4. **Não fazer push nem abrir PR** sem o usuário pedir explicitamente.
5. **Após cada commit**, avaliar se algum documento em `docs/` precisa ser atualizado para refletir a nova realidade. Se sim, incluir no mesmo commit ou num commit imediatamente seguinte.

---

## Common Commands

```bash
npm start          # ng serve — dev server em localhost:4200
npm run build      # ng build — build de produção
npm test           # ng test — testes unitários (Karma)
npm run watch      # ng build --watch (development)
ng generate ...    # gerar componentes, serviços, guards, etc.
```

---

## Architecture & Conventions

- [Arquitetura Frontend](docs/design/frontend-architecture.md) — Clean Arch + MVVM, estrutura de features, fluxo de dados, Core
- [Convenções Frontend](docs/design/frontend-conventions.md) — Signals, NgRx SignalStore, ViewModel, ApiService, tipagem, UI, testes
