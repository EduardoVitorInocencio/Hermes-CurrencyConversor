### TASK-040 — Criar coleção Postman e evidências da API

**Metadata**

- ID: TASK-040
- Feature: API documentation
- Phase: Phase 8 — Release Readiness
- Type: Documentation
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-019, TASK-020, TASK-021, TASK-022, TASK-038
- Branch: `dev`
- PRD References: RF-001, RF-009, RF-017, RN-001, RN-030, CA-08, CA-10
- TECH References: TECH-005, TECH-016
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Registrar chamadas reais/observadas, payloads, erros e limitações da Frankfurter v2.

### 2. Context

O briefing exige evidência Postman e a API externa pode variar em cobertura/calendário.

### 3. Scope

Collection para currencies/rate/rates, inválidos e sem dados quando reproduzíveis; documentação da observação.

### 4. Implementation Steps

- [ ] Criar collection sem segredos.
- [ ] Capturar status, payload e duração com data de consulta.
- [ ] Registrar blended/provider attribution sem afirmar ECB indevidamente.
- [ ] Documentar erros e limitações.
- [ ] Relacionar evidências aos requisitos.

### 5. Expected Files

`postman/`, `docs/API_TESTS.md` ou seção equivalente no README.

### 6. Acceptance Criteria

- Collection reproduz endpoints v2 documentados.
- Evidência deixa claro o que foi observado e o que é expectativa.

### 7. Testing Requirements

Executar requests em ambiente autorizado, validar payloads e manter testes automatizados separados de rede real.

### 8. Definition of Done

- [ ] Evidências concluídas.
- [ ] Critérios atendidos.
- [ ] Gates/documentação aprovados.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `feat(app): complete exchange screens and workflow`.
- Pull Request: não aberto.
- Branch de destino: `dev`.
- Status do merge: pendente.

### 10. Completion Notes

Collection Postman e evidências de endpoints documentadas; aguardando gates finais.
