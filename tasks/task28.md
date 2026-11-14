### TASK-028 — Implementar hooks de dados e cancelamento

**Metadata**

- ID: TASK-028
- Feature: Data hooks
- Phase: Phase 5 — Hooks & Business Logic
- Type: Hook
- Priority: P0
- Status: TODO
- Dependencies: TASK-020, TASK-021, TASK-022, TASK-023, TASK-024, TASK-026
- Branch: `task/TASK-028-data-hooks` a partir de `feat/api-data-layer`
- PRD References: RF-001, RF-009, RF-017, RF-020, RF-025, RNF-008, RNF-009
- TECH References: TECH-005, TECH-008, TECH-011

### 1. Objective

Conectar services ao ciclo de vida React com loading, erro, retry e resposta obsoleta.

### 2. Context

Trocas rápidas de par/período não podem exibir resposta de outro contexto.

### 3. Scope

`useCurrencies`, `useExchangeRate`, `useRateHistory` e chave de request. Não compor a UI final.

### 4. Implementation Steps

- [ ] Criar estados request e retry.
- [ ] Criar/cancelar AbortController em mudanças.
- [ ] Comparar chave vigente antes de aplicar resposta.
- [ ] Tratar vazio/stale/error separadamente.
- [ ] Criar testes com MSW e delays.

### 5. Expected Files

`src/features/*/hooks/`, `src/shared/types/requests.ts`, testes.

### 6. Acceptance Criteria

- Resposta antiga não sobrescreve contexto novo.
- Digitação do valor não dispara consulta de taxa.
- Retry respeita classe de erro.

### 7. Testing Requirements

Loading, sucesso, vazio, 4xx/5xx, timeout, cancelamento e corrida de requests.

### 8. Definition of Done

- [ ] Hooks concluídos.
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
