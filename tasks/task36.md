### TASK-036 — Implementar preferências de idioma e tema

**Metadata**

- ID: TASK-036
- Feature: Preferences
- Phase: Phase 7 — Integration & QA / P1
- Type: Feature
- Priority: P1
- Status: IN_REVIEW
- Dependencies: TASK-007, TASK-008, TASK-029, TASK-035
- Branch: `dev`
- PRD References: RF-039–RF-042, RN-028, RN-034, RNF-012
- TECH References: TECH-002, TECH-015
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Adicionar PT-BR/EN-US/ES-ES e preferência de tema dentro dos limites aprovados.

### 2. Context

O guia formaliza dark; tema claro exige tokens próprios e decisão de produto.

### 3. Scope

Catálogo de traduções, seletor de idioma, formatos, persistência e dark; liberar light apenas se aprovado.

### 4. Implementation Steps

- [ ] Confirmar PD-003 antes de habilitar light.
- [ ] Criar chaves de tradução e fallback.
- [ ] Integrar locale ao parser/formatter.
- [ ] Persistir com tolerância a storage bloqueado.
- [ ] Verificar códigos/valores canônicos.

### 5. Expected Files

`src/features/preferences/`, `i18n/`, `src/shared/lib/format/`, testes.

### 6. Acceptance Criteria

- Textos e formatos mudam sem alterar valores/códigos.
- Tema não aprovado não é exposto como pronto.

### 7. Testing Requirements

Testes de três locales, fallback, storage e contraste por tema.

### 8. Definition of Done

- [ ] Preferências concluídas.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `feat(app): complete exchange screens and workflow`.
- Pull Request: não aberto.
- Branch de destino: `dev`.
- Status do merge: pendente.

### 10. Completion Notes

Preferências de idioma e modo escuro alinhadas ao shell implementadas; aguardando gates finais.
