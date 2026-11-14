### TASK-019 — Implementar cliente Axios e erros normalizados

**Metadata**

- ID: TASK-019
- Feature: API/data layer
- Phase: Phase 4 — Services & Data Layer
- Type: Service
- Priority: P0
- Status: TODO
- Dependencies: TASK-002, TASK-006
- Branch: `task/TASK-019-axios-client` a partir de `feat/api-data-layer`
- PRD References: RF-009, RF-015, RNF-008, RNF-009, RNF-010, RNF-015
- TECH References: TECH-005

### 1. Objective

Criar cliente HTTP configurável com timeout, cancelamento e erro interno consistente.

### 2. Context

Todas as consultas dependem de uma camada única; endpoints não devem aparecer em componentes.

### 3. Scope

Axios client, timeout, headers, `AbortSignal` e normalização de 400/404/422/5xx/timeout/rede.

### 4. Implementation Steps

- [ ] Adicionar Axios e URL pública.
- [ ] Configurar timeout e Accept.
- [ ] Definir tipos de erro.
- [ ] Propagar cancelamento.
- [ ] Criar testes de erro.

### 5. Expected Files

`src/shared/lib/api/axiosClient.ts`, `src/shared/lib/api/errors.ts`, `.env.example`, testes.

### 6. Acceptance Criteria

- Cliente não contém segredo.
- Erros são categorizados sem expor detalhes indevidos.
- Abort não aparece como erro de usuário.

### 7. Testing Requirements

Mockar status e timeout com MSW/Axios; verificar retry somente onde permitido.

### 8. Definition of Done

- [ ] Cliente concluído.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `feat/api-data-layer`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
