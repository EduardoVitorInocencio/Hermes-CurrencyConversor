### TASK-026 — Implementar cálculo dos oito intervalos

**Metadata**

- ID: TASK-026
- Feature: Exchange history
- Phase: Phase 5 — Hooks & Business Logic
- Type: Hook
- Priority: P0
- Status: TODO
- Dependencies: TASK-022, TASK-024
- Branch: `task/TASK-026-period-ranges` a partir de `feat/exchange-history`
- PRD References: RF-018, RF-017, RN-013–RN-016, RNF-019
- TECH References: TECH-008, TECH-009

### 1. Objective

Calcular limites de data corretos para 7D, 15D, 30D, 3M, 6M, 1A, 5A e 10A.

### 2. Context

Dias corridos e períodos de calendário têm semânticas diferentes e precisam ser testáveis.

### 3. Scope

`getPeriodRange`, data civil de referência, inclusão dos extremos e decisão sobre date-fns. Não consultar API.

### 4. Implementation Steps

- [ ] Decidir dependência de datas (TD-001).
- [ ] Implementar todos os períodos.
- [ ] Tratar fim de mês, ano bissexto e timezone.
- [ ] Garantir datas ISO.
- [ ] Criar testes parametrizados.

### 5. Expected Files

`src/features/history/utils/getPeriodRange.ts`, tipos, testes e decisão técnica.

### 6. Acceptance Criteria

- 7D inclui sete datas civis conforme RN-015.
- Meses/anos usam calendário sem deslocamento de fuso.

### 7. Testing Requirements

Oito períodos, final de mês, ano bissexto e datas de referência fixas.

### 8. Definition of Done

- [ ] Intervalos concluídos.
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

Não iniciada; registrar TD-001.
