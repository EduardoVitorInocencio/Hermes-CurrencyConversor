# HERMES — Currency Exchange

Aplicação React + TypeScript para conversão de moedas, com especificação de produto em `PRD_SPEC.md`, arquitetura técnica em `TECH_SPEC.md` e plano de execução em `TASKs_SPEC.md`.

## Status atual

`TASK-007` extrai os tokens HERMES dark e os estilos globais. A interface atual ainda é o starter do Vite; nenhuma feature de produto foi implementada nesta tarefa.

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

## App shell e ambiente

`src/main.tsx` permanece como entrada pública e delega a montagem para `src/app/main.tsx`, que aplica `StrictMode` e `AppProviders`. O provider é intencionalmente neutro nesta fase; providers de features entram junto com suas respectivas tarefas. `src/App.tsx` mantém um re-export compatível para imports existentes, enquanto o componente está organizado em `src/app/App.tsx`.

`VITE_FRANKFURTER_API_URL` é uma configuração pública de browser documentada em [.env.example](.env.example). Variáveis `VITE_*` não podem conter segredos; o fallback local aponta para `https://api.frankfurter.dev/v2` até a camada HTTP ser implementada.

## Design foundation

Os tokens verificados no Design Guide local estão em `src/app/styles/tokens.css`, com aliases semânticos dark-only, dimensões HERMES, tipografia Inter, breakpoints de referência e mapeamento nominal para utilities Tailwind. `src/app/styles/globals.css` aplica reset, escala tipográfica, números tabulares, foco visível, seleção, contraste e overflow horizontal controlado; `src/index.css` permanece como ponto de entrada compatível.

## Estilos

Tailwind CSS v4 está integrado pelo plugin oficial do Vite e pela entrada `src/index.css`. A escala de tipografia usa Inter/fallback de sistema com os estilos H1–H4, Body Large/Medium e Caption Small do guia. Os breakpoints documentados são 375, 390, 430, 768, 1024, 1280 e 1440 px; são pontos de validação, não modos visuais adicionais.

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
- Ainda ausentes no baseline: cliente HTTP, arquitetura por feature, Axios, Recharts, Phosphor e `country-flag-icons`. Tailwind CSS v4, tokens HERMES dark e breakpoints de referência já estão configurados.

## Escopo de referência

- Produto: [PRD_SPEC.md](PRD_SPEC.md)
- Arquitetura: [TECH_SPEC.md](TECH_SPEC.md)
- Plano geral: [TASKs_SPEC.md](TASKs_SPEC.md)
- Tarefas: [tasks/task1.md](tasks/task1.md) até `tasks/task42.md`
