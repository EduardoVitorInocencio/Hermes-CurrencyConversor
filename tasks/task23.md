### TASK-023 — Validar DTOs, normalizar dados e definir cache

**Metadata**

- ID: TASK-023
- Feature: API/data layer
- Phase: Phase 4 — Services & Data Layer
- Type: Service
- Priority: P0
- Status: TODO
- Dependencies: TASK-020, TASK-021, TASK-022
- Branch: `task/TASK-023-validation-cache` a partir de `feat/api-data-layer`
- PRD References: RF-005, RF-015, RF-017, RN-017, RN-029, RN-030, RN-033, RNF-008–RNF-010
- TECH References: TECH-005, TECH-006, TECH-007, TECH-008

### 1. Objective

Centralizar validação, normalização, resposta obsoleta e política de cache local.

### 2. Context

Payloads externos e fontes blended precisam ser tratados com honestidade.

### 3. Scope

Schemas/adapters, ordenação canônica, deduplicação decidida, chaves de cache e TTL proposto. Não alterar API externa.

### 4. Implementation Steps

- [ ] Definir validações de data, códigos e taxa finita/positiva.
- [ ] Definir política para registros repetidos e documentá-la.
- [ ] Implementar cache curto somente se aprovado.
- [ ] Garantir que mocks ficam restritos a teste/desenvolvimento.
- [ ] Cobrir respostas blended sem chamar ECB indevidamente.

### 5. Expected Files

`src/shared/lib/validation/`, `src/shared/lib/cache/`, adapters, testes e documentação técnica.

### 6. Acceptance Criteria

- Dados inválidos não são renderizados.
- Cache não serve contexto de par/período errado.
- Atribuição de fonte permanece “Frankfurter/fontes oficiais” por padrão.

### 7. Testing Requirements

Fixtures válidas/inválidas, cache hit/miss/expiração, chaves distintas e resposta tardia.

### 8. Definition of Done

- [ ] Validação/cache concluídos.
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

Não iniciada; registrar decisão TD-003 e política final de cache.
