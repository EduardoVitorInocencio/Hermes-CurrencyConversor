### TASK-027 — Implementar pipeline de filtros, sort e paginação

**Metadata**

- ID: TASK-027
- Feature: Exchange history
- Phase: Phase 5 — Hooks & Business Logic
- Type: Hook
- Priority: P0
- Status: TODO
- Dependencies: TASK-022, TASK-024
- Branch: `task/TASK-027-history-pipeline` a partir de `feat/exchange-history`
- PRD References: RF-026–RF-034, RN-017, RN-021–RN-024, RNF-007
- TECH References: TECH-010, TECH-011

### 1. Objective

Implementar pipeline determinístico `dados → filtros → ordenação → paginação`.

### 2. Context

O contador e o CSV precisam usar o conjunto filtrado completo, enquanto a tabela usa a página.

### 3. Scope

Funções puras de filtro, sort, contador, paginação e reset. Não criar componentes.

### 4. Implementation Steps

- [ ] Implementar limites inclusivos e AND.
- [ ] Validar datas e mínimo/máximo.
- [ ] Implementar sort de data/taxa com desempate.
- [ ] Implementar paginação posterior ao sort.
- [ ] Garantir não mutação do array original.

### 5. Expected Files

`src/features/history/utils/filterHistory.ts`, `sortHistory.ts`, `paginateHistory.ts`, tipos e testes.

### 6. Acceptance Criteria

- Resultado atende todos os filtros.
- Contagem ignora paginação.
- Alteração de filtro/par/período reinicia página conforme RN-024.

### 7. Testing Requirements

Datas, limites, AND, inválidos, empate, direções, lista vazia e paginação.

### 8. Definition of Done

- [ ] Pipeline concluído.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `feat/exchange-history`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
