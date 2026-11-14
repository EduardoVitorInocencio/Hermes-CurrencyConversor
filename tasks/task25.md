### TASK-025 — Implementar validação e cálculo de conversão

**Metadata**

- ID: TASK-025
- Feature: Conversion domain
- Phase: Phase 5 — Hooks & Business Logic
- Type: Hook
- Priority: P0
- Status: TODO
- Dependencies: TASK-021, TASK-024
- Branch: `task/TASK-025-conversion-domain` a partir de `feat/converter`
- PRD References: RF-008–RF-014, RN-002–RN-008, RN-010, RN-019, RNF-019
- TECH References: TECH-007, TECH-009

### 1. Objective

Implementar funções puras e validação do valor de entrada sem arredondamento prematuro.

### 2. Context

O resultado deve usar taxa original, aceitar zero e rejeitar valores não finitos/negativos.

### 3. Scope

`convertAmount`, limite aprovado, resultado seguro e variação percentual. Não compor UI.

### 4. Implementation Steps

- [ ] Confirmar limite RN-008.
- [ ] Implementar conversão e validações.
- [ ] Implementar variação com `null` para dados insuficientes.
- [ ] Definir precisão somente de apresentação.
- [ ] Criar testes de borda.

### 5. Expected Files

`src/features/exchange/utils/convertAmount.ts`, `src/features/history/utils/calculatePercentageChange.ts`, testes.

### 6. Acceptance Criteria

- Zero converte em zero.
- Negativo, NaN, infinito e overflow falham.
- Taxa original é preservada até a apresentação.

### 7. Testing Requirements

Zero, válida, negativa, NaN, infinito, overflow, subida/queda e primeiro valor zero.

### 8. Definition of Done

- [ ] Domínio concluído.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `feat/converter`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada; depende da decisão PD-001.
