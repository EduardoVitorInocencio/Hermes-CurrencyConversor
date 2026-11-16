### TASK-012 — Implementar Input, Select e CurrencyAmountField

**Metadata**

- ID: TASK-012
- Feature: UI base / currencies
- Phase: Phase 2 — Base UI Components
- Type: Component
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-007, TASK-009
- Branch: `dev`
- PRD References: RF-002, RF-003, RF-007, RF-008, RF-013, RNF-004
- TECH References: TECH-003, TECH-006, TECH-007
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Fornecer controles tipados, rotulados e reutilizáveis para moeda, valor e filtros.

### 2. Context

Conversor e histórico compartilham requisitos de foco, erro, ajuda e teclado.

### 3. Scope

Input, Select pesquisável e campo monetário; não inclui catálogo/API.

### 4. Implementation Steps

- [x] Definir contratos de props e ids.
- [x] Associar label, ajuda e erro.
- [x] Implementar busca/seleção por teclado.
- [x] Implementar estados inválido/disabled/loading.
- [x] Testar interação e mobile.

### 5. Expected Files

`src/shared/components/ui/Input.tsx`, `Select.tsx`, `src/features/exchange/components/CurrencyAmountField.tsx`, testes.

### 6. Acceptance Criteria

- Controles têm nome acessível e `aria-invalid` quando aplicável.
- Código ISO continua visível e o campo não permite estado numérico enganoso.

### 7. Testing Requirements

Teclado, busca case-insensitive, erro, zero, vazio e foco.

### 8. Definition of Done

- [x] Controles concluídos.
- [x] Critérios atendidos.
- [x] Testes/gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `feat(ui): add form controls`.
- Pull Request: não aberto.
- Branch de destino: não aplicável; fluxo solicitado sem PR.
- Status do merge: não aplicável.

### 10. Completion Notes

Input, Select e CurrencyAmountField implementados com contratos tipados, labels, ajuda, erro, loading, disabled, foco e busca/seleção por teclado. O valor monetário permanece como string e os códigos ISO são exibidos. Validações finais: lint, typecheck, testes, build e E2E aprovados.
