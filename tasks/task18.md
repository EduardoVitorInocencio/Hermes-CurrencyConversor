### TASK-018 — Validar layout, landmarks e viewports

**Metadata**

- ID: TASK-018
- Feature: Application layout
- Phase: Phase 3 — Application Layout
- Type: Test
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-016, TASK-017
- Branch: `dev`
- PRD References: RF-039, RNF-003, RNF-004, RNF-005
- TECH References: TECH-004, TECH-016
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Verificar shell, foco, landmarks e responsividade antes de conectar dados.

### 2. Context

Layout incorreto pode esconder falhas de features e acessibilidade.

### 3. Scope

Testes automatizados e evidências visuais do layout base.

### 4. Implementation Steps

- [x] Testar navegação e landmarks.
- [x] Testar foco visível e ordem de tabulação.
- [x] Executar viewports do PRD.
- [x] Registrar overflow e contraste.
- [x] Corrigir regressões dentro do escopo.

### 5. Expected Files

`tests/e2e/`, testes de layout e screenshots.

### 6. Acceptance Criteria

- Todos os viewports críticos passam sem scroll horizontal geral.
- Navegação e landmarks são identificáveis.

### 7. Testing Requirements

Playwright, Testing Library, lint, typecheck e build.

### 8. Definition of Done

- [x] Validação concluída.
- [x] Critérios atendidos.
- [x] Gates aprovados.
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

Playwright valida landmarks, navegação, overflow e os sete viewports de referência; smoke e cenários de fluxo também cobrem desktop/mobile.
