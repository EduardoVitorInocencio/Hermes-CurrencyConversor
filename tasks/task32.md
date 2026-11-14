### TASK-032 — Implementar tabela histórica e estados vazios

**Metadata**

- ID: TASK-032
- Feature: Exchange history
- Phase: Phase 6 — Product Features
- Type: Feature
- Priority: P0
- Status: TODO
- Dependencies: TASK-027, TASK-031
- Branch: `task/TASK-032-history-table` a partir de `feat/exchange-history`
- PRD References: RF-026, RF-032, RF-033, RN-020, RN-021
- TECH References: TECH-010, TECH-013

### 1. Objective

Renderizar a série canônica em tabela acessível, com contador e vazio significativo.

### 2. Context

A tabela é o caminho de precisão e alternativa ao tooltip visual.

### 3. Scope

Colunas data/base/quote/rate, contador, empty state e scroll próprio. Ordenação/filtros conectados ficam nas tarefas seguintes.

### 4. Implementation Steps

- [ ] Definir tabela semântica e captions/labels.
- [ ] Formatar datas e taxas sem perder valor.
- [ ] Exibir contador do conjunto recebido.
- [ ] Implementar loading/error/empty.
- [ ] Preservar dados completos para exportação.

### 5. Expected Files

`src/features/history/components/HistoryTable.tsx`, `RecordCount.tsx`, testes.

### 6. Acceptance Criteria

- Cada linha corresponde a registro real.
- Empty state explica ausência sem inventar linhas.
- Tabela não causa scroll horizontal na página.

### 7. Testing Requirements

Renderização, cabeçalhos, count, vazio, erro, teclado e viewport mobile.

### 8. Definition of Done

- [ ] Tabela concluída.
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
