### TASK-024 — Implementar estado compartilhado de par e período

**Metadata**

- ID: TASK-024
- Feature: Domain state
- Phase: Phase 5 — Hooks & Business Logic
- Type: Hook
- Priority: P0
- Status: TODO
- Dependencies: TASK-020, TASK-021, TASK-022
- Branch: `task/TASK-024-domain-view-state` a partir de `feat/api-data-layer`
- PRD References: RF-002, RF-004, RF-018, RF-020, RN-024
- TECH References: TECH-008, TECH-011

### 1. Objective

Definir fonte única de verdade para par, período e valor de entrada.

### 2. Context

Conversor, gráfico e tabela precisam reagir ao mesmo contexto sem estados duplicados.

### 3. Scope

Tipos e reducer/hook de estado de view, incluindo reset de filtros/página por mudança de contexto. Não buscar API.

### 4. Implementation Steps

- [ ] Definir `CurrencyPair`, `ExchangeViewState` e ações.
- [ ] Definir defaults propostos como configuração explícita.
- [ ] Implementar swap e mudança de período.
- [ ] Resetar derivados incompatíveis.
- [ ] Testar transições rápidas.

### 5. Expected Files

`src/shared/types/`, `src/features/exchange/hooks/`, estado da aplicação e testes.

### 6. Acceptance Criteria

- Par/período têm uma única fonte.
- Mudança de contexto não conserva filtros/página incompatíveis.

### 7. Testing Requirements

Testes de reducer/hook, swap, período, defaults e reset.

### 8. Definition of Done

- [ ] Estado concluído.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `feat/api-data-layer`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada; confirmar PD-002 antes de fixar default.
