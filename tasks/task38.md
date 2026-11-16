### TASK-038 — Executar integração E2E do MVP

**Metadata**

- ID: TASK-038
- Feature: MVP integration
- Phase: Phase 7 — Integration & QA
- Type: Test
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-030, TASK-031, TASK-032, TASK-033, TASK-034, TASK-005
- Branch: `dev`
- PRD References: RF-001–RF-005, RF-008–RF-015, RF-017–RF-021, RF-026–RF-038, RF-043, CA-01–CA-08
- TECH References: TECH-012, TECH-013, TECH-014, TECH-016
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Validar os fluxos completos P0 com dados de rede simulados e download real de CSV.

### 2. Context

Unitários e componentes isolados não garantem sincronização entre conversor, histórico e exportação.

### 3. Scope

E2E de conversão, swap, oito períodos, filtros, sort/paginação, CSV, erro e corrida de requests.

### 4. Implementation Steps

- [ ] Criar fixtures determinísticas de API.
- [ ] Implementar cenários CA-01 a CA-08.
- [ ] Conferir conteúdo e número de linhas do download.
- [ ] Testar viewport mobile principal.
- [ ] Registrar falhas e corrigir apenas escopo necessário.

### 5. Expected Files

`tests/e2e/`, fixtures/MSW, configuração Playwright e relatório.

### 6. Acceptance Criteria

- Fluxos P0 passam sem dados fictícios de produção.
- CSV exporta conjunto completo.
- Resposta obsoleta não altera tela.

### 7. Testing Requirements

Playwright em 390 px e desktop, além de unit/integration, lint, typecheck e build.

### 8. Definition of Done

- [ ] E2E concluído.
- [ ] Critérios atendidos.
- [ ] Gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `feat(app): complete exchange screens and workflow`.
- Pull Request: não aberto.
- Branch de destino: `dev`.
- Status do merge: pendente.

### 10. Completion Notes

Fluxos MVP de conversão, histórico e exportação cobertos por E2E com fixtures; aguardando gates finais.
