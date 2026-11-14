### TASK-022 — Implementar serviço de histórico

**Metadata**

- ID: TASK-022
- Feature: Exchange history
- Phase: Phase 4 — Services & Data Layer
- Type: Service
- Priority: P0
- Status: TODO
- Dependencies: TASK-019, TASK-020
- Branch: `task/TASK-022-history-service` a partir de `feat/api-data-layer`
- PRD References: RF-017, RF-018, RF-020, RF-021, RN-012, RN-020, RNF-020
- TECH References: TECH-005, TECH-008

### 1. Objective

Consultar `/rates` para um par e intervalo e devolver registros internos validáveis.

### 2. Context

Gráfico e tabela devem consumir a mesma série e preservar lacunas reais.

### 3. Scope

Request com `from`, `to`, `base`, `quotes`, transformação de array e erro. Cálculo do intervalo fica na TASK-026.

### 4. Implementation Steps

- [ ] Implementar parâmetros e serialização.
- [ ] Aceitar somente array de registros válidos após validação.
- [ ] Preservar datas sem publicação como lacunas.
- [ ] Propagar cancelamento.
- [ ] Criar fixtures de curto e longo período.

### 5. Expected Files

`src/features/history/api/historyApi.ts`, `types/history.ts`, fixtures e testes.

### 6. Acceptance Criteria

- Série pertence ao par e intervalo solicitados.
- Resposta vazia vira estado vazio, não dado de fallback.

### 7. Testing Requirements

Parâmetros, array vazio, registros inválidos, HTTP, timeout e séries longas.

### 8. Definition of Done

- [ ] Serviço concluído.
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
