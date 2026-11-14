### TASK-030 — Compor Currency Converter P0

**Metadata**

- ID: TASK-030
- Feature: Converter
- Phase: Phase 6 — Product Features
- Type: Feature
- Priority: P0
- Status: TODO
- Dependencies: TASK-012, TASK-021, TASK-025, TASK-028, TASK-029
- Branch: `task/TASK-030-converter-feature` a partir de `feat/converter`
- PRD References: RF-002, RF-003, RF-004, RF-008–RF-015, RF-043, RN-002–RN-011
- TECH References: TECH-007, TECH-011, TECH-012

### 1. Objective

Entregar o fluxo completo de conversão indicativa com par, valor, swap, taxa, data e fonte.

### 2. Context

É o núcleo P0 e deve usar catálogo, serviço, cálculo e estados reais.

### 3. Scope

Compor `CurrencyConverter`, campos de moeda/valor, swap, informação de taxa, validações e retry. Não inclui overview P1.

### 4. Implementation Steps

- [ ] Conectar catálogo e seleção.
- [ ] Conectar cotação ao par atual.
- [ ] Recalcular valor localmente.
- [ ] Implementar swap com nova consulta.
- [ ] Exibir loading/error/empty/sucesso e aviso indicativo.
- [ ] Testar critérios CA-01, CA-02 e CA-08.

### 5. Expected Files

`src/features/exchange/components/`, hooks de integração, estilos e testes.

### 6. Acceptance Criteria

- Conversão válida mostra resultado, taxa, direção, data e fonte.
- Zero funciona; inválidos não mostram `NaN`/`Infinity`.
- Swap não reaproveita indevidamente taxa antiga.

### 7. Testing Requirements

RTL/MSW para catálogo, valor sem HTTP, swap, erros e cancelamento; E2E posterior em TASK-038.

### 8. Definition of Done

- [ ] Feature concluída.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `feat/converter`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
