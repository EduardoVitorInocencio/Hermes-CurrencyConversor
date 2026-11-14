### TASK-001 — Auditar baseline e normalizar scripts

**Metadata**

- ID: TASK-001
- Feature: Setup
- Phase: Phase 0 — Repository Setup
- Type: Setup
- Priority: P0
- Status: IN_REVIEW
- Dependencies: —
- Branch: `dev`
- PRD References: RNF-001, RNF-016, RNF-017
- TECH References: TECH-001

### 1. Objective

Registrar o estado real do template, scripts disponíveis e comandos mínimos de qualidade.

### 2. Context

O repositório tem Vite/React/TypeScript mínimos, sem test/typecheck scripts e sem arquitetura de feature.

### 3. Scope

Inclui auditoria, scripts `dev`, `build`, `lint`, `typecheck`, `test` e documentação do baseline. Não inclui features de produto.

### 4. Implementation Steps

- [x] Auditar `package.json`, TypeScript, ESLint e arquivos de entrada.
- [x] Definir scripts mínimos sem esconder falhas.
- [x] Registrar versões e comandos disponíveis.
- [x] Executar lint, typecheck e build.
- [x] Atualizar evidências da tarefa.

### 5. Expected Files

`package.json`, `README.md`, possivelmente `tsconfig*.json`.

### 6. Acceptance Criteria

- Scripts previstos existem e têm comportamento verificável.
- Baseline e gaps estão registrados.
- Nenhuma feature de produto foi introduzida.

### 7. Testing Requirements

Executar `npm run lint`, `npm run typecheck` e `npm run build`; registrar resultados.

### 8. Definition of Done

- [x] Implementação concluída.
- [x] Critérios atendidos.
- [x] Testes/gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist central sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: commit local atual — `chore(setup): configure TypeScript aliases`.
- Pull Request: não aberto, conforme solicitado.
- Branch de destino: `dev`.
- Status do merge: não aplicável; integração via PR não será realizada.

### 10. Completion Notes

Baseline auditado: o template inicial já possuía `dev`, `build`, `lint` e `preview`, mas não possuía `typecheck` nem `test`. Foram adicionados `typecheck` com `tsc --noEmit` para os projetos app/node e `test` com o runner nativo do Node; `build` passou a executar `typecheck` antes do bundle Vite, evitando a escrita de `tsbuildinfo` em `node_modules/.tmp` observada no ambiente.

Validação em 14/11/2026: `npm run lint` passou; `npm run typecheck` passou; `npm run test` passou com 0 testes descobertos; `npm run build` passou com typecheck e bundle Vite de produção. A execução final do build exigiu permissão fora da sandbox porque o Vite escreve seu arquivo temporário em `node_modules/.vite-temp`.

Não foram introduzidas features de produto. A implementação continua no template inicial e os gaps de arquitetura, dependências de produto e suíte de testes permanecem para as tarefas posteriores.
