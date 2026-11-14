### TASK-002 — Configurar TypeScript estrito e aliases

**Metadata**

- ID: TASK-002
- Feature: Setup
- Phase: Phase 0 — Repository Setup
- Type: Setup
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-001
- Branch: `dev`
- PRD References: RNF-001, RNF-002, RNF-016
- TECH References: TECH-001

### 1. Objective

Habilitar tipagem estrita e imports previsíveis para a estrutura por features.

### 2. Context

Os contratos de API e props exigem TypeScript estrito; aliases ainda não existem.

### 3. Scope

Configurar `strict`, regras de não uso, alias `@/*` e resolução compatível com Vite. Não migrar componentes.

### 4. Implementation Steps

- [x] Revisar `tsconfig.app.json` e regras existentes.
- [x] Configurar opções estritas sem mascarar erros.
- [x] Configurar alias no TypeScript e Vite.
- [x] Documentar o uso do alias.
- [x] Rodar typecheck, lint e build.

### 5. Expected Files

`tsconfig.app.json`, `vite.config.ts`, `README.md`.

### 6. Acceptance Criteria

- `strict` e aliases funcionam no editor, typecheck e build.
- Não há `any` implícito introduzido.

### 7. Testing Requirements

Typecheck limpo e build concluído; validar um import com alias em fixture temporária se necessário.

### 8. Definition of Done

- [x] Configuração concluída.
- [x] Critérios atendidos.
- [x] Typecheck/lint/build aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: commit local atual — `chore(setup): configure TypeScript aliases`.
- Pull Request: não aberto, conforme solicitado.
- Branch de destino: `dev`.
- Status do merge: não aplicável; integração via PR não será realizada.

### 10. Completion Notes

Configuração implementada em `tsconfig.app.json`, `tsconfig.node.json` e `vite.config.ts`: `strict` habilitado, regras de não uso preservadas, alias `@/*` apontando para `src/*` e resolução equivalente no Vite. Nenhum componente foi migrado e nenhum `any` implícito foi introduzido.

Validação em 14/11/2026: `npm run lint` passou; `npm run typecheck` passou, incluindo fixture temporária de `@/App`; `npm run test` passou com 0 testes descobertos; `npm run build` passou com typecheck e bundle Vite de produção. A fixture foi removida após a validação.
