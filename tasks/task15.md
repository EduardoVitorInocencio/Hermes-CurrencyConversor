### TASK-015 — Testar componentes base e acessibilidade

**Metadata**

- ID: TASK-015
- Feature: UI base
- Phase: Phase 2 — Base UI Components
- Type: Test
- Priority: P0
- Status: TODO
- Dependencies: TASK-011, TASK-012, TASK-013, TASK-014
- Branch: `task/TASK-015-base-ui-tests` a partir de `feat/design-system`
- PRD References: RNF-004, RNF-005, RNF-013, RNF-018
- TECH References: TECH-003, TECH-016

### 1. Objective

Consolidar testes de componentes e acessibilidade antes de compor features.

### 2. Context

Todos os fluxos P0 dependem de controles e feedback confiáveis.

### 3. Scope

Testes de componentes base, foco, teclado, labels, erro e estados. Não testar API.

### 4. Implementation Steps

- [ ] Cobrir props e variantes.
- [ ] Cobrir interações de teclado e foco.
- [ ] Cobrir mensagens de erro/loading/vazio.
- [ ] Rodar testes de acessibilidade aplicáveis.
- [ ] Registrar gaps restantes.

### 5. Expected Files

Testes em `src/shared/components/**` e configuração de acessibilidade.

### 6. Acceptance Criteria

- Componentes base têm cobertura dos comportamentos críticos.
- Falhas de acessibilidade bloqueiam a tarefa.

### 7. Testing Requirements

Vitest/Testing Library, lint, typecheck e build.

### 8. Definition of Done

- [ ] Testes concluídos.
- [ ] Critérios atendidos.
- [ ] Gates aprovados.
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
