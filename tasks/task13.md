### TASK-013 — Implementar Card, Badge e hierarquia tipográfica

**Metadata**

- ID: TASK-013
- Feature: UI base
- Phase: Phase 2 — Base UI Components
- Type: Component
- Priority: P0
- Status: TODO
- Dependencies: TASK-007, TASK-008
- Branch: `task/TASK-013-card-badge-typography` a partir de `feat/design-system`
- PRD References: RNF-005, RNF-018, RNF-019
- TECH References: TECH-003

### 1. Objective

Criar superfícies e estilos semânticos para cards, status e textos.

### 2. Context

Mercado, conversor, histórico e mensagens usam a mesma linguagem visual.

### 3. Scope

Card, Badge e wrappers tipográficos alinhados aos tokens. Não compor páginas.

### 4. Implementation Steps

- [ ] Definir variantes surface/raised/status.
- [ ] Aplicar radius, borda e espaçamento do guia.
- [ ] Garantir hierarquia semântica.
- [ ] Evitar sombra/gradiente não aprovado.
- [ ] Criar testes básicos.

### 5. Expected Files

`src/shared/components/ui/Card.tsx`, `Badge.tsx`, `Typography.tsx`, testes.

### 6. Acceptance Criteria

- Tokens e semântica de heading são consistentes.
- Status não depende exclusivamente de cor.

### 7. Testing Requirements

Renderização, variantes, headings e contraste.

### 8. Definition of Done

- [ ] Componentes concluídos.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
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
