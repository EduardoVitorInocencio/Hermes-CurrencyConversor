### TASK-022 — Implementar serviço de histórico

**Metadata**

- ID: TASK-022
- Feature: Exchange history
- Phase: Phase 4 — Services & Data Layer
- Type: Service
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-019, TASK-020
- Branch: `dev`
- PRD References: RF-017, RF-018, RF-020, RF-021, RN-012, RN-020, RNF-020
- TECH References: TECH-005, TECH-008
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Consultar `/rates` para um par e intervalo e devolver registros internos validáveis.

### 2. Context

Gráfico e tabela devem consumir a mesma série e preservar lacunas reais.

### 3. Scope

Request com `from`, `to`, `base`, `quotes`, transformação de array e erro. Cálculo do intervalo fica na TASK-026.

### 4. Implementation Steps

- [x] Implementar parâmetros e serialização.
- [x] Aceitar somente array de registros válidos após validação.
- [x] Preservar datas sem publicação como lacunas.
- [x] Propagar cancelamento.
- [x] Criar fixtures de curto e longo período.

### 5. Expected Files

`src/features/history/api/historyApi.ts`, `types/history.ts`, fixtures e testes.

### 6. Acceptance Criteria

- Série pertence ao par e intervalo solicitados.
- Resposta vazia vira estado vazio, não dado de fallback.

### 7. Testing Requirements

Parâmetros, array vazio, registros inválidos, HTTP, timeout e séries longas.

### 8. Definition of Done

- [x] Serviço concluído.
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

Serviço `/rates` implementado com parâmetros de par/período, série plana validada, ordenação canônica, vazio honesto e cancelamento.
