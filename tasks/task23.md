### TASK-023 — Validar DTOs, normalizar dados e definir cache

**Metadata**

- ID: TASK-023
- Feature: API/data layer
- Phase: Phase 4 — Services & Data Layer
- Type: Service
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-020, TASK-021, TASK-022
- Branch: `dev`
- PRD References: RF-005, RF-015, RF-017, RN-017, RN-029, RN-030, RN-033, RNF-008–RNF-010
- TECH References: TECH-005, TECH-006, TECH-007, TECH-008
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Centralizar validação, normalização, resposta obsoleta e política de cache local.

### 2. Context

Payloads externos e fontes blended precisam ser tratados com honestidade.

### 3. Scope

Schemas/adapters, ordenação canônica, deduplicação decidida, chaves de cache e TTL proposto. Não alterar API externa.

### 4. Implementation Steps

- [x] Definir validações de data, códigos e taxa finita/positiva.
- [x] Definir política para registros repetidos e documentá-la.
- [x] Implementar cache curto somente se aprovado.
- [x] Garantir que mocks ficam restritos a teste/desenvolvimento.
- [x] Cobrir respostas blended sem chamar ECB indevidamente.

### 5. Expected Files

`src/shared/lib/validation/`, `src/shared/lib/cache/`, adapters, testes e documentação técnica.

### 6. Acceptance Criteria

- Dados inválidos não são renderizados.
- Cache não serve contexto de par/período errado.
- Atribuição de fonte permanece “Frankfurter/fontes oficiais” por padrão.

### 7. Testing Requirements

Fixtures válidas/inválidas, cache hit/miss/expiração, chaves distintas e resposta tardia.

### 8. Definition of Done

- [x] Validação/cache concluídos.
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

Validação centralizada em `marketData`; duplicatas de histórico são preservadas para refletir o payload da fonte e o cache é apenas em memória, com TTL de 24h para catálogo. A atribuição permanece Frankfurter/fontes oficiais.
