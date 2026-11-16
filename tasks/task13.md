### TASK-013 — Implementar Card, Badge e hierarquia tipográfica

**Metadata**

- ID: TASK-013
- Feature: UI base
- Phase: Phase 2 — Base UI Components
- Type: Component
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-007, TASK-008
- Branch: `dev`
- PRD References: RNF-005, RNF-018, RNF-019
- TECH References: TECH-003
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Criar superfícies e estilos semânticos para cards, status e textos.

### 2. Context

Mercado, conversor, histórico e mensagens usam a mesma linguagem visual.

### 3. Scope

Card, Badge e wrappers tipográficos alinhados aos tokens. Não compor páginas.

### 4. Implementation Steps

- [x] Definir variantes surface/raised/status.
- [x] Aplicar radius, borda e espaçamento do guia.
- [x] Garantir hierarquia semântica.
- [x] Evitar sombra/gradiente não aprovado.
- [x] Criar testes básicos.

### 5. Expected Files

`src/shared/components/ui/Card.tsx`, `Badge.tsx`, `Typography.tsx`, testes.

### 6. Acceptance Criteria

- Tokens e semântica de heading são consistentes.
- Status não depende exclusivamente de cor.

### 7. Testing Requirements

Renderização, variantes, headings e contraste.

### 8. Definition of Done

- [x] Componentes concluídos.
- [x] Critérios atendidos.
- [x] Testes/gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `feat(ui): add surface components`.
- Pull Request: não aberto.
- Branch de destino: não aplicável; fluxo solicitado sem PR.
- Status do merge: não aplicável.

### 10. Completion Notes

Card, Badge e Typography implementados com variantes HERMES, heading semântico e status acompanhado de marcador e texto. Sem sombra ou gradiente. Validações finais: lint, typecheck, testes, build e E2E aprovados.
