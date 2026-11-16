### TASK-029 — Implementar parsing e formatação por localidade

**Metadata**

- ID: TASK-029
- Feature: Formatting
- Phase: Phase 5 — Hooks & Business Logic
- Type: Hook
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-007, TASK-024
- Branch: `dev`
- PRD References: RF-008, RF-011, RF-040, RN-006, RN-028, RNF-012, RNF-019
- TECH References: TECH-007, TECH-009, TECH-011
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Separar valor canônico de apresentação local em PT-BR, EN-US e ES-ES.

### 2. Context

Separadores locais podem transformar `1.234,56` em entrada errada se o parser não for testado.

### 3. Scope

Parser seguro, `Intl.NumberFormat`, datas, cotação e valor monetário; não traduzir UI completa.

### 4. Implementation Steps

- [x] Definir tipos de locale.
- [x] Implementar parsing sem mutar valor canônico.
- [x] Implementar casas padrão e precisão adicional.
- [x] Implementar data conforme locale.
- [x] Criar testes parametrizados.

### 5. Expected Files

`src/shared/lib/format/number.ts`, `date.ts`, tipos, testes.

### 6. Acceptance Criteria

- PT/EN/ES formatam sem perder valor.
- Taxa pequena não aparece como zero enganoso.
- Código ISO não é traduzido.

### 7. Testing Requirements

Separadores, casas, zero, precisão, datas e mudança de locale.

### 8. Definition of Done

- [x] Formatting concluído.
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

Parser e formatadores PT-BR/EN-US/ES-ES implementados; precisão pequena permanece visível e códigos ISO não são traduzidos.
