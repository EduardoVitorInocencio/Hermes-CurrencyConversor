### TASK-007 — Extrair tokens HERMES dark e estilos globais

**Metadata**

- ID: TASK-007
- Feature: Design system
- Phase: Phase 1 — Design Foundation
- Type: Component
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-003, TASK-006
- Branch: `dev`
- PRD References: RNF-005, RNF-018, RN-034
- TECH References: TECH-002
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Transformar os tokens verificados no `styleRef` em tokens consumíveis pela aplicação.

### 2. Context

O guia define 12 cores, semântica dark, espaçamento e raios; o template ainda usa CSS do starter.

### 3. Scope

Tokens de cor/dimensão, reset e estados globais. Não criar tema claro nem dados de produto.

### 4. Implementation Steps

- [x] Extrair primitivas e aliases exatamente do Design Guide local.
- [x] Mapear tokens para Tailwind/CSS sem renomear semanticamente sem justificativa.
- [x] Definir foco, seleção e estados aprovados.
- [x] Configurar estilos globais e tipografia base.
- [x] Validar contraste inicial.

### 5. Expected Files

`src/app/styles/tokens.css`, `src/app/styles/globals.css`, configuração Tailwind.

### 6. Acceptance Criteria

- Tokens coincidem com `styleRef`.
- Dark é o único tema ativo.
- Não há `emerald`/cores genéricas substituindo HERMES.

### 7. Testing Requirements

Build, inspeção visual e verificação de contraste para combinações principais.

### 8. Definition of Done

- [x] Tokens implementados.
- [x] Critérios atendidos.
- [x] Gates/contraste aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: commit local atual — `feat(design-system): add HERMES dark tokens`.
- Pull Request: não aberto, conforme solicitado.
- Branch de destino: `dev`.
- Status do merge: não aplicável; integração via PR não será realizada.

### 10. Completion Notes

Tokens HERMES extraídos do Design Guide local para `src/app/styles/tokens.css`: 12 primitivas, 12 aliases semânticos dark-only, 16 dimensões, tipografia Inter, pesos 400/500/600/700 e estados aprovados `brand-hover`, `selected` e `positive-soft`. `src/app/styles/globals.css` aplica reset, foco visível, seleção, tipografia base e fundo escuro; `src/index.css` importa o novo ponto de entrada. O Tailwind recebe somente nomes `hermes-*`, sem substituir a paleta por `emerald` ou cores genéricas.

Validação em 14/11/2026: contraste sobre o canvas — foreground `16.95:1`, muted `8.91:1`, subtle `5.94:1`, positive `11.63:1`, negative `8.41:1`; `npm run test` passou com 2 testes; `npm run test:e2e:ci` passou com 2 projetos; `npm run lint`, `npm run typecheck` e `npm run build` passaram.
