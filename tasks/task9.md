### TASK-009 — Configurar ícones e mapa de bandeiras

**Metadata**

- ID: TASK-009
- Feature: Design system / currencies
- Phase: Phase 1 — Design Foundation
- Type: Component
- Priority: P1
- Status: IN_REVIEW
- Dependencies: TASK-007
- Branch: `dev`
- PRD References: RF-006, RF-007, RN-027, RNF-018
- TECH References: TECH-002, TECH-006
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Preparar iconografia e associação explícita entre códigos de moeda e países/territórios.

### 2. Context

`country-flag-icons` usa ISO 3166, enquanto o domínio usa ISO 4217; não pode haver associação implícita.

### 3. Scope

Adicionar pacotes, mapear EUR/USD/GBP/BRL/JPY e fallback neutro. Não decidir cobertura completa sem fonte.

### 4. Implementation Steps

- [x] Adicionar Phosphor e country-flag-icons compatíveis.
- [x] Criar mapa explícito e tipos.
- [x] Criar fallback sem bandeira.
- [x] Documentar códigos cobertos e ausentes.
- [x] Criar testes do mapa.

### 5. Expected Files

`src/features/currencies/constants/flagMap.ts`, `src/shared/components/`, `package.json`, testes.

### 6. Acceptance Criteria

- Código da moeda sempre permanece visível.
- Moeda sem mapeamento não mostra bandeira incorreta.

### 7. Testing Requirements

Testar EUR, USD, GBP, BRL, JPY e código sem mapeamento.

### 8. Definition of Done

- [x] Mapa implementado.
- [x] Critérios atendidos.
- [x] Testes/gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: commit local atual — `feat(currencies): add icon and flag foundations`.
- Pull Request: não aberto, conforme solicitado.
- Branch de destino: `dev`.
- Status do merge: não aplicável; integração via PR não será realizada.

### 10. Completion Notes

Dependências adicionadas: `@phosphor-icons/react` `2.1.10` e `country-flag-icons` `1.6.20`. O mapa ISO 4217 → ISO 3166/território é explícito para `EUR → EU`, `USD → US`, `GBP → GB`, `BRL → BR` e `JPY → JP`; `EUR` usa `EU` para representar a zona do euro. `CurrencyFlag` mantém o código visível e usa marcador neutro para códigos sem cobertura. Ícones de ação devem ser importados pelo reexport compartilhado `src/shared/components/iconography.ts`.

Validação em 14/11/2026: 10 testes unitários passaram; `npm run test:e2e:ci` passou com 3 testes e 1 skip esperado; `npm run lint`, `npm run typecheck` e `npm run build` passaram.
