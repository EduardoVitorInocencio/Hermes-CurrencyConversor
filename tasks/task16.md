### TASK-016 — Implementar AppShell e navegação de seções

**Metadata**

- ID: TASK-016
- Feature: Application layout
- Phase: Phase 3 — Application Layout
- Type: Feature
- Priority: P1
- Status: TODO
- Dependencies: TASK-006, TASK-015
- Branch: `task/TASK-016-app-shell-navigation` a partir de `feat/application-layout`
- PRD References: RF-039, RNF-003, RNF-004, RNF-018
- TECH References: TECH-004

### 1. Objective

Criar shell semântico com navegação Conversor, Histórico e Relatórios.

### 2. Context

O Figma mostra sidebar desktop e navegação adaptada no mobile; a ordem de conteúdo é produto.

### 3. Scope

Landmarks, seção ativa, sidebar/topbar/mobile navigation e placeholders sem dados fictícios.

### 4. Implementation Steps

- [ ] Definir landmarks e heading principal.
- [ ] Compor navegação com estados ativo/foco.
- [ ] Adaptar sidebar para mobile.
- [ ] Conectar navegação a seções sem recarga.
- [ ] Testar teclado.

### 5. Expected Files

`src/shared/components/layout/`, `src/app/App.tsx`, testes.

### 6. Acceptance Criteria

- Navegação é operável por mouse/teclado e identifica seção ativa.
- Estrutura não usa valores de cotação demonstrativos.

### 7. Testing Requirements

Testing Library para navegação, landmarks, foco e viewport mobile.

### 8. Definition of Done

- [ ] Shell concluído.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
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
