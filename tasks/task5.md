### TASK-005 — Configurar Playwright e quality gates

**Metadata**

- ID: TASK-005
- Feature: Quality gates
- Phase: Phase 0 — Repository Setup
- Type: Setup
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-001, TASK-004
- Branch: `dev`
- PRD References: RNF-003, RNF-004, RNF-013, RNF-017
- TECH References: TECH-001, TECH-016
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Preparar E2E, viewports e comandos de qualidade para integração contínua.

### 2. Context

O aceite exige fluxo E2E, mobile 390 px e gates claros antes de PR.

### 3. Scope

Configuração do Playwright, scripts e um smoke test. Não implementar o fluxo completo do produto.

### 4. Implementation Steps

- [x] Adicionar Playwright e configuração de browser/baseURL.
- [x] Definir viewport 390 px e desktop de referência.
- [x] Criar `test:e2e` e modo CI.
- [x] Criar smoke test mínimo da aplicação.
- [x] Documentar dependência de browsers.

### 5. Expected Files

`playwright.config.ts`, `tests/e2e/`, `package.json`, `README.md`.

### 6. Acceptance Criteria

- Smoke E2E executa em ambiente documentado.
- Gates não afirmam sucesso quando uma etapa falha.

### 7. Testing Requirements

Rodar smoke E2E, unit tests, lint, typecheck e build.

### 8. Definition of Done

- [x] Playwright configurado.
- [x] Smoke aprovado.
- [x] Gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: commit local atual — `test(e2e): configure Playwright quality gates`.
- Pull Request: não aberto, conforme solicitado.
- Branch de destino: `dev`.
- Status do merge: não aplicável; integração via PR não será realizada.

### 10. Completion Notes

Playwright Test configurado com Chromium, servidor Vite local, baseURL `http://127.0.0.1:4173`, viewport desktop `1440×900` e mobile `390×844`. Os scripts `test:e2e` e `test:e2e:ci` foram adicionados, e o smoke test verifica a renderização do shell atual nos dois projetos.

Validação em 14/11/2026: `npm run test:e2e` passou com 2 testes; `npm run test:e2e:ci` passou com 2 testes em 1 worker; `npm run test` passou com 2 testes; `npm run lint`, `npm run typecheck` e `npm run build` passaram. O Chromium foi instalado com `npx playwright install chromium`. A instalação reportou 7 vulnerabilidades moderadas; nenhuma correção forçada foi aplicada nesta tarefa.
