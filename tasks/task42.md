### TASK-042 — Executar checklist de release e fechamento

**Metadata**

- ID: TASK-042
- Feature: Release readiness
- Phase: Phase 8 — Release Readiness
- Type: Documentation
- Priority: P0
- Status: TODO
- Dependencies: TASK-039, TASK-040, TASK-041
- Branch: `task/TASK-042-release-checklist` a partir de `chore/release-readiness`
- PRD References: RNF-017, RNF-019, OBJ-01–OBJ-06, CA-01–CA-10
- TECH References: TECH-016

### 1. Objective

Consolidar evidências de release e decidir se a entrega atende à Definition of Done.

### 2. Context

Uma tarefa não é concluída apenas por código escrito; gates, PR, documentação e rastreabilidade são obrigatórios.

### 3. Scope

Build de produção, lint, typecheck, testes, revisão de requisitos, matriz, changelog e preparação de release. Não publicar sem autorização.

### 4. Implementation Steps

- [ ] Executar build, lint, typecheck, unit/integration e E2E.
- [ ] Revisar CA-01 a CA-10 e DoD P0.
- [ ] Confirmar links e status de tasks.
- [ ] Registrar riscos/pendências restantes.
- [ ] Preparar PR de release para `main` somente se aprovado.

### 5. Expected Files

`PRD_SPEC.md`, `TECH_SPEC.md`, `TASKs_SPEC.md`, `tasks/task*.md`, `README.md` e evidências de CI.

### 6. Acceptance Criteria

- Todos os gates e critérios têm evidência.
- Nenhuma tarefa aparece concluída sem PR/merge confirmados.
- Pendências são explícitas e não mascaradas.

### 7. Testing Requirements

Suite completa, build de produção e revisão visual/funcional final.

### 8. Definition of Done

- [ ] Checklist de release concluído.
- [ ] Critérios atendidos.
- [ ] Todos os gates aprovados.
- [ ] Documentação sincronizada.
- [ ] PR de release revisado e integrado, se autorizado.
- [ ] Checklist central atualizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `main` somente via release aprovada.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada. Não marcar como concluída por antecipação.
