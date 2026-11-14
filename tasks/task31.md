### TASK-031 — Compor histórico, períodos e gráfico

**Metadata**

- ID: TASK-031
- Feature: Exchange history
- Phase: Phase 6 — Product Features
- Type: Feature
- Priority: P0
- Status: TODO
- Dependencies: TASK-014, TASK-022, TASK-026, TASK-028
- Branch: `task/TASK-031-history-chart` a partir de `feat/exchange-history`
- PRD References: RF-017–RF-022, RN-012–RN-020, RNF-020
- TECH References: TECH-008, TECH-013

### 1. Objective

Exibir a evolução histórica real nos oito períodos com resumo e gráfico acessível.

### 2. Context

A série do gráfico deve ser a mesma fonte canônica da tabela e respeitar lacunas.

### 3. Scope

PeriodSelector, resumo, Recharts, tooltip e estados loading/error/empty. Não inclui filtros tabulares.

### 4. Implementation Steps

- [ ] Compor seletor dos oito períodos.
- [ ] Conectar cálculo de intervalo e hook.
- [ ] Renderizar série real e unidade.
- [ ] Calcular/exibir variação quando possível.
- [ ] Tratar séries longas sem inventar pontos.
- [ ] Cobrir CA-03 e CA-07.

### 5. Expected Files

`src/features/history/components/PeriodSelector.tsx`, `ExchangeRateChart.tsx`, `RateSummary.tsx`, testes.

### 6. Acceptance Criteria

- Oito períodos alteram a consulta.
- Gráfico nunca usa números do protótipo como produção.
- Tooltip e estado vazio são compreensíveis.

### 7. Testing Requirements

MSW para cada período, vazio, erro, atraso, acessibilidade do gráfico e tabela/tooltip alternativa.

### 8. Definition of Done

- [ ] Feature concluída.
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
