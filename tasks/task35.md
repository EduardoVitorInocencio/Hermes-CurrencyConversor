### TASK-035 — Implementar overview de mercado e favoritos

**Metadata**

- ID: TASK-035
- Feature: HERMES experience
- Phase: Phase 7 — Integration & QA / P1
- Type: Feature
- Priority: P1
- Status: IN_REVIEW
- Dependencies: TASK-020, TASK-022, TASK-023, TASK-030, TASK-031
- Branch: `dev`
- PRD References: RF-016, RF-023, RF-024, RN-019, RN-032, RN-033
- TECH References: TECH-015
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Entregar os quatro cards de mercado e favoritos locais como evolução desacoplada.

### 2. Context

O Figma mostra EUR/USD, USD/BRL, GBP/USD e EUR/BRL; valores devem vir da fonte.

### 3. Scope

Overview, variação contra observação anterior, salvar/remover e abrir par no conversor. Não usar números do protótipo.

### 4. Implementation Steps

- [ ] Consultar pares com dados reais.
- [ ] Tratar erro parcial e indisponibilidade.
- [ ] Implementar favoritos únicos em storage.
- [ ] Permitir abrir no conversor.
- [ ] Testar storage bloqueado e item obsoleto.

### 5. Expected Files

`src/features/market/`, `src/features/favorites/`, testes e mensagens.

### 6. Acceptance Criteria

- Quatro cards mostram taxa/data reais ou estado honesto.
- Favoritos não duplicam e não bloqueiam P0.

### 7. Testing Requirements

Integração com respostas parciais, favoritos, remoção, persistência e fallback.

### 8. Definition of Done

- [ ] P1 concluído.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
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

Visão de mercado, pares salvos e navegação para o Conversor implementados; aguardando gates finais.
