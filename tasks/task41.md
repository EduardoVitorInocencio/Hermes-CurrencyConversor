### TASK-041 — Atualizar README e documentação operacional

**Metadata**

- ID: TASK-041
- Feature: Documentation
- Phase: Phase 8 — Release Readiness
- Type: Documentation
- Priority: P0
- Status: TODO
- Dependencies: TASK-038, TASK-039, TASK-040
- Branch: `task/TASK-041-project-documentation` a partir de `chore/release-readiness`
- PRD References: RNF-016, RNF-017, OBJ-06
- TECH References: TECH-001, TECH-016

### 1. Objective

Documentar instalação, comandos, variáveis, escopo, validação e limitações sem contradizer PRD/TECH.

### 2. Context

README atual é o texto padrão do Vite e não explica o HERMES.

### 3. Scope

README operacional, links para PRD/TECH/TASKs, troubleshooting e referências de Figma/API. Não duplicar requisitos.

### 4. Implementation Steps

- [ ] Substituir instruções genéricas por comandos do projeto.
- [ ] Documentar variáveis públicas e ausência de segredos.
- [ ] Documentar gates e fluxo de branches/PR.
- [ ] Linkar documentos centrais e pendências.
- [ ] Revisar consistência de nomenclatura.

### 5. Expected Files

`README.md`, eventualmente `docs/` e links nos documentos centrais.

### 6. Acceptance Criteria

- Uma pessoa consegue instalar, testar e executar o projeto.
- README não promete features não implementadas.

### 7. Testing Requirements

Executar instruções em ambiente limpo ou documentar limitações; lint/build/test.

### 8. Definition of Done

- [ ] README concluído.
- [ ] Critérios atendidos.
- [ ] Gates/documentação aprovados.
- [ ] PR revisado e integrado.
- [ ] Checklist sincronizado.

### 9. Git Information

- Branch utilizada: não iniciada.
- Commits realizados: nenhum.
- Pull Request: não aberto.
- Branch de destino: `chore/release-readiness`.
- Status do merge: pendente.

### 10. Completion Notes

Não iniciada.
