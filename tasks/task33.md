### TASK-033 — Implementar filtros, ordenação e paginação

**Metadata**

- ID: TASK-033
- Feature: Exchange history
- Phase: Phase 6 — Product Features
- Type: Feature
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-012, TASK-027, TASK-032
- Branch: `dev`
- PRD References: RF-027–RF-034, RN-021–RN-024
- TECH References: TECH-010, TECH-013
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Conectar controles de filtro, sort, contador e paginação à tabela sem alterar a série original.

### 2. Context

O pipeline do PRD exige filtros locais, inclusivos, AND e paginação por último.

### 3. Scope

HistoryFilters, sort buttons, pagination e mensagens de validação. Não gerar CSV.

### 4. Implementation Steps

- [ ] Compor quatro campos de filtro.
- [ ] Exibir validações de data e cotação.
- [ ] Conectar ordenação determinística.
- [ ] Conectar contador e paginação.
- [ ] Resetar página ao mudar filtros/contexto.
- [ ] Implementar limpar filtros.

### 5. Expected Files

`src/features/history/components/HistoryFilters.tsx`, `Pagination.tsx`, `SortButton.tsx`, testes.

### 6. Acceptance Criteria

- Resultado é interseção de filtros.
- Contador é total filtrado, não página.
- Filtro inválido impede resultado potencialmente incorreto.

### 7. Testing Requirements

Combinações, extremos inclusivos, zero linhas, sort asc/desc, page size e reset.

### 8. Definition of Done

- [ ] Controles concluídos.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `feat(app): complete exchange screens and workflow`.
- Pull Request: não aberto.
- Branch de destino: `dev`.
- Status do merge: pendente.

### 10. Completion Notes

Implementada no histórico e no dashboard do Conversor; aguardando os gates finais e o commit consolidado.
