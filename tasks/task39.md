### TASK-039 — Validar acessibilidade, responsividade e desempenho

**Metadata**

- ID: TASK-039
- Feature: Quality assurance
- Phase: Phase 7 — Integration & QA
- Type: Test
- Priority: P0
- Status: TODO
- Dependencies: TASK-018, TASK-030, TASK-031, TASK-033, TASK-038
- Branch: `task/TASK-039-a11y-responsive-performance` a partir de `chore/quality-gates`
- PRD References: RNF-003–RNF-007, RNF-018, RNF-020, CA-09
- TECH References: TECH-002, TECH-003, TECH-004, TECH-016

### 1. Objective

Validar qualidade visual, acessibilidade e desempenho dos fluxos entregues.

### 2. Context

O Figma ainda tem pendências intermediárias; o aceite exige WCAG 2.2 AA como alvo.

### 3. Scope

Keyboard, foco, labels, contraste, viewports, overflow, LCP controlado e interação de séries.

### 4. Implementation Steps

- [ ] Auditar fluxo principal por teclado.
- [ ] Verificar nomes, erros, status e contraste.
- [ ] Testar sete viewports.
- [ ] Medir interação com série de até 4 mil registros.
- [ ] Registrar limitações de rede externa.

### 5. Expected Files

Relatórios/snapshots de teste, specs E2E e correções de UI quando necessárias.

### 6. Acceptance Criteria

- Nenhuma regressão crítica de teclado/overflow.
- Métricas são acompanhadas de ambiente e não prometem SLA da API.

### 7. Testing Requirements

Playwright, auditoria de acessibilidade disponível, screenshots e medição documentada.

### 8. Definition of Done

- [ ] Auditoria concluída.
- [ ] Critérios atendidos.
- [ ] Gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `chore/quality-gates`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
