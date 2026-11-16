### TASK-010 — Validar fundação visual contra Figma e styleRef

**Metadata**

- ID: TASK-010
- Feature: Design system
- Phase: Phase 1 — Design Foundation
- Type: Test
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-007, TASK-008
- Branch: `dev`
- PRD References: RNF-003, RNF-005, RNF-018, PD-007
- TECH References: TECH-002
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Comparar tokens e uma página-base com as referências desktop/mobile disponíveis.

### 2. Context

O Figma formaliza 1440/390 px, mas 768/1280 e estados de interação ainda são pendentes.

### 3. Scope

Checklist visual, screenshots e registro de divergências. Não alterar Figma nem inventar tokens.

### 4. Implementation Steps

- [x] Capturar referência local nos viewports principais.
- [x] Comparar cor, tipografia, radius, espaçamento e foco.
- [x] Registrar divergências e decisão necessária.
- [x] Corrigir apenas diferenças justificadas.
- [x] Atualizar relatório da tarefa.

### 5. Expected Files

`tests/screenshots/` ou diretório definido pelo projeto, `docs/` se adotado, arquivos de estilo quando necessário.

### 6. Acceptance Criteria

- Divergências são classificadas como corrigidas ou pendentes.
- 390 e 1440 px não apresentam regressão evidente.

### 7. Testing Requirements

Validação visual e contraste; lint/build após eventuais correções.

### 8. Definition of Done

- [x] Baseline validado.
- [x] Critérios atendidos.
- [x] Gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: commit local atual — `test(design-system): record visual baseline`.
- Pull Request: não aberto, conforme solicitado.
- Branch de destino: `dev`.
- Status do merge: não aplicável; integração via PR não será realizada.

### 10. Completion Notes

Baseline visual registrado em [docs/TASK-010-VISUAL-BASELINE.md](../docs/TASK-010-VISUAL-BASELINE.md), com screenshots desktop 1440×900 e mobile 390×844, comparação automatizada de 42 tokens e matriz de divergências. Tokens, contraste e overflow global foram confirmados; a divergência de conteúdo entre o starter atual e as telas HERMES do Figma permanece pendente para as tarefas de layout, sem antecipar implementação de produto.

Validação em 16/11/2026: captura visual concluída; `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e:ci` e `npm run build` passaram antes do registro do relatório.
