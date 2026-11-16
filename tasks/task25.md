### TASK-025 — Implementar validação e cálculo de conversão

**Metadata**

- ID: TASK-025
- Feature: Conversion domain
- Phase: Phase 5 — Hooks & Business Logic
- Type: Hook
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-021, TASK-024
- Branch: `dev`
- PRD References: RF-008–RF-014, RN-002–RN-008, RN-010, RN-019, RNF-019
- TECH References: TECH-007, TECH-009
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Implementar funções puras e validação do valor de entrada sem arredondamento prematuro.

### 2. Context

O resultado deve usar taxa original, aceitar zero e rejeitar valores não finitos/negativos.

### 3. Scope

`convertAmount`, limite aprovado, resultado seguro e variação percentual. Não compor UI.

### 4. Implementation Steps

- [x] Confirmar limite RN-008.
- [x] Implementar conversão e validações.
- [x] Implementar variação com `null` para dados insuficientes.
- [x] Definir precisão somente de apresentação.
- [x] Criar testes de borda.

### 5. Expected Files

`src/features/exchange/utils/convertAmount.ts`, `src/features/history/utils/calculatePercentageChange.ts`, testes.

### 6. Acceptance Criteria

- Zero converte em zero.
- Negativo, NaN, infinito e overflow falham.
- Taxa original é preservada até a apresentação.

### 7. Testing Requirements

Zero, válida, negativa, NaN, infinito, overflow, subida/queda e primeiro valor zero.

### 8. Definition of Done

- [x] Domínio concluído.
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

`convertAmount` aceita zero, rejeita valores inválidos/negativos/overflow e preserva a taxa até a apresentação; `calculatePercentageChange` retorna `null` quando não há base positiva.
