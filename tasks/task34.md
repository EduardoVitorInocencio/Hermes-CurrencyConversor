### TASK-034 — Implementar exportação CSV filtrada

**Metadata**

- ID: TASK-034
- Feature: Export
- Phase: Phase 6 — Product Features
- Type: Feature
- Priority: P0
- Status: TODO
- Dependencies: TASK-027, TASK-033
- Branch: `task/TASK-034-csv-export` a partir de `feat/export`
- PRD References: RF-035–RF-038, RN-025, RN-026, RNF-010
- TECH References: TECH-010, TECH-014

### 1. Objective

Gerar CSV local do conjunto filtrado e ordenado completo, independentemente da página.

### 2. Context

O usuário precisa levar os dados para outra análise; exportar somente a página seria incorreto.

### 3. Scope

Função/export button, BOM UTF-8, cabeçalho, escape RFC 4180, filename e bloqueio vazio.

### 4. Implementation Steps

- [ ] Implementar serialização segura.
- [ ] Usar dados antes da paginação.
- [ ] Definir filename com par e intervalo.
- [ ] Desabilitar sem registros.
- [ ] Cobrir fórmulas/células perigosas conforme RNF-010.

### 5. Expected Files

`src/features/export/utils/exportCsv.ts`, `ExportCsvButton.tsx`, testes.

### 6. Acceptance Criteria

- CSV tem cabeçalho e exatamente o contador de linhas.
- Ordenação do arquivo coincide com a tabela filtrada.
- Nenhum download ocorre com conjunto vazio.

### 7. Testing Requirements

Cabeçalho, BOM, aspas, quebras, valores especiais, zero registros e 32 linhas paginadas.

### 8. Definition of Done

- [ ] Exportação concluída.
- [ ] Critérios atendidos.
- [ ] Testes/gates aprovados.
- [ ] Documentação atualizada.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `feat/export`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
