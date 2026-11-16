### TASK-011 — Implementar Button e variantes

**Metadata**

- ID: TASK-011
- Feature: UI base
- Phase: Phase 2 — Base UI Components
- Type: Component
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-007
- Branch: `dev`
- PRD References: RNF-004, RNF-005, RNF-018
- TECH References: TECH-003
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Criar ação reutilizável com estados HERMES e nome acessível.

### 2. Context

Swap, retry, limpar filtros e exportação exigem comportamento consistente.

### 3. Scope

Button com variantes/ícone/loading/disabled/foco. Não implementar ações de features.

### 4. Implementation Steps

- [x] Definir props e tipos.
- [x] Aplicar tokens e tamanho de toque.
- [x] Implementar estados default/hover/focus/disabled/loading.
- [x] Garantir `button` semântico e label acessível.
- [x] Criar testes.

### 5. Expected Files

`src/shared/components/ui/Button.tsx`, estilos e testes.

### 6. Acceptance Criteria

- Variantes não usam cores fora dos tokens.
- Loading impede ação duplicada e preserva nome acessível.

### 7. Testing Requirements

Renderização, click, disabled/loading, foco e acessibilidade.

### 8. Definition of Done

- [x] Componente concluído.
- [x] Critérios atendidos.
- [x] Testes/lint/typecheck aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `feat(ui): add Hermes Button component`.
- Pull Request: não aberto.
- Branch de destino: não aplicável; fluxo solicitado sem PR.
- Status do merge: não aplicável.

### 10. Completion Notes

Button compartilhado implementado com tokens HERMES, variantes `primary`/`secondary`/`quiet`, tamanhos `md`/`sm`, suporte a ícone, loading, disabled e foco visível. O loading preserva o nome acessível e bloqueia cliques duplicados. Validações executadas: `npm run lint`, `npm run typecheck`, `npm run test` (14 testes aprovados), `npm run build` e `npm run test:e2e:ci` (3 aprovados, 1 skip esperado no projeto mobile). Commit local registrado na branch `dev`, sem abertura de PR.
