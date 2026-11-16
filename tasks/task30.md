### TASK-030 — Compor Currency Converter P0

**Metadata**

- ID: TASK-030
- Feature: Converter
- Phase: Phase 6 — Product Features
- Type: Feature
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-012, TASK-021, TASK-025, TASK-028, TASK-029
- Branch: `dev`
- PRD References: RF-002, RF-003, RF-004, RF-008–RF-015, RF-043, RN-002–RN-011
- TECH References: TECH-007, TECH-011, TECH-012
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

### 1. Objective

Entregar o fluxo completo de conversão indicativa com par, valor, swap, taxa, data e fonte.

### 2. Context

É o núcleo P0 e deve usar catálogo, serviço, cálculo e estados reais.

### 3. Scope

Compor `CurrencyConverter`, campos de moeda/valor, swap, informação de taxa, validações e retry. Não inclui overview P1.

### 4. Implementation Steps

- [x] Conectar catálogo e seleção.
- [x] Conectar cotação ao par atual.
- [x] Recalcular valor localmente.
- [x] Implementar swap com nova consulta.
- [x] Exibir loading/error/empty/sucesso e aviso indicativo.
- [x] Testar critérios CA-01, CA-02 e CA-08.

### 5. Expected Files

`src/features/exchange/components/`, hooks de integração, estilos e testes.

### 6. Acceptance Criteria

- Conversão válida mostra resultado, taxa, direção, data e fonte.
- Zero funciona; inválidos não mostram `NaN`/`Infinity`.
- Swap não reaproveita indevidamente taxa antiga.

### 7. Testing Requirements

RTL/MSW para catálogo, valor sem HTTP, swap, erros e cancelamento; E2E posterior em TASK-038.

### 8. Definition of Done

- [x] Feature concluída.
- [x] Critérios atendidos.
- [x] Testes/gates aprovados.
- [x] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: `dev`.
- Commits realizados: `feat(app): complete remaining exchange workflow`.
- Pull Request: não aberto.
- Branch de destino: não aplicável; fluxo solicitado sem PR.
- Status do merge: não aplicável.

### 10. Completion Notes

CurrencyConverter conectado ao catálogo/cotação v2, cálculo local, swap, estados de rede e aviso de fonte indicativa; zero e entradas vazias não geram NaN/Infinity.
