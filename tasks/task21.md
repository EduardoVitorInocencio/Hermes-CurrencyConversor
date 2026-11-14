### TASK-021 — Implementar serviço de cotação do par

**Metadata**

- ID: TASK-021
- Feature: Exchange quote
- Phase: Phase 4 — Services & Data Layer
- Type: Service
- Priority: P0
- Status: TODO
- Dependencies: TASK-019, TASK-020
- Branch: `task/TASK-021-rate-service` a partir de `feat/api-data-layer`
- PRD References: RF-009, RF-012, RF-015, RF-043, RN-001, RN-004, RN-011
- TECH References: TECH-005, TECH-007

### 1. Objective

Consultar e tipar uma cotação de par no endpoint v2 individual.

### 2. Context

A API não oferece conversão pronta; o cliente precisa receber taxa e data para calcular localmente.

### 3. Scope

`getExchangeRate(base, quote, signal)`, DTO, validação básica e erros. Cálculo fica na TASK-025.

### 4. Implementation Steps

- [ ] Implementar rota codificada `/rate/{base}/{quote}`.
- [ ] Normalizar código para maiúsculas na borda.
- [ ] Validar data/taxa/base/quote.
- [ ] Propagar signal e erro normalizado.
- [ ] Criar fixtures e testes.

### 5. Expected Files

`src/features/exchange/api/exchangeApi.ts`, `types/exchange.ts`, fixtures e testes.

### 6. Acceptance Criteria

- Retorno identifica par, taxa e data efetiva.
- Erro ou taxa inválida não chega ao cálculo como sucesso.

### 7. Testing Requirements

200, 400, 404, 422, 500, timeout, JSON inválido e cancelamento.

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
