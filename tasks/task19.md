### TASK-019 — Implementar cliente Axios e erros normalizados

**Metadata**

- ID: TASK-019
- Feature: API/data layer
- Phase: Phase 4 — Services & Data Layer
- Type: Service
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-002, TASK-006
- Branch: `dev`
- PRD References: RF-009, RF-015, RNF-008, RNF-009, RNF-010, RNF-015
- TECH References: TECH-005
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Criar cliente HTTP configurável com timeout, cancelamento e erro interno consistente.

### 2. Context

Todas as consultas dependem de uma camada única; endpoints não devem aparecer em componentes.

### 3. Scope

Axios client, timeout, headers, `AbortSignal` e normalização de 400/404/422/5xx/timeout/rede.

### 4. Implementation Steps

- [x] Adicionar Axios e URL pública.
- [x] Configurar timeout e Accept.
- [x] Definir tipos de erro.
- [x] Propagar cancelamento.
- [x] Criar testes de erro.

### 5. Expected Files

`src/shared/lib/api/axiosClient.ts`, `src/shared/lib/api/errors.ts`, `.env.example`, testes.

### 6. Acceptance Criteria

- Cliente não contém segredo.
- Erros são categorizados sem expor detalhes indevidos.
- Abort não aparece como erro de usuário.

### 7. Testing Requirements

Mockar status e timeout com MSW/Axios; verificar retry somente onde permitido.

### 8. Definition of Done

- [x] Cliente concluído.
- [x] Critérios atendidos.
- [x] Testes/gates aprovados.
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

Axios configurado com base URL pública, timeout de 10s, Accept JSON, signal e normalização de HTTP, rede, timeout e cancelamento.
