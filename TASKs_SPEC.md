# HERMES — Master Implementation Plan

| Campo | Definição |
|---|---|
| Fonte de produto | [`PRD_SPEC.md`](PRD_SPEC.md) |
| Fonte técnica | [`TECH_SPEC.md`](TECH_SPEC.md) |
| Snapshot operacional | [`SPEC.md`](SPEC.md) |
| Data da revisão | 16/11/2026 |
| Status global | Implementação principal realizada; fases em `IN_REVIEW` até DoD, revisão e PR/merge |
| Itens de execução | 10 fases consolidadas |
| Branches principais | `main` (produção) e `dev` (integração atual) |
| Regra de conclusão | Código + validação + revisão/PR real + sincronização documental |

Este arquivo é o checklist central da execução. O plano anterior de 42 tasks foi sintetizado em 10 fases; não há mais arquivos individuais em `tasks/`. Cada fase só pode ser marcada como `DONE` quando código, critérios, gates, documentação e integração estiverem confirmados.

## 1. Plano consolidado em 10 fases

### Phase 1 — Foundation & Tooling · IN_REVIEW

- Setup do repositório, aliases, scripts, providers e ferramentas de teste.
- Evidência atual: Vite, TypeScript estrito, ESLint, Vitest, MSW, Playwright e Tailwind v4 configurados.

### Phase 2 — Design Foundation · IN_REVIEW

- Tokens dark HERMES, tipografia Inter, breakpoints, iconografia, bandeiras e validação visual.
- Pendência: revisão visual/manual completa contra Figma e Design Guide.

### Phase 3 — Shared UI & Accessibility · IN_REVIEW

- Componentes base, superfícies, formulários, feedback, foco e contratos de acessibilidade.
- Evidência atual: componentes compartilhados e testes unitários/componentes implementados.

### Phase 4 — App Shell & Responsive Layout · IN_REVIEW

- AppShell, landmarks, navegação desktop/mobile, containers e validação de viewport.
- Evidência atual: navegação entre Conversor, Histórico, Análise e Relatórios sem recarga.

### Phase 5 — API & Data Contracts · IN_REVIEW

- Cliente Axios, endpoints Frankfurter v2, adapters, validação, erros, cancelamento e cache do catálogo.
- Pendência: cache TTL/deduplicação para cotação e histórico.

### Phase 6 — Domain State, Hooks & Formatting · IN_REVIEW

- Estado compartilhado, conversão, intervalos, filtros, ordenação, paginação, cancelamento e formatação local.
- Evidência atual: funções puras e hooks principais implementados; ordenação por coluna ainda precisa ser conectada à UI.

### Phase 7 — Converter & Market Experience · PARTIAL

- Conversor P0, overview de pares, abertura de par e favoritos locais.
- Evidência atual: conversor e overview funcionais; favoritos e valores da sidebar ainda têm integração parcial/estática.

### Phase 8 — History, Analysis & Export · PARTIAL

- Histórico detalhado, análise comparativa, gráfico, tabela, filtros, paginação e CSV.
- Evidência atual: dados reais da API e exportação canônica implementados; builder de relatórios ainda não aplica colunas/frequência ao CSV.

### Phase 9 — Preferences & Product Integration · PARTIAL

- Idioma, tema, favoritos, status da API, stale-data e integração final entre telas.
- Pendências: tradução completa, tema dark-only explícito, status derivado de request real e preferências conectadas ao shell.

### Phase 10 — E2E, Documentation & Release · IN_REVIEW

- E2E, acessibilidade, responsividade, desempenho, Postman, documentação e checklist de release.
- Evidência atual: gates locais verdes; PR/merge, revisão visual/manual, WCAG formal e code splitting permanecem pendentes.

## 2. Dependências críticas

```text
PHASE 1 → PHASE 2 → PHASE 3 → PHASE 4 → PHASE 5 → PHASE 6
                                                   ├──► PHASE 7 — Converter & Market
                                                   └──► PHASE 8 — History & Export
PHASE 7 + PHASE 8 → PHASE 9 — Preferences & Integration
PHASE 9 → PHASE 10 — E2E, Documentation & Release
```

Dependências são bloqueios de implementação, não autorização para pular gates. Uma fase pode avançar somente quando suas dependências obrigatórias estiverem concluídas ou quando a exceção estiver registrada neste arquivo.

## 3. Matriz de rastreabilidade por fase

| Fase | PRD principal | TECH principal | Escopo | Estado |
|---|---|---|---|---|
| 1 — Foundation & Tooling | RNF-001/002/016/017 | TECH-001 | Setup, aliases, scripts e providers | IN_REVIEW |
| 2 — Design Foundation | RNF-003–005/018; RN-034 | TECH-002 | Tokens, tipografia, ícones e validação visual | IN_REVIEW |
| 3 — Shared UI & Accessibility | RNF-004/005/018 | TECH-003 | Componentes base, feedback e acessibilidade | IN_REVIEW |
| 4 — App Shell & Responsive Layout | RF-039; RNF-003/004/018 | TECH-004 | Shell, navegação, landmarks e viewports | IN_REVIEW |
| 5 — API & Data Contracts | RF-001/005/009/015/017; RN-001/011/030/033; RNF-008–010 | TECH-005/006 | Axios, adapters, validação, cache e erros | IN_REVIEW |
| 6 — Domain State, Hooks & Formatting | RF-008/010/013/014; RN-003/005–008; RNF-009/019 | TECH-007/008/009/010/011 | Estado, períodos, conversão, pipeline e formatação | IN_REVIEW |
| 7 — Converter & Market Experience | RF-002/004/008–016/023–025/043 | TECH-012/015 | Conversor, overview e favoritos | PARTIAL |
| 8 — History, Analysis & Export | RF-017–038; RN-012–026; RNF-010/020 | TECH-008/010/013/014 | Histórico, análise, tabela, filtros e CSV | PARTIAL |
| 9 — Preferences & Product Integration | RF-039–043; RN-028/031/034 | TECH-015 | Idioma, tema, status e stale-data | PARTIAL |
| 10 — E2E, Documentation & Release | RNF-003–017; CA-01–10 | TECH-016 | E2E, QA, Postman, docs e release | IN_REVIEW |

## 4. Branching strategy

### 4.1 Branches principais

- `main`: produção, protegida, sem commit direto, integração via PR de release.
- `dev`: integração atual do projeto, recebe features aprovadas via PR.

### 4.2 Feature branches

Criar a partir de `dev`, usando somente escopo previsto no PRD:

| Feature | Branch |
|---|---|
| Setup | `chore/project-setup` |
| Design system | `feat/design-system` |
| Layout | `feat/application-layout` |
| API/data | `feat/api-data-layer` |
| Converter | `feat/converter` |
| Histórico | `feat/exchange-history` |
| Exportação | `feat/export` |
| P1 HERMES | `feat/hermes-experience` |
| Qualidade | `chore/quality-gates` |
| Release | `chore/release-readiness` |

### 4.3 Phase branches

Cada fase parte da feature correspondente, nunca diretamente de `main`:

```text
dev
  └── feat/converter
        └── phase/07-converter-market
```

O nome da branch deve refletir a fase ou feature trabalhada e permanecer rastreável ao PRD/TECH.

## 5. Pull Request workflow

### Fase → Feature

1. Criar a branch da fase a partir da feature branch atualizada.
2. Atualizar o status da fase para `IN_PROGRESS`.
3. Implementar somente o escopo.
4. Executar testes, lint, typecheck e build aplicável.
5. Criar commits semânticos e publicar a branch.
6. Abrir PR para a feature branch.
7. Revisar critérios de aceitação e evidências.
8. Integrar somente após aprovação real.
9. Atualizar o checklist central, `SPEC.md` e a matriz.

### Feature → dev

Quando tarefas obrigatórias da feature estiverem `DONE`, abrir PR para `dev` com testes completos, dependências, critérios do PRD e documentação atualizados. Não afirmar merge sem confirmação real.

### dev → main

Somente por release aprovada. Sem force push, merge direto ou commit direto em branches protegidas.

## 6. Conventional Commits

Formato: `<type>(<scope>): <description>`.

Tipos permitidos: `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `chore`, `perf`, `ci`, `build`.

Exemplos:

```text
chore(setup): configure Hermes quality scripts
feat(ui): add Button variants
feat(api): integrate Frankfurter v2 rate service
test(history): cover combined filters and sorting
fix(converter): reject non-finite amount
docs(plan): consolidate execution into ten phases
```

Commits devem ser pequenos, objetivos, sem arquivos temporários ou segredos, e devem indicar a fase ou feature afetada quando isso ajudar na rastreabilidade.

## 7. Quality gates e sincronização

Cada fase deve registrar resultado de `lint`, `typecheck`, testes e build aplicáveis. A checklist central só muda para `[x]` quando:

1. código está implementado;
2. critérios de aceitação foram verificados;
3. testes e gates passaram;
4. documentação foi atualizada;
5. PR foi aprovado e integrado de forma confirmada.

Enquanto qualquer uma dessas condições faltar, o status da fase permanece `IN_PROGRESS`, `BLOCKED`, `PARTIAL` ou `IN_REVIEW`.

## 8. Próxima tarefa recomendada

**Próxima frente recomendada:** fechar as pendências parciais das Fases 7–9: conectar favoritos/status da API, tornar preferências funcionais, ligar ordenação por coluna e alinhar as opções do builder ao CSV. Depois, repetir a validação de release da Fase 10.

## 9. Pendências de planejamento

- Confirmar limite de entrada, período inicial e tema claro com produto/design.
- Confirmar política de datas repetidas e necessidade de `date-fns`.
- Confirmar browsers adicionais e execução E2E no CI.
- Verificar acesso real ao remoto antes de publicar branches ou abrir PRs.
- Fazer revisão visual/manual contra Figma e auditoria WCAG formal.
- Reduzir o chunk de produção ou registrar a decisão de code splitting.
- Atualizar status somente com evidências reais de implementação, revisão e integração.
