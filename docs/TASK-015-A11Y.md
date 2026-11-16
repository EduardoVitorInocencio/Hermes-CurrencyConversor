# TASK-015 — Cobertura de acessibilidade da UI base

Os testes em `src/shared/components/base-ui.accessibility.test.tsx` verificam os contratos comportamentais dos componentes compartilhados:

- labels e descrições de `Input`, com `aria-invalid` conectado à mensagem de erro;
- foco por teclado e seleção inicial no `Select` com papel `combobox`;
- anúncio separado para loading (`status`), erro (`alert`) e vazio (heading sem `alert`);
- bloqueio de ação e preservação do nome acessível durante loading do `Button`.

O gate automatizado atual é Vitest + Testing Library + `jest-dom`. Ainda não há uma auditoria visual automatizada completa de contraste ou uma regra axe no pacote; esses pontos permanecem como validação complementar antes da release, sem substituir os contratos semânticos cobertos aqui.
