### TASK-026 — Implementar cálculo dos oito intervalos

**Metadata**

- ID: TASK-026
- Feature: Exchange history
- Phase: Phase 5 — Hooks & Business Logic
- Type: Hook
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-022, TASK-024
- Branch: `dev`
- PRD References: RF-018, RF-017, RN-013–RN-016, RNF-019
- TECH References: TECH-008, TECH-009
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Calcular limites de data corretos para 7D, 15D, 30D, 3M, 6M, 1A, 5A e 10A.

### 2. Context

Dias corridos e períodos de calendário têm semânticas diferentes e precisam ser testáveis.

### 3. Scope

`getPeriodRange`, data civil de referência, inclusão dos extremos e decisão sobre date-fns. Não consultar API.

### 4. Implementation Steps

- [x] Decidir dependência de datas (TD-001).
- [x] Implementar todos os períodos.
- [x] Tratar fim de mês, ano bissexto e timezone.
- [x] Garantir datas ISO.
- [x] Criar testes parametrizados.

### 5. Expected Files

`src/features/history/utils/getPeriodRange.ts`, tipos, testes e decisão técnica.

### 6. Acceptance Criteria

- 7D inclui sete datas civis conforme RN-015.
- Meses/anos usam calendário sem deslocamento de fuso.

### 7. Testing Requirements

Oito períodos, final de mês, ano bissexto e datas de referência fixas.

### 8. Definition of Done

- [x] Intervalos concluídos.
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

`getPeriodRange` implementado sem dependência externa, usando datas civis UTC, extremos inclusivos, oito períodos, fim de mês e ano bissexto cobertos por testes.
