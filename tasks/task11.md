### TASK-011 — Implementar Button e variantes

**Metadata**

- ID: TASK-011
- Feature: UI base
- Phase: Phase 2 — Base UI Components
- Type: Component
- Priority: P0
- Status: TODO
- Dependencies: TASK-007
- Branch: `task/TASK-011-button` a partir de `feat/design-system`
- PRD References: RNF-004, RNF-005, RNF-018
- TECH References: TECH-003

### 1. Objective

Criar ação reutilizável com estados HERMES e nome acessível.

### 2. Context

Swap, retry, limpar filtros e exportação exigem comportamento consistente.

### 3. Scope

Button com variantes/ícone/loading/disabled/foco. Não implementar ações de features.

### 4. Implementation Steps

- [ ] Definir props e tipos.
- [ ] Aplicar tokens e tamanho de toque.
- [ ] Implementar estados default/hover/focus/disabled/loading.
- [ ] Garantir `button` semântico e label acessível.
- [ ] Criar testes.

### 5. Expected Files

`src/shared/components/ui/Button.tsx`, estilos e testes.

### 6. Acceptance Criteria

- Variantes não usam cores fora dos tokens.
- Loading impede ação duplicada e preserva nome acessível.

### 7. Testing Requirements

Renderização, click, disabled/loading, foco e acessibilidade.

### 8. Definition of Done

- [ ] Componente concluído.
- [ ] Critérios atendidos.
- [ ] Testes/lint/typecheck aprovados.
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
