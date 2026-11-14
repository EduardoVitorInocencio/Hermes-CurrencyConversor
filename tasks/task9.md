### TASK-009 — Configurar ícones e mapa de bandeiras

**Metadata**

- ID: TASK-009
- Feature: Design system / currencies
- Phase: Phase 1 — Design Foundation
- Type: Component
- Priority: P1
- Status: TODO
- Dependencies: TASK-007
- Branch: `task/TASK-009-icons-flags` a partir de `feat/design-system`
- PRD References: RF-006, RF-007, RN-027, RNF-018
- TECH References: TECH-002, TECH-006

### 1. Objective

Preparar iconografia e associação explícita entre códigos de moeda e países/territórios.

### 2. Context

`country-flag-icons` usa ISO 3166, enquanto o domínio usa ISO 4217; não pode haver associação implícita.

### 3. Scope

Adicionar pacotes, mapear EUR/USD/GBP/BRL/JPY e fallback neutro. Não decidir cobertura completa sem fonte.

### 4. Implementation Steps

- [ ] Adicionar Phosphor e country-flag-icons compatíveis.
- [ ] Criar mapa explícito e tipos.
- [ ] Criar fallback sem bandeira.
- [ ] Documentar códigos cobertos e ausentes.
- [ ] Criar testes do mapa.

### 5. Expected Files

`src/features/currencies/constants/flagMap.ts`, `src/shared/components/`, `package.json`, testes.

### 6. Acceptance Criteria

- Código da moeda sempre permanece visível.
- Moeda sem mapeamento não mostra bandeira incorreta.

### 7. Testing Requirements

Testar EUR, USD, GBP, BRL, JPY e código sem mapeamento.

### 8. Definition of Done

- [ ] Mapa implementado.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `feat/design-system`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
