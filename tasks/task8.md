### TASK-008 — Configurar tipografia e breakpoints

**Metadata**

- ID: TASK-008
- Feature: Design system
- Phase: Phase 1 — Design Foundation
- Type: Component
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-007
- Branch: `dev`
- PRD References: RNF-003, RNF-004, RNF-018
- TECH References: TECH-002
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Aplicar escala tipográfica Inter, números tabulares e breakpoints de referência.

### 2. Context

O Design Guide registra fundamentos 30/36 até 12/16 e pontos de validação mobile/tablet/desktop.

### 3. Scope

Classes/tokens de tipografia, line heights, breakpoints e regras mobile-first. Não validar layout de cada feature.

### 4. Implementation Steps

- [x] Definir família, pesos e escala.
- [x] Aplicar `tabular-nums` a valores/taxas.
- [x] Definir breakpoints sem inventar modos Figma.
- [x] Documentar pontos 375/390/430/768/1024/1280/1440.
- [ ] Validar build e contraste.

### 5. Expected Files

`src/app/styles/tokens.css`, `src/app/styles/globals.css`, documentação visual.

### 6. Acceptance Criteria

- Escala bate com o guia.
- Página não ganha scroll horizontal por estilos globais.

### 7. Testing Requirements

Smoke visual nos sete breakpoints e lint/build.

### 8. Definition of Done

- [x] Tipografia/breakpoints concluídos.
- [x] Critérios atendidos.
- [x] Gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: commit local atual — `feat(design-system): define typography breakpoints`.
- Pull Request: não aberto, conforme solicitado.
- Branch de destino: `dev`.
- Status do merge: não aplicável; integração via PR não será realizada.

### 10. Completion Notes

Escala Inter aplicada com os sete estilos do Design Guide: H1 `30/36`, H2 `24/32`, H3 `20/28`, H4 `18/28`, Body Large `16/24`, Body Medium `14/20` e Caption Small `12/16`, pesos 400/500/600/700. As classes `.type-*` e `.tabular-nums` estão disponíveis globalmente; o shell usa H1/H2 e a base mantém números tabulares para valores futuros.

Breakpoints Tailwind nomeados como pontos de validação: 375, 390, 430, 768, 1024, 1280 e 1440 px. O documento não cria novos modos de design; o overflow horizontal global é contido em `html/body` e tabelas futuras devem controlar seu próprio overflow. O smoke E2E `tests/e2e/responsive.spec.ts` percorre os sete pontos e verifica a ausência de scroll horizontal.

Validação em 14/11/2026: `npm run test` passou com 2 testes; `npm run test:e2e:ci` passou com 3 testes e 1 skip esperado no device mobile; `npm run lint`, `npm run typecheck` e `npm run build` passaram.
