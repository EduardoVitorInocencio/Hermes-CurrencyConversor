### TASK-004 — Configurar Vitest, Testing Library e MSW

**Metadata**

- ID: TASK-004
- Feature: Quality gates
- Phase: Phase 0 — Repository Setup
- Type: Test
- Priority: P0
- Status: TODO
- Dependencies: TASK-001
- Branch: `task/TASK-004-test-stack` a partir de `chore/project-setup`
- PRD References: RNF-013, RNF-017
- TECH References: TECH-001, TECH-016

### 1. Objective

Criar a base para testes unitários, de componentes e de integração com rede simulada.

### 2. Context

O repositório não tem runner, setup de DOM ou mocks de HTTP.

### 3. Scope

Dependências, configuração, setup global e um teste mínimo de fumaça. Não cobre features de negócio.

### 4. Implementation Steps

- [ ] Adicionar Vitest, Testing Library e MSW compatíveis.
- [ ] Configurar ambiente DOM e `src/test/setup.ts`.
- [ ] Criar scripts `test` e `test:coverage`.
- [ ] Criar teste de fumaça e handler de exemplo.
- [ ] Executar testes, lint, typecheck e build.

### 5. Expected Files

`package.json`, `vite.config.ts`, `src/test/setup.ts`, `src/test/mocks/` e um teste inicial.

### 6. Acceptance Criteria

- Testes executam em modo CI e watch.
- MSW pode interceptar chamadas sem depender da rede real.
- Coverage pode ser gerado sem mascarar falhas.

### 7. Testing Requirements

Teste de fumaça aprovado, além de lint/typecheck/build.

### 8. Definition of Done

- [ ] Stack de teste configurada.
- [ ] Teste de fumaça aprovado.
- [ ] Gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `chore/project-setup`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
