### TASK-029 — Implementar parsing e formatação por localidade

**Metadata**

- ID: TASK-029
- Feature: Formatting
- Phase: Phase 5 — Hooks & Business Logic
- Type: Hook
- Priority: P0
- Status: TODO
- Dependencies: TASK-007, TASK-024
- Branch: `task/TASK-029-locale-formatting` a partir de `feat/converter`
- PRD References: RF-008, RF-011, RF-040, RN-006, RN-028, RNF-012, RNF-019
- TECH References: TECH-007, TECH-009, TECH-011

### 1. Objective

Separar valor canônico de apresentação local em PT-BR, EN-US e ES-ES.

### 2. Context

Separadores locais podem transformar `1.234,56` em entrada errada se o parser não for testado.

### 3. Scope

Parser seguro, `Intl.NumberFormat`, datas, cotação e valor monetário; não traduzir UI completa.

### 4. Implementation Steps

- [ ] Definir tipos de locale.
- [ ] Implementar parsing sem mutar valor canônico.
- [ ] Implementar casas padrão e precisão adicional.
- [ ] Implementar data conforme locale.
- [ ] Criar testes parametrizados.

### 5. Expected Files

`src/shared/lib/format/number.ts`, `date.ts`, tipos, testes.

### 6. Acceptance Criteria

- PT/EN/ES formatam sem perder valor.
- Taxa pequena não aparece como zero enganoso.
- Código ISO não é traduzido.

### 7. Testing Requirements

Separadores, casas, zero, precisão, datas e mudança de locale.

### 8. Definition of Done

- [ ] Formatting concluído.
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

Não iniciada.
