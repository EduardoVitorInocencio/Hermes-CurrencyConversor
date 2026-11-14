### TASK-020 — Implementar serviço e adaptador de moedas

**Metadata**

- ID: TASK-020
- Feature: Currency catalog
- Phase: Phase 4 — Services & Data Layer
- Type: Service
- Priority: P0
- Status: TODO
- Dependencies: TASK-019
- Branch: `task/TASK-020-currencies-service` a partir de `feat/api-data-layer`
- PRD References: RF-001, RF-002, RF-003, RF-005, RN-027, RN-033
- TECH References: TECH-005, TECH-006

### 1. Objective

Consultar `/currencies` e adaptar o payload v2 para opções internas.

### 2. Context

A fonte v2 usa objetos com `iso_code`, `name` e `symbol`; não se deve reutilizar contrato da v1.

### 3. Scope

DTO, adapter, ordenação/busca de opções e serviço. UI fica para TASK-030.

### 4. Implementation Steps

- [ ] Definir `CurrencyDTO` e `CurrencyOption`.
- [ ] Implementar request e adapter.
- [ ] Rejeitar código/nome inválidos.
- [ ] Ordenar de modo determinístico.
- [ ] Criar fixture realista e testes.

### 5. Expected Files

`src/features/currencies/api/currenciesApi.ts`, `types/currency.ts`, adapter, fixtures e testes.

### 6. Acceptance Criteria

- Catálogo vem da fonte.
- Códigos são normalizados sem perder nome/símbolo.
- Payload inválido não vira opção silenciosa.

### 7. Testing Requirements

Sucesso, array vazio, campos ausentes e erro HTTP com MSW.

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
