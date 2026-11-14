### TASK-017 — Implementar containers e layout responsivo

**Metadata**

- ID: TASK-017
- Feature: Application layout
- Phase: Phase 3 — Application Layout
- Type: Feature
- Priority: P0
- Status: TODO
- Dependencies: TASK-016, TASK-008
- Branch: `task/TASK-017-responsive-containers` a partir de `feat/application-layout`
- PRD References: RNF-003, RNF-018
- TECH References: TECH-004

### 1. Objective

Garantir composição mobile-first, containers e grades sem rolagem horizontal geral.

### 2. Context

O produto exige 375/390/430/768/1024/1280/1440 px com tabela podendo ter overflow próprio.

### 3. Scope

Containers, grids, gaps, sidebar desktop e empilhamento mobile. Não estilizar conteúdo específico de feature.

### 4. Implementation Steps

- [ ] Definir largura máxima e padding responsivo.
- [ ] Compor grades de duas/quatro colunas conforme viewport.
- [ ] Tratar overflow de tabela isoladamente.
- [ ] Validar controles de toque.
- [ ] Registrar exceções de tablet.

### 5. Expected Files

`src/shared/components/layout/`, estilos globais e testes visuais.

### 6. Acceptance Criteria

- Nenhum viewport gera scroll horizontal na página.
- Conteúdo essencial permanece visível e ordenado.

### 7. Testing Requirements

Screenshots/Playwright nos sete viewports, lint/build.

### 8. Definition of Done

- [ ] Layout concluído.
- [ ] Critérios atendidos.
- [ ] Validações aprovadas.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `feat/application-layout`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
