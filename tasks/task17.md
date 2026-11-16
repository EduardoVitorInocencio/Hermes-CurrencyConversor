### TASK-017 — Implementar containers e layout responsivo

**Metadata**

- ID: TASK-017
- Feature: Application layout
- Phase: Phase 3 — Application Layout
- Type: Feature
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-016, TASK-008
- Branch: `dev`
- PRD References: RNF-003, RNF-018
- TECH References: TECH-004
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Garantir composição mobile-first, containers e grades sem rolagem horizontal geral.

### 2. Context

O produto exige 375/390/430/768/1024/1280/1440 px com tabela podendo ter overflow próprio.

### 3. Scope

Containers, grids, gaps, sidebar desktop e empilhamento mobile. Não estilizar conteúdo específico de feature.

### 4. Implementation Steps

- [x] Definir largura máxima e padding responsivo.
- [x] Compor grades de duas/quatro colunas conforme viewport.
- [x] Tratar overflow de tabela isoladamente.
- [x] Validar controles de toque.
- [x] Registrar exceções de tablet.

### 5. Expected Files

`src/shared/components/layout/`, estilos globais e testes visuais.

### 6. Acceptance Criteria

- Nenhum viewport gera scroll horizontal na página.
- Conteúdo essencial permanece visível e ordenado.

### 7. Testing Requirements

Screenshots/Playwright nos sete viewports, lint/build.

### 8. Definition of Done

- [x] Layout concluído.
- [x] Critérios atendidos.
- [x] Validações aprovadas.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `feat(app): complete remaining exchange workflow`.
- Pull Request: não aberto.
- Branch de destino: não aplicável; fluxo solicitado sem PR.
- Status do merge: não aplicável.

### 10. Completion Notes

Containers responsivos, grades, sidebar desktop, navegação móvel e overflow isolado da tabela implementados. Viewports críticos não geram rolagem horizontal geral.
