### TASK-020 — Implementar serviço e adaptador de moedas

**Metadata**

- ID: TASK-020
- Feature: Currency catalog
- Phase: Phase 4 — Services & Data Layer
- Type: Service
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-019
- Branch: `dev`
- PRD References: RF-001, RF-002, RF-003, RF-005, RN-027, RN-033
- TECH References: TECH-005, TECH-006
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Consultar `/currencies` e adaptar o payload v2 para opções internas.

### 2. Context

A fonte v2 usa objetos com `iso_code`, `name` e `symbol`; não se deve reutilizar contrato da v1.

### 3. Scope

DTO, adapter, ordenação/busca de opções e serviço. UI fica para TASK-030.

### 4. Implementation Steps

- [x] Definir `CurrencyDTO` e `CurrencyOption`.
- [x] Implementar request e adapter.
- [x] Rejeitar código/nome inválidos.
- [x] Ordenar de modo determinístico.
- [x] Criar fixture realista e testes.

### 5. Expected Files

`src/features/currencies/api/currenciesApi.ts`, `types/currency.ts`, adapter, fixtures e testes.

### 6. Acceptance Criteria

- Catálogo vem da fonte.
- Códigos são normalizados sem perder nome/símbolo.
- Payload inválido não vira opção silenciosa.

### 7. Testing Requirements

Sucesso, array vazio, campos ausentes e erro HTTP com MSW.

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

Catálogo v2 adaptado com validação de `iso_code`, nome, símbolo, ordenação e cache de 24h; fixtures e testes cobrem sucesso e payload inválido.
