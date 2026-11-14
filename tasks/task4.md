### TASK-004 — Configurar Vitest, Testing Library e MSW

**Metadata**

- ID: TASK-004
- Feature: Quality gates
- Phase: Phase 0 — Repository Setup
- Type: Test
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-001
- Branch: `dev`
- PRD References: RNF-013, RNF-017
- TECH References: TECH-001, TECH-016
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Criar a base para testes unitários, de componentes e de integração com rede simulada.

### 2. Context

O repositório não tem runner, setup de DOM ou mocks de HTTP.

### 3. Scope

Dependências, configuração, setup global e um teste mínimo de fumaça. Não cobre features de negócio.

### 4. Implementation Steps

- [x] Adicionar Vitest, Testing Library e MSW compatíveis.
- [x] Configurar ambiente DOM e `src/test/setup.ts`.
- [x] Criar scripts `test` e `test:coverage`.
- [x] Criar teste de fumaça e handler de exemplo.
- [x] Executar testes, lint, typecheck e build.

### 5. Expected Files

`package.json`, `vite.config.ts`, `src/test/setup.ts`, `src/test/mocks/` e um teste inicial.

### 6. Acceptance Criteria

- Testes executam em modo CI e watch.
- MSW pode interceptar chamadas sem depender da rede real.
- Coverage pode ser gerado sem mascarar falhas.

### 7. Testing Requirements

Teste de fumaça aprovado, além de lint/typecheck/build.

### 8. Definition of Done

- [x] Stack de teste configurada.
- [x] Teste de fumaça aprovado.
- [x] Gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: commit local atual — `test(setup): configure Vitest and MSW`.
- Pull Request: não aberto, conforme solicitado.
- Branch de destino: `dev`.
- Status do merge: não aplicável; integração via PR não será realizada.

### 10. Completion Notes

Stack de testes configurada com Vitest `5.1.0`, Testing Library, jsdom `31.0.1`, MSW `3.0.5` e cobertura V8. O setup global configura cleanup do DOM e o servidor MSW; o teste de fumaça cobre o heading do starter e o teste de integração confirma uma resposta HTTP interceptada sem rede real.

Validação em 14/11/2026: `npm run test` passou com 2 arquivos e 2 testes; `npm run test:coverage` passou com relatório V8; `npm run lint` passou sem warnings após ignorar `coverage/`; `npm run typecheck` e `npm run build` passaram. A instalação do npm reportou 7 vulnerabilidades moderadas; nenhuma correção forçada foi aplicada nesta tarefa.
