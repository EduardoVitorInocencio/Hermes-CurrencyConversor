### TASK-007 — Extrair tokens HERMES dark e estilos globais

**Metadata**

- ID: TASK-007
- Feature: Design system
- Phase: Phase 1 — Design Foundation
- Type: Component
- Priority: P0
- Status: TODO
- Dependencies: TASK-003, TASK-006
- Branch: `task/TASK-007-hermes-tokens` a partir de `feat/design-system`
- PRD References: RNF-005, RNF-018, RN-034
- TECH References: TECH-002

### 1. Objective

Transformar os tokens verificados no `styleRef` em tokens consumíveis pela aplicação.

### 2. Context

O guia define 12 cores, semântica dark, espaçamento e raios; o template ainda usa CSS do starter.

### 3. Scope

Tokens de cor/dimensão, reset e estados globais. Não criar tema claro nem dados de produto.

### 4. Implementation Steps

- [ ] Extrair primitivas e aliases exatamente do Design Guide local.
- [ ] Mapear tokens para Tailwind/CSS sem renomear semanticamente sem justificativa.
- [ ] Definir foco, seleção e estados aprovados.
- [ ] Configurar estilos globais e tipografia base.
- [ ] Validar contraste inicial.

### 5. Expected Files

`src/app/styles/tokens.css`, `src/app/styles/globals.css`, configuração Tailwind.

### 6. Acceptance Criteria

- Tokens coincidem com `styleRef`.
- Dark é o único tema ativo.
- Não há `emerald`/cores genéricas substituindo HERMES.

### 7. Testing Requirements

Build, inspeção visual e verificação de contraste para combinações principais.

### 8. Definition of Done

- [ ] Tokens implementados.
- [ ] Critérios atendidos.
- [ ] Gates/contraste aprovados.
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

Não iniciada; registrar divergências observadas no Figma.
