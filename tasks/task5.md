### TASK-005 — Configurar Playwright e quality gates

**Metadata**

- ID: TASK-005
- Feature: Quality gates
- Phase: Phase 0 — Repository Setup
- Type: Setup
- Priority: P0
- Status: TODO
- Dependencies: TASK-001, TASK-004
- Branch: `task/TASK-005-playwright-gates` a partir de `chore/project-setup`
- PRD References: RNF-003, RNF-004, RNF-013, RNF-017
- TECH References: TECH-001, TECH-016

### 1. Objective

Preparar E2E, viewports e comandos de qualidade para integração contínua.

### 2. Context

O aceite exige fluxo E2E, mobile 390 px e gates claros antes de PR.

### 3. Scope

Configuração do Playwright, scripts e um smoke test. Não implementar o fluxo completo do produto.

### 4. Implementation Steps

- [ ] Adicionar Playwright e configuração de browser/baseURL.
- [ ] Definir viewport 390 px e desktop de referência.
- [ ] Criar `test:e2e` e modo CI.
- [ ] Criar smoke test mínimo da aplicação.
- [ ] Documentar dependência de browsers.

### 5. Expected Files

`playwright.config.ts`, `tests/e2e/`, `package.json`, `README.md`.

### 6. Acceptance Criteria

- Smoke E2E executa em ambiente documentado.
- Gates não afirmam sucesso quando uma etapa falha.

### 7. Testing Requirements

Rodar smoke E2E, unit tests, lint, typecheck e build.

### 8. Definition of Done

- [ ] Playwright configurado.
- [ ] Smoke aprovado.
- [ ] Gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `chore/project-setup`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
