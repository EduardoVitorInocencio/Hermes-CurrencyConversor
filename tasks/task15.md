### TASK-015 — Testar componentes base e acessibilidade

**Metadata**

- ID: TASK-015
- Feature: UI base
- Phase: Phase 2 — Base UI Components
- Type: Test
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-011, TASK-012, TASK-013, TASK-014
- Branch: `dev`
- PRD References: RNF-004, RNF-005, RNF-013, RNF-018
- TECH References: TECH-003, TECH-016
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Consolidar testes de componentes e acessibilidade antes de compor features.

### 2. Context

Todos os fluxos P0 dependem de controles e feedback confiáveis.

### 3. Scope

Testes de componentes base, foco, teclado, labels, erro e estados. Não testar API.

### 4. Implementation Steps

- [x] Cobrir props e variantes.
- [x] Cobrir interações de teclado e foco.
- [x] Cobrir mensagens de erro/loading/vazio.
- [x] Rodar testes de acessibilidade aplicáveis.
- [x] Registrar gaps restantes.

### 5. Expected Files

Testes em `src/shared/components/**` e configuração de acessibilidade.

### 6. Acceptance Criteria

- Componentes base têm cobertura dos comportamentos críticos.
- Falhas de acessibilidade bloqueiam a tarefa.

### 7. Testing Requirements

Vitest/Testing Library, lint, typecheck e build.

### 8. Definition of Done

- [x] Testes concluídos.
- [x] Critérios atendidos.
- [x] Gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `test(ui): cover base accessibility`.
- Pull Request: não aberto.
- Branch de destino: não aplicável; fluxo solicitado sem PR.
- Status do merge: não aplicável.

### 10. Completion Notes

Testes comportamentais consolidados para labels, descrições, foco, teclado, combobox, loading, erro e vazio. Gaps restantes — auditoria visual completa de contraste e regra axe — estão registrados em `docs/TASK-015-A11Y.md`. Validações finais: lint, typecheck, 29 testes, build e E2E aprovados.
