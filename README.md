# HERMES — Currency Exchange

Aplicação React + TypeScript para conversão de moedas, com especificação de produto em `PRD_SPEC.md`, arquitetura técnica em `TECH_SPEC.md` e plano de execução em `TASKs_SPEC.md`.

## Status atual

`TASK-003` configura o pipeline Tailwind CSS v4. A interface atual ainda é o starter do Vite; nenhuma feature de produto foi implementada nesta tarefa.

O Design Guide local em `styleRef/HERMES_Design_System_Standalone.html` e as referências de tela no Figma estão documentados em `TECH_SPEC.md`. A implementação visual fica para as tarefas de UI previstas no plano.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run preview
```

`test` usa o runner nativo do Node como gate transitório, sem mascarar falhas e sem instalar uma suíte de testes nesta tarefa. A configuração de Vitest, React Testing Library, MSW e Playwright está planejada nas tarefas posteriores.

## Estilos

Tailwind CSS v4 está integrado pelo plugin oficial do Vite e pela entrada `src/index.css`. A paleta e os tokens efetivos HERMES permanecem deliberadamente fora desta tarefa e serão definidos em `TASK-007`; nenhuma cor genérica do Tailwind foi adotada como token do produto.

## Imports

O projeto usa TypeScript estrito. Para importar módulos da aplicação, use o alias `@/*`, resolvido para `src/*` tanto pelo TypeScript quanto pelo Vite:

```ts
import App from '@/App'
```

Novos componentes não precisam usar caminhos relativos longos; a migração dos componentes existentes fica para as tarefas de UI.

## Baseline auditado

- React `19.3.1` e React DOM `19.3.1`.
- Vite `8.3.8` instalado (`package.json`: `^8.3.6`).
- TypeScript `6.0.3`.
- ESLint `10.15.0` instalado (`package.json`: `^10.14.0`).
- Entradas atuais: `src/main.tsx`, `src/App.tsx`, `src/App.css` e `src/index.css`.
- Ainda ausentes no baseline: cliente HTTP, arquitetura por feature, Axios, Recharts, Phosphor, `country-flag-icons` e ferramentas dedicadas de teste. Tailwind CSS v4 está configurado, mas seus tokens HERMES ainda não foram definidos.

## Escopo de referência

- Produto: [PRD_SPEC.md](PRD_SPEC.md)
- Arquitetura: [TECH_SPEC.md](TECH_SPEC.md)
- Plano geral: [TASKs_SPEC.md](TASKs_SPEC.md)
- Tarefas: [tasks/task1.md](tasks/task1.md) até `tasks/task42.md`
