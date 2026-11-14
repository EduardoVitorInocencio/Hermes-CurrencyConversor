### TASK-006 — Preparar ambiente, providers e shell inicial

**Metadata**

- ID: TASK-006
- Feature: Setup
- Phase: Phase 0 — Repository Setup
- Type: Setup
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-002, TASK-003
- Branch: `dev`
- PRD References: RNF-001, RNF-017
- TECH References: TECH-001, TECH-004
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Preparar os pontos de entrada e configuração pública necessários à arquitetura-alvo.

### 2. Context

Os arquivos de entrada estão na raiz de `src`, enquanto a arquitetura futura usa `app/` e estilos dedicados.

### 3. Scope

Criar providers/configuração mínima, mover entradas somente se seguro e definir `.env.example`. Não criar layout final.

### 4. Implementation Steps

- [x] Definir `VITE_FRANKFURTER_API_URL` público de exemplo.
- [x] Organizar `App`/`main` sem quebrar o template.
- [x] Preparar ponto de montagem de estilos e providers.
- [x] Remover somente artefatos não usados após validação.
- [x] Rodar todos os gates.

### 5. Expected Files

`.env.example`, `src/app/App.tsx`, `src/app/main.tsx`, `src/main.tsx`, `src/App.tsx`.

### 6. Acceptance Criteria

- Aplicação inicia e gera build.
- Variável pública é documentada sem segredo.
- Nenhuma feature é simulada com dados fictícios.

### 7. Testing Requirements

Dev server, lint, typecheck, unit smoke, E2E smoke e build.

### 8. Definition of Done

- [x] Shell preparado.
- [x] Critérios atendidos.
- [x] Gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: commit local atual — `chore(app): bootstrap application shell`.
- Pull Request: não aberto, conforme solicitado.
- Branch de destino: `dev`.
- Status do merge: não aplicável; integração via PR não será realizada.

### 10. Completion Notes

Bootstrap preparado sem alterar o layout visual: `src/app/App.tsx` concentra o starter, `src/app/main.tsx` monta `StrictMode` + `AppProviders`, `src/main.tsx` delega a entrada e `src/App.tsx` mantém compatibilidade por re-export. `src/app/config/env.ts` expõe somente a configuração pública do Frankfurter, documentada em `.env.example`; `.env` e `.env.*` são ignorados, exceto o exemplo.

Validação em 14/11/2026: `npm run test` passou com 2 testes; `npm run test:e2e:ci` passou com 2 projetos; `npm run lint`, `npm run typecheck` e `npm run build` passaram. O E2E validou o servidor Vite e o app shell nos viewports desktop e mobile.
