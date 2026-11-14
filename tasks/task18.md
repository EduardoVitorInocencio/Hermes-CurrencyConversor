### TASK-018 — Validar layout, landmarks e viewports

**Metadata**

- ID: TASK-018
- Feature: Application layout
- Phase: Phase 3 — Application Layout
- Type: Test
- Priority: P0
- Status: TODO
- Dependencies: TASK-016, TASK-017
- Branch: `task/TASK-018-layout-tests` a partir de `feat/application-layout`
- PRD References: RF-039, RNF-003, RNF-004, RNF-005
- TECH References: TECH-004, TECH-016

### 1. Objective

Verificar shell, foco, landmarks e responsividade antes de conectar dados.

### 2. Context

Layout incorreto pode esconder falhas de features e acessibilidade.

### 3. Scope

Testes automatizados e evidências visuais do layout base.

### 4. Implementation Steps

- [ ] Testar navegação e landmarks.
- [ ] Testar foco visível e ordem de tabulação.
- [ ] Executar viewports do PRD.
- [ ] Registrar overflow e contraste.
- [ ] Corrigir regressões dentro do escopo.

### 5. Expected Files

`tests/e2e/`, testes de layout e screenshots.

### 6. Acceptance Criteria

- Todos os viewports críticos passam sem scroll horizontal geral.
- Navegação e landmarks são identificáveis.

### 7. Testing Requirements

Playwright, Testing Library, lint, typecheck e build.

### 8. Definition of Done

- [ ] Validação concluída.
- [ ] Critérios atendidos.
- [ ] Gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `feat/application-layout`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
