### TASK-016 — Implementar AppShell e navegação de seções

**Metadata**

- ID: TASK-016
- Feature: Application layout
- Phase: Phase 3 — Application Layout
- Type: Feature
- Priority: P1
- Status: IN_REVIEW
- Dependencies: TASK-006, TASK-015
- Branch: `dev`
- PRD References: RF-039, RNF-003, RNF-004, RNF-018
- TECH References: TECH-004
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Criar shell semântico com navegação Conversor, Histórico e Relatórios.

### 2. Context

O Figma mostra sidebar desktop e navegação adaptada no mobile; a ordem de conteúdo é produto.

### 3. Scope

Landmarks, seção ativa, sidebar/topbar/mobile navigation e placeholders sem dados fictícios.

### 4. Implementation Steps

- [x] Definir landmarks e heading principal.
- [x] Compor navegação com estados ativo/foco.
- [x] Adaptar sidebar para mobile.
- [x] Conectar navegação a seções sem recarga.
- [x] Testar teclado.

### 5. Expected Files

`src/shared/components/layout/`, `src/app/App.tsx`, testes.

### 6. Acceptance Criteria

- Navegação é operável por mouse/teclado e identifica seção ativa.
- Estrutura não usa valores de cotação demonstrativos.

### 7. Testing Requirements

Testing Library para navegação, landmarks, foco e viewport mobile.

### 8. Definition of Done

- [x] Shell concluído.
- [x] Critérios atendidos.
- [x] Testes/gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `feat(app): add responsive app shell`.
- Pull Request: não aberto.
- Branch de destino: não aplicável; fluxo solicitado sem PR.
- Status do merge: não aplicável.

### 10. Completion Notes

AppShell responsivo implementado com sidebar desktop, navegação móvel, landmarks, heading principal, foco e estado ativo. Conversor, Histórico e Relatórios alternam sem recarga e exibem apenas placeholders informativos. Validações finais: lint, typecheck, 29 testes, build e E2E aprovados.
