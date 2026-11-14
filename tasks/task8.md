### TASK-008 — Configurar tipografia e breakpoints

**Metadata**

- ID: TASK-008
- Feature: Design system
- Phase: Phase 1 — Design Foundation
- Type: Component
- Priority: P0
- Status: TODO
- Dependencies: TASK-007
- Branch: `task/TASK-008-type-breakpoints` a partir de `feat/design-system`
- PRD References: RNF-003, RNF-004, RNF-018
- TECH References: TECH-002

### 1. Objective

Aplicar escala tipográfica Inter, números tabulares e breakpoints de referência.

### 2. Context

O Design Guide registra fundamentos 30/36 até 12/16 e pontos de validação mobile/tablet/desktop.

### 3. Scope

Classes/tokens de tipografia, line heights, breakpoints e regras mobile-first. Não validar layout de cada feature.

### 4. Implementation Steps

- [ ] Definir família, pesos e escala.
- [ ] Aplicar `tabular-nums` a valores/taxas.
- [ ] Definir breakpoints sem inventar modos Figma.
- [ ] Documentar pontos 375/390/430/768/1024/1280/1440.
- [ ] Validar build e contraste.

### 5. Expected Files

`src/app/styles/tokens.css`, `src/app/styles/globals.css`, documentação visual.

### 6. Acceptance Criteria

- Escala bate com o guia.
- Página não ganha scroll horizontal por estilos globais.

### 7. Testing Requirements

Smoke visual nos sete breakpoints e lint/build.

### 8. Definition of Done

- [ ] Tipografia/breakpoints concluídos.
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
