### TASK-028 — Implementar hooks de dados e cancelamento

**Metadata**

- ID: TASK-028
- Feature: Data hooks
- Phase: Phase 5 — Hooks & Business Logic
- Type: Hook
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-020, TASK-021, TASK-022, TASK-023, TASK-024, TASK-026
- Branch: `dev`
- PRD References: RF-001, RF-009, RF-017, RF-020, RF-025, RNF-008, RNF-009
- TECH References: TECH-005, TECH-008, TECH-011
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Conectar services ao ciclo de vida React com loading, erro, retry e resposta obsoleta.

### 2. Context

Trocas rápidas de par/período não podem exibir resposta de outro contexto.

### 3. Scope

`useCurrencies`, `useExchangeRate`, `useRateHistory` e chave de request. Não compor a UI final.

### 4. Implementation Steps

- [x] Criar estados request e retry.
- [x] Criar/cancelar AbortController em mudanças.
- [x] Comparar chave vigente antes de aplicar resposta.
- [x] Tratar vazio/stale/error separadamente.
- [x] Criar testes com MSW e delays.

### 5. Expected Files

`src/features/*/hooks/`, `src/shared/types/requests.ts`, testes.

### 6. Acceptance Criteria

- Resposta antiga não sobrescreve contexto novo.
- Digitação do valor não dispara consulta de taxa.
- Retry respeita classe de erro.

### 7. Testing Requirements

Loading, sucesso, vazio, 4xx/5xx, timeout, cancelamento e corrida de requests.

### 8. Definition of Done

- [x] Hooks concluídos.
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

Hooks de catálogo, cotação e histórico implementados com AbortController, retry, estados loading/error/empty/stale e proteção contra resposta obsoleta.
