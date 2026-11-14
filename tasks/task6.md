### TASK-006 — Preparar ambiente, providers e shell inicial

**Metadata**

- ID: TASK-006
- Feature: Setup
- Phase: Phase 0 — Repository Setup
- Type: Setup
- Priority: P0
- Status: TODO
- Dependencies: TASK-002, TASK-003
- Branch: `task/TASK-006-app-shell-bootstrap` a partir de `chore/project-setup`
- PRD References: RNF-001, RNF-017
- TECH References: TECH-001, TECH-004

### 1. Objective

Preparar os pontos de entrada e configuração pública necessários à arquitetura-alvo.

### 2. Context

Os arquivos de entrada estão na raiz de `src`, enquanto a arquitetura futura usa `app/` e estilos dedicados.

### 3. Scope

Criar providers/configuração mínima, mover entradas somente se seguro e definir `.env.example`. Não criar layout final.

### 4. Implementation Steps

- [ ] Definir `VITE_FRANKFURTER_API_URL` público de exemplo.
- [ ] Organizar `App`/`main` sem quebrar o template.
- [ ] Preparar ponto de montagem de estilos e providers.
- [ ] Remover somente artefatos não usados após validação.
- [ ] Rodar todos os gates.

### 5. Expected Files

`.env.example`, `src/app/App.tsx`, `src/app/main.tsx`, `src/main.tsx`, `src/App.tsx`.

### 6. Acceptance Criteria

- Aplicação inicia e gera build.
- Variável pública é documentada sem segredo.
- Nenhuma feature é simulada com dados fictícios.

### 7. Testing Requirements

Dev server, lint, typecheck, unit smoke, E2E smoke e build.

### 8. Definition of Done

- [ ] Shell preparado.
- [ ] Critérios atendidos.
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
