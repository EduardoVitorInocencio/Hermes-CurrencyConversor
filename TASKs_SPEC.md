# HERMES — Master Implementation Plan

| Campo | Definição |
|---|---|
| Fonte de produto | [`PRD_SPEC.md`](PRD_SPEC.md) |
| Fonte técnica | [`TECH_SPEC.md`](TECH_SPEC.md) |
| Status global | Planejado; nenhuma tarefa concluída nesta reorganização |
| Total de tarefas | 42 |
| Branches principais | `main` (produção) e `develop` (integração) |
| Regra de conclusão | Código + validação + revisão/PR real + sincronização documental |

Este arquivo é o checklist central. Cada item possui um arquivo em `tasks/` e deve permanecer sincronizado com ele. Todas as tarefas começam como `TODO`; não há evidência de implementação, PR aprovado ou merge nesta entrega documental.

## 1. Status e ordem de execução

### Phase 0 — Repository Setup

- [ ] TASK-001 — Auditar baseline e normalizar scripts → [`tasks/task1.md`](tasks/task1.md)
- [ ] TASK-002 — Configurar TypeScript estrito e aliases → [`tasks/task2.md`](tasks/task2.md)
- [ ] TASK-003 — Configurar Tailwind CSS v4 e pipeline de estilos → [`tasks/task3.md`](tasks/task3.md)
- [ ] TASK-004 — Configurar Vitest, Testing Library e MSW → [`tasks/task4.md`](tasks/task4.md)
- [ ] TASK-005 — Configurar Playwright e quality gates → [`tasks/task5.md`](tasks/task5.md)
- [ ] TASK-006 — Preparar ambiente, providers e shell inicial → [`tasks/task6.md`](tasks/task6.md)

### Phase 1 — Design Foundation

- [ ] TASK-007 — Extrair tokens HERMES dark e estilos globais → [`tasks/task7.md`](tasks/task7.md)
- [ ] TASK-008 — Configurar tipografia e breakpoints → [`tasks/task8.md`](tasks/task8.md)
- [ ] TASK-009 — Configurar ícones e mapa de bandeiras → [`tasks/task9.md`](tasks/task9.md)
- [ ] TASK-010 — Validar fundação visual contra Figma e styleRef → [`tasks/task10.md`](tasks/task10.md)

### Phase 2 — Base UI Components

- [ ] TASK-011 — Implementar Button e variantes → [`tasks/task11.md`](tasks/task11.md)
- [ ] TASK-012 — Implementar Input, Select e CurrencyAmountField → [`tasks/task12.md`](tasks/task12.md)
- [ ] TASK-013 — Implementar Card, Badge e hierarquia tipográfica → [`tasks/task13.md`](tasks/task13.md)
- [ ] TASK-014 — Implementar estados de feedback → [`tasks/task14.md`](tasks/task14.md)
- [ ] TASK-015 — Testar componentes base e acessibilidade → [`tasks/task15.md`](tasks/task15.md)

### Phase 3 — Application Layout

- [ ] TASK-016 — Implementar AppShell e navegação de seções → [`tasks/task16.md`](tasks/task16.md)
- [ ] TASK-017 — Implementar containers e layout responsivo → [`tasks/task17.md`](tasks/task17.md)
- [ ] TASK-018 — Validar layout, landmarks e viewports → [`tasks/task18.md`](tasks/task18.md)

### Phase 4 — Services & Data Layer

- [ ] TASK-019 — Implementar cliente Axios e erros normalizados → [`tasks/task19.md`](tasks/task19.md)
- [ ] TASK-020 — Implementar serviço e adaptador de moedas → [`tasks/task20.md`](tasks/task20.md)
- [ ] TASK-021 — Implementar serviço de cotação do par → [`tasks/task21.md`](tasks/task21.md)
- [ ] TASK-022 — Implementar serviço de histórico → [`tasks/task22.md`](tasks/task22.md)
- [ ] TASK-023 — Validar DTOs, normalizar dados e definir cache → [`tasks/task23.md`](tasks/task23.md)

### Phase 5 — Hooks & Business Logic

- [ ] TASK-024 — Implementar estado compartilhado de par e período → [`tasks/task24.md`](tasks/task24.md)
- [ ] TASK-025 — Implementar validação e cálculo de conversão → [`tasks/task25.md`](tasks/task25.md)
- [ ] TASK-026 — Implementar cálculo dos oito intervalos → [`tasks/task26.md`](tasks/task26.md)
- [ ] TASK-027 — Implementar pipeline de filtros, sort e paginação → [`tasks/task27.md`](tasks/task27.md)
- [ ] TASK-028 — Implementar hooks de dados e cancelamento → [`tasks/task28.md`](tasks/task28.md)
- [ ] TASK-029 — Implementar parsing e formatação por localidade → [`tasks/task29.md`](tasks/task29.md)

### Phase 6 — Product Features

- [ ] TASK-030 — Compor Currency Converter P0 → [`tasks/task30.md`](tasks/task30.md)
- [ ] TASK-031 — Compor histórico, períodos e gráfico → [`tasks/task31.md`](tasks/task31.md)
- [ ] TASK-032 — Implementar tabela histórica e estados vazios → [`tasks/task32.md`](tasks/task32.md)
- [ ] TASK-033 — Implementar filtros, ordenação e paginação → [`tasks/task33.md`](tasks/task33.md)
- [ ] TASK-034 — Implementar exportação CSV filtrada → [`tasks/task34.md`](tasks/task34.md)

### Phase 7 — Integration & QA / P1

- [ ] TASK-035 — Implementar overview de mercado e favoritos → [`tasks/task35.md`](tasks/task35.md)
- [ ] TASK-036 — Implementar preferências de idioma e tema → [`tasks/task36.md`](tasks/task36.md)
- [ ] TASK-037 — Implementar status da API e stale-data → [`tasks/task37.md`](tasks/task37.md)
- [ ] TASK-038 — Executar integração E2E do MVP → [`tasks/task38.md`](tasks/task38.md)
- [ ] TASK-039 — Validar acessibilidade, responsividade e desempenho → [`tasks/task39.md`](tasks/task39.md)

### Phase 8 — Release Readiness

- [ ] TASK-040 — Criar coleção Postman e evidências da API → [`tasks/task40.md`](tasks/task40.md)
- [ ] TASK-041 — Atualizar README e documentação operacional → [`tasks/task41.md`](tasks/task41.md)
- [ ] TASK-042 — Executar checklist de release e fechamento → [`tasks/task42.md`](tasks/task42.md)

## 2. Dependências críticas

```text
TASK-001 → TASK-002 → TASK-003 → TASK-006
                     ├──────────► TASK-007 → TASK-008 → TASK-010
                     └──────────► TASK-004 → TASK-005
TASK-007 → TASK-009 → TASK-012/013/014 → TASK-015
TASK-006 + TASK-015 → TASK-016 → TASK-017 → TASK-018
TASK-019 → TASK-020/021/022 → TASK-023
TASK-020/021/022 + TASK-023 → TASK-024/025/026/027/028/029
TASK-012 + TASK-020/021 + TASK-025/028/029 → TASK-030
TASK-022 + TASK-026/028 → TASK-031 → TASK-032 → TASK-033 → TASK-034
TASK-030/031/032/033/034 → TASK-038/039
TASK-023 → TASK-035/037; TASK-029 → TASK-036
TASK-038/039 → TASK-040/041 → TASK-042
```

Dependências são bloqueios de implementação, não autorização para pular gates. Uma tarefa pode ser iniciada somente quando suas dependências obrigatórias estiverem `DONE` ou quando a exceção estiver registrada no próprio arquivo.

## 3. Matriz de rastreabilidade

| PRD | TECH | TASKs | Feature | Status |
|---|---|---|---|---|
| RNF-001/002/016/017 | TECH-001 | TASK-001–006 | Setup | TODO |
| RNF-003–005/018; RN-034 | TECH-002/003 | TASK-007–015 | Design/UI | TODO |
| RF-039; RNF-003/004/018 | TECH-004 | TASK-016–018 | Layout | TODO |
| RF-001/005/009/015/017; RN-001/011/030/033; RNF-008–010 | TECH-005/006 | TASK-019–023 | Data/API | TODO |
| RF-008/010/013/014; RN-003/005–008 | TECH-007/009/011 | TASK-024–029 | Domínio/hooks | TODO |
| RF-002/004/008–015/043 | TECH-012 | TASK-025/028–030/037 | Converter | TODO |
| RF-017–034; RN-012–025; RNF-020 | TECH-008/010/013 | TASK-022/026–028/031–033 | Histórico | TODO |
| RF-035–038; RN-025/026; RNF-010 | TECH-014 | TASK-034/038 | CSV | TODO |
| RF-006/007/016/023–025/040–042 | TECH-006/015 | TASK-009/020/035–037 | P1 HERMES | TODO |
| RNF-003–015; CA-01–10 | TECH-016 | TASK-004/005/015/018/038–042 | QA/release | TODO |

## 4. Branching strategy

### 4.1 Branches principais

- `main`: produção, protegida, sem commit direto, integração via PR de release.
- `develop`: integração, protegida, recebe features aprovadas via PR.

### 4.2 Feature branches

Criar a partir de `develop`, usando somente escopo previsto no PRD:

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

### 4.3 Task branches

Cada tarefa parte da feature correspondente, nunca diretamente de `main`:

```text
develop
  └── feat/converter
        ├── task/TASK-025-conversion-domain
        ├── task/TASK-028-data-hooks
        └── task/TASK-030-converter-feature
```

O nome previsto de cada branch está no arquivo individual da tarefa.

## 5. Pull Request workflow

### Task → Feature

1. Criar a task branch a partir da feature branch atualizada.
2. Atualizar o status individual para `IN_PROGRESS`.
3. Implementar somente o escopo.
4. Executar testes, lint, typecheck e build aplicável.
5. Criar commits semânticos e publicar a branch.
6. Abrir PR para a feature branch.
7. Revisar critérios de aceitação e evidências.
8. Integrar somente após aprovação real.
9. Atualizar task, checklist central e matriz.

### Feature → develop

Quando tarefas obrigatórias da feature estiverem `DONE`, abrir PR com testes completos, dependências, critérios do PRD e documentação atualizados. Não afirmar merge sem confirmação real.

### develop → main

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
docs(tasks): update TASK-030 completion status
```

Commits devem ser pequenos, objetivos, sem arquivos temporários ou segredos, e podem incluir `TASK-XXX` no corpo/rodapé para rastreabilidade.

## 7. Quality gates e sincronização

Cada task individual deve registrar resultado de `lint`, `typecheck`, testes e build aplicáveis. A checklist central só muda para `[x]` quando:

1. código está implementado;
2. critérios de aceitação foram verificados;
3. testes e gates passaram;
4. documentação foi atualizada;
5. PR foi aprovado e integrado de forma confirmada.

Enquanto qualquer uma dessas condições faltar, o status permanece `TODO`, `IN_PROGRESS`, `BLOCKED` ou `IN_REVIEW`.

## 8. Próxima tarefa recomendada

**TASK-001 — Auditar baseline e normalizar scripts.** É a primeira tarefa elegível porque o repositório ainda está no template mínimo, os scripts de teste/typecheck não existem e todas as demais fases dependem de uma base verificável.

## 9. Pendências de planejamento

- Confirmar limite de entrada, período inicial e tema claro com produto/design.
- Confirmar política de datas repetidas e necessidade de `date-fns`.
- Confirmar browsers e execução E2E no CI.
- Verificar acesso real ao remoto antes de publicar branches ou abrir PRs.
- Atualizar status somente com evidências reais de implementação e integração.
