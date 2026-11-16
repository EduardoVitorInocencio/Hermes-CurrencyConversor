### TASK-014 — Implementar estados de feedback

**Metadata**

- ID: TASK-014
- Feature: UI base
- Phase: Phase 2 — Base UI Components
- Type: Component
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-011, TASK-013
- Branch: `dev`
- PRD References: RF-015, RF-021, RF-033, RNF-009
- TECH References: TECH-003, TECH-005
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Padronizar loading, skeleton, erro, vazio e retry sem dados fictícios.

### 2. Context

O produto precisa distinguir falha, ausência de dados e carregamento em todas as features.

### 3. Scope

Componentes de feedback e contratos de mensagem/ação. Não ligar aos services ainda.

### 4. Implementation Steps

- [x] Definir estados e tipos.
- [x] Implementar feedback visual e anúncio acessível.
- [x] Adicionar retry opcional.
- [x] Garantir que vazio não pareça erro.
- [x] Testar todos os estados.

### 5. Expected Files

`src/shared/components/feedback/`, testes e tokens necessários.

### 6. Acceptance Criteria

- Cada estado tem mensagem clara e ação aplicável.
- Nenhum estado de erro apresenta taxa/registro inventado.

### 7. Testing Requirements

Renderização, anúncio, retry, disabled e empty state.

### 8. Definition of Done

- [x] Feedback concluído.
- [x] Critérios atendidos.
- [x] Testes/gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `feat(ui): add feedback states`.
- Pull Request: não aberto.
- Branch de destino: não aplicável; fluxo solicitado sem PR.
- Status do merge: não aplicável.

### 10. Completion Notes

Loading, skeleton, erro e vazio implementados com mensagens claras, anúncios ARIA e retry apenas quando uma ação real é fornecida. Nenhum estado inventa taxa ou registro. Validações finais: lint, typecheck, testes, build e E2E aprovados.
