### TASK-012 — Implementar Input, Select e CurrencyAmountField

**Metadata**

- ID: TASK-012
- Feature: UI base / currencies
- Phase: Phase 2 — Base UI Components
- Type: Component
- Priority: P0
- Status: TODO
- Dependencies: TASK-007, TASK-009
- Branch: `task/TASK-012-form-controls` a partir de `feat/design-system`
- PRD References: RF-002, RF-003, RF-007, RF-008, RF-013, RNF-004
- TECH References: TECH-003, TECH-006, TECH-007

### 1. Objective

Fornecer controles tipados, rotulados e reutilizáveis para moeda, valor e filtros.

### 2. Context

Conversor e histórico compartilham requisitos de foco, erro, ajuda e teclado.

### 3. Scope

Input, Select pesquisável e campo monetário; não inclui catálogo/API.

### 4. Implementation Steps

- [ ] Definir contratos de props e ids.
- [ ] Associar label, ajuda e erro.
- [ ] Implementar busca/seleção por teclado.
- [ ] Implementar estados inválido/disabled/loading.
- [ ] Testar interação e mobile.

### 5. Expected Files

`src/shared/components/ui/Input.tsx`, `Select.tsx`, `src/features/exchange/components/CurrencyAmountField.tsx`, testes.

### 6. Acceptance Criteria

- Controles têm nome acessível e `aria-invalid` quando aplicável.
- Código ISO continua visível e o campo não permite estado numérico enganoso.

### 7. Testing Requirements

Teclado, busca case-insensitive, erro, zero, vazio e foco.

### 8. Definition of Done

- [ ] Controles concluídos.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `feat/design-system`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
