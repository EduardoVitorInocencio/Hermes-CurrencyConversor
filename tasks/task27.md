### TASK-027 — Implementar pipeline de filtros, sort e paginação

**Metadata**

- ID: TASK-027
- Feature: Exchange history
- Phase: Phase 5 — Hooks & Business Logic
- Type: Hook
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-022, TASK-024
- Branch: `dev`
- PRD References: RF-026–RF-034, RN-017, RN-021–RN-024, RNF-007
- TECH References: TECH-010, TECH-011
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Implementar pipeline determinístico `dados → filtros → ordenação → paginação`.

### 2. Context

O contador e o CSV precisam usar o conjunto filtrado completo, enquanto a tabela usa a página.

### 3. Scope

Funções puras de filtro, sort, contador, paginação e reset. Não criar componentes.

### 4. Implementation Steps

- [x] Implementar limites inclusivos e AND.
- [x] Validar datas e mínimo/máximo.
- [x] Implementar sort de data/taxa com desempate.
- [x] Implementar paginação posterior ao sort.
- [x] Garantir não mutação do array original.

### 5. Expected Files

`src/features/history/utils/filterHistory.ts`, `sortHistory.ts`, `paginateHistory.ts`, tipos e testes.

### 6. Acceptance Criteria

- Resultado atende todos os filtros.
- Contagem ignora paginação.
- Alteração de filtro/par/período reinicia página conforme RN-024.

### 7. Testing Requirements

Datas, limites, AND, inválidos, empate, direções, lista vazia e paginação.

### 8. Definition of Done

- [x] Pipeline concluído.
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

Pipeline local implementado como dados → filtros inclusivos/AND → ordenação determinística → paginação, sem mutar a série canônica.
