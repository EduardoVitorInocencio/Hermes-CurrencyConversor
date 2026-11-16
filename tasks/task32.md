### TASK-032 — Implementar tabela histórica e estados vazios

**Metadata**

- ID: TASK-032
- Feature: Exchange history
- Phase: Phase 6 — Product Features
- Type: Feature
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-027, TASK-031
- Branch: `dev`
- PRD References: RF-026, RF-032, RF-033, RN-020, RN-021
- TECH References: TECH-010, TECH-013
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Renderizar a série canônica em tabela acessível, com contador e vazio significativo.

### 2. Context

A tabela é o caminho de precisão e alternativa ao tooltip visual.

### 3. Scope

Colunas data/base/quote/rate, contador, empty state e scroll próprio. Ordenação/filtros conectados ficam nas tarefas seguintes.

### 4. Implementation Steps

- [x] Definir tabela semântica e captions/labels.
- [x] Formatar datas e taxas sem perder valor.
- [x] Exibir contador do conjunto recebido.
- [x] Implementar loading/error/empty.
- [x] Preservar dados completos para exportação.

### 5. Expected Files

`src/features/history/components/HistoryTable.tsx`, `RecordCount.tsx`, testes.

### 6. Acceptance Criteria

- Cada linha corresponde a registro real.
- Empty state explica ausência sem inventar linhas.
- Tabela não causa scroll horizontal na página.

### 7. Testing Requirements

Renderização, cabeçalhos, count, vazio, erro, teclado e viewport mobile.

### 8. Definition of Done

- [x] Tabela concluída.
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

HistoryTable, RecordCount e empty states implementados com tabela semântica, overflow próprio e contagem do conjunto filtrado.
