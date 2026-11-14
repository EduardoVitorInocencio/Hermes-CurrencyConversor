### TASK-037 — Implementar status da API e stale-data

**Metadata**

- ID: TASK-037
- Feature: API status
- Phase: Phase 7 — Integration & QA / P1
- Type: Feature
- Priority: P1
- Status: TODO
- Dependencies: TASK-014, TASK-028, TASK-030
- Branch: `task/TASK-037-api-status` a partir de `feat/hermes-experience`
- PRD References: RF-015, RF-025, RF-043, RN-031, RNF-009, RNF-015
- TECH References: TECH-005, TECH-011, TECH-015

### 1. Objective

Indicar sucesso/falha recente sem fingir health check ou cotação em tempo real.

### 2. Context

O Figma mostra indicador de API, mas o PRD exige que ele reflita uma consulta real.

### 3. Scope

Estado derivado de request, badge/status, stale-data explicado e logs não sensíveis.

### 4. Implementation Steps

- [ ] Definir eventos que atualizam status.
- [ ] Diferenciar sucesso recente, erro e desconhecido.
- [ ] Não marcar conectado no carregamento inicial.
- [ ] Exibir stale-data com contexto honesto.
- [ ] Testar transições.

### 5. Expected Files

`src/features/preferences/components/ApiStatus.tsx`, estado de request, testes.

### 6. Acceptance Criteria

- “Conectada” só aparece após sucesso relevante.
- Falha não transforma dado antigo em atual.

### 7. Testing Requirements

Sucesso, erro, timeout, retry e stale-data.

### 8. Definition of Done

- [ ] Status concluído.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `feat/hermes-experience`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
