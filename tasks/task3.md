### TASK-003 — Configurar Tailwind CSS v4 e pipeline de estilos

**Metadata**

- ID: TASK-003
- Feature: Setup
- Phase: Phase 0 — Repository Setup
- Type: Setup
- Priority: P0
- Status: TODO
- Dependencies: TASK-001
- Branch: `task/TASK-003-tailwind-pipeline` a partir de `chore/project-setup`
- PRD References: RNF-003, RNF-018
- TECH References: TECH-001, TECH-002

### 1. Objective

Preparar Tailwind v4 para consumir tokens HERMES sem substituir a identidade visual.

### 2. Context

Tailwind ainda não está instalado e o PRD exige v4 como sistema de estilos.

### 3. Scope

Instalação/configuração mínima e integração com Vite. Tokens efetivos ficam na TASK-007.

### 4. Implementation Steps

- [ ] Verificar compatibilidade de Node e dependências.
- [ ] Adicionar Tailwind v4 e plugin/configuração necessária.
- [ ] Integrar entrada CSS ao Vite.
- [ ] Validar uma classe de teste sem alterar a UI final.
- [ ] Rodar build e lint.

### 5. Expected Files

`package.json`, `package-lock.json`, `vite.config.ts`, `src/index.css` ou `src/app/styles/globals.css`.

### 6. Acceptance Criteria

- Tailwind v4 compila no build.
- Nenhuma cor genérica é adotada como token HERMES.

### 7. Testing Requirements

Build e lint; verificar que CSS de produção é gerado sem erro.

### 8. Definition of Done

- [ ] Configuração concluída.
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
