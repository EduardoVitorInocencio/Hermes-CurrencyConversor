### TASK-021 — Implementar serviço de cotação do par

**Metadata**

- ID: TASK-021
- Feature: Exchange quote
- Phase: Phase 4 — Services & Data Layer
- Type: Service
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-019, TASK-020
- Branch: `dev`
- PRD References: RF-009, RF-012, RF-015, RF-043, RN-001, RN-004, RN-011
- TECH References: TECH-005, TECH-007
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Consultar e tipar uma cotação de par no endpoint v2 individual.

### 2. Context

A API não oferece conversão pronta; o cliente precisa receber taxa e data para calcular localmente.

### 3. Scope

`getExchangeRate(base, quote, signal)`, DTO, validação básica e erros. Cálculo fica na TASK-025.

### 4. Implementation Steps

- [x] Implementar rota codificada `/rate/{base}/{quote}`.
- [x] Normalizar código para maiúsculas na borda.
- [x] Validar data/taxa/base/quote.
- [x] Propagar signal e erro normalizado.
- [x] Criar fixtures e testes.

### 5. Expected Files

`src/features/exchange/api/exchangeApi.ts`, `types/exchange.ts`, fixtures e testes.

### 6. Acceptance Criteria

- Retorno identifica par, taxa e data efetiva.
- Erro ou taxa inválida não chega ao cálculo como sucesso.

### 7. Testing Requirements

200, 400, 404, 422, 500, timeout, JSON inválido e cancelamento.

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

Serviço v2 de par implementado com códigos normalizados, validação estrita de data/taxa, cancelamento e fixtures.
