# HERMES — Currency Exchange

Aplicação React + TypeScript para conversão de moedas, com especificação de produto em `PRD_SPEC.md`, arquitetura técnica em `TECH_SPEC.md` e plano de execução em `TASKs_SPEC.md`.

## Status atual

`TASK-005` configura os gates E2E com Playwright e Chromium. A interface atual ainda é o starter do Vite; nenhuma feature de produto foi implementada nesta tarefa.

O Design Guide local em `styleRef/HERMES_Design_System_Standalone.html` e as referências de tela no Figma estão documentados em `TECH_SPEC.md`. A implementação visual fica para as tarefas de UI previstas no plano.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run test:coverage
npm run test:watch
npm run test:e2e
npm run test:e2e:ci
npm run build
npm run preview
```

`test` executa o Vitest em modo CI; `test:watch` inicia o modo interativo e `test:coverage` gera cobertura V8 em `coverage/`. O setup usa jsdom, Testing Library e MSW para manter testes de UI e rede independentes de serviços reais.

## E2E

O Playwright executa o smoke test contra o servidor Vite local em duas referências: Chromium desktop `1440×900` e Chromium mobile `390×844`. `test:e2e` usa o reporter padrão; `test:e2e:ci` ativa o reporter de linha, proíbe `test.only`, usa um worker e permite até dois retries. Na primeira execução de uma máquina, instale o browser com `npx playwright install chromium`.

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
