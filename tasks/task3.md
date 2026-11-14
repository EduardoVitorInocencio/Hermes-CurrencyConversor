### TASK-003 — Configurar Tailwind CSS v4 e pipeline de estilos

**Metadata**

- ID: TASK-003
- Feature: Setup
- Phase: Phase 0 — Repository Setup
- Type: Setup
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-001
- Branch: `dev`
- PRD References: RNF-003, RNF-018
- TECH References: TECH-001, TECH-002

### 1. Objective

Preparar Tailwind v4 para consumir tokens HERMES sem substituir a identidade visual.

### 2. Context

Tailwind ainda não está instalado e o PRD exige v4 como sistema de estilos.

### 3. Scope

Instalação/configuração mínima e integração com Vite. Tokens efetivos ficam na TASK-007.

### 4. Implementation Steps

- [x] Verificar compatibilidade de Node e dependências.
- [x] Adicionar Tailwind v4 e plugin/configuração necessária.
- [x] Integrar entrada CSS ao Vite.
- [x] Validar uma classe de teste sem alterar a UI final.
- [x] Rodar build e lint.

### 5. Expected Files

`package.json`, `package-lock.json`, `vite.config.ts`, `src/index.css` ou `src/app/styles/globals.css`.

### 6. Acceptance Criteria

- Tailwind v4 compila no build.
- Nenhuma cor genérica é adotada como token HERMES.

### 7. Testing Requirements

Build e lint; verificar que CSS de produção é gerado sem erro.

### 8. Definition of Done

- [x] Configuração concluída.
- [x] Critérios atendidos.
- [x] Gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: commit local atual — `chore(setup): add Tailwind v4 pipeline`.
- Pull Request: não aberto, conforme solicitado.
- Branch de destino: `dev`.
- Status do merge: não aplicável; integração via PR não será realizada.

### 10. Completion Notes

Tailwind CSS `4.3.5` e `@tailwindcss/vite` `4.3.5` foram adicionados como dependências de desenvolvimento. O plugin foi integrado ao `vite.config.ts` e `src/index.css` importa `tailwindcss`. Nenhum token HERMES ou classe de produto foi introduzido; a definição visual fica para TASK-007.

Validação em 14/11/2026 com Node `24.22.1`: `npm run lint` passou; `npm run typecheck` passou; `npm run build` passou e gerou CSS de produção. Uma fixture temporária com `text-red-500` confirmou a geração da utility e foi removida antes do estado final. A instalação do npm reportou 7 vulnerabilidades moderadas no conjunto de dependências; nenhuma correção forçada foi aplicada nesta tarefa.
