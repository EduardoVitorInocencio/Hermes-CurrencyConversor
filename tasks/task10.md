### TASK-010 — Validar fundação visual contra Figma e styleRef

**Metadata**

- ID: TASK-010
- Feature: Design system
- Phase: Phase 1 — Design Foundation
- Type: Test
- Priority: P0
- Status: TODO
- Dependencies: TASK-007, TASK-008
- Branch: `task/TASK-010-visual-baseline` a partir de `feat/design-system`
- PRD References: RNF-003, RNF-005, RNF-018, PD-007
- TECH References: TECH-002

### 1. Objective

Comparar tokens e uma página-base com as referências desktop/mobile disponíveis.

### 2. Context

O Figma formaliza 1440/390 px, mas 768/1280 e estados de interação ainda são pendentes.

### 3. Scope

Checklist visual, screenshots e registro de divergências. Não alterar Figma nem inventar tokens.

### 4. Implementation Steps

- [ ] Capturar referência local nos viewports principais.
- [ ] Comparar cor, tipografia, radius, espaçamento e foco.
- [ ] Registrar divergências e decisão necessária.
- [ ] Corrigir apenas diferenças justificadas.
- [ ] Atualizar relatório da tarefa.

### 5. Expected Files

`tests/screenshots/` ou diretório definido pelo projeto, `docs/` se adotado, arquivos de estilo quando necessário.

### 6. Acceptance Criteria

- Divergências são classificadas como corrigidas ou pendentes.
- 390 e 1440 px não apresentam regressão evidente.

### 7. Testing Requirements

Validação visual e contraste; lint/build após eventuais correções.

### 8. Definition of Done

- [ ] Baseline validado.
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

Não iniciada; registrar pendências tablet e estados Figma.
