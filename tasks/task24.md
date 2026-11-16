### TASK-024 — Implementar estado compartilhado de par e período

**Metadata**

- ID: TASK-024
- Feature: Domain state
- Phase: Phase 5 — Hooks & Business Logic
- Type: Hook
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-020, TASK-021, TASK-022
- Branch: `dev`
- PRD References: RF-002, RF-004, RF-018, RF-020, RN-024
- TECH References: TECH-008, TECH-011
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Definir fonte única de verdade para par, período e valor de entrada.

### 2. Context

Conversor, gráfico e tabela precisam reagir ao mesmo contexto sem estados duplicados.

### 3. Scope

Tipos e reducer/hook de estado de view, incluindo reset de filtros/página por mudança de contexto. Não buscar API.

### 4. Implementation Steps

- [x] Definir `CurrencyPair`, `ExchangeViewState` e ações.
- [x] Definir defaults propostos como configuração explícita.
- [x] Implementar swap e mudança de período.
- [x] Resetar derivados incompatíveis.
- [x] Testar transições rápidas.

### 5. Expected Files

`src/shared/types/`, `src/features/exchange/hooks/`, estado da aplicação e testes.

### 6. Acceptance Criteria

- Par/período têm uma única fonte.
- Mudança de contexto não conserva filtros/página incompatíveis.

### 7. Testing Requirements

Testes de reducer/hook, swap, período, defaults e reset.

### 8. Definition of Done

- [x] Estado concluído.
- [x] Critérios atendidos.
- [x] Testes/gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `feat(app): complete remaining exchange workflow`.
- Pull Request: não aberto.
- Branch de destino: não aplicável; fluxo solicitado sem PR.
- Status do merge: não aplicável.

### 10. Completion Notes

Estado único de par, valor, período, filtros e página implementado com default explícito EUR/USD e 30D; swap e mudanças de contexto resetam derivados incompatíveis.
