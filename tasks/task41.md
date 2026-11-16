### TASK-041 — Atualizar README e documentação operacional

**Metadata**

- ID: TASK-041
- Feature: Documentation
- Phase: Phase 8 — Release Readiness
- Type: Documentation
- Priority: P0
- Status: IN_REVIEW
- Dependencies: TASK-038, TASK-039, TASK-040
- Branch: `dev`
- PRD References: RNF-016, RNF-017, OBJ-06
- TECH References: TECH-001, TECH-016
- Reference Documents: [`PRD_SPEC.md`](../PRD_SPEC.md) · [`TECH_SPEC.md`](../TECH_SPEC.md) · [`TASKs_SPEC.md`](../TASKs_SPEC.md)

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

- Branch utilizada: `dev`.
- Commits realizados: `feat(app): complete exchange screens and workflow`.
- Pull Request: não aberto.
- Branch de destino: `dev`.
- Status do merge: pendente.

### 10. Completion Notes

Documentação do app, arquitetura, fluxo funcional e limitações atualizada; aguardando gates finais.
