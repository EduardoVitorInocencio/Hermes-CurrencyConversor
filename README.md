# HERMES — Currency Exchange

Aplicação React + TypeScript para conversão de moedas, com especificação de produto em `PRD_SPEC.md`, arquitetura técnica em `TECH_SPEC.md` e plano de execução em `TASKs_SPEC.md`.

## Status atual

As telas principais estão implementadas na branch `dev` e alinhadas ao Design Guide local e aos frames Figma informados: Conversor, Histórico e Relatórios. A entrega permanece em `IN_REVIEW` até a execução dos gates finais; não foi aberto PR.

O Design Guide local em `styleRef/HERMES_Design_System_Standalone.html` e as referências de tela no Figma estão documentados em `TECH_SPEC.md`. A interface usa o símbolo local HERMES, shell desktop/mobile, tokens dark, cards de mercado, conversor, análise histórica e builder de relatórios.

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

## Fluxo funcional

Após `npm install`, `npm run dev` abre o AppShell HERMES. O Conversor consulta o catálogo e a taxa do par pela Frankfurter v2, calcula localmente e identifica a natureza indicativa da taxa. Histórico usa a mesma série canônica para métricas, comparação, gráfico, tabela, filtros, paginação e CSV. Relatórios permite configurar nome, período, colunas e exportar CSV. Os testes E2E substituem a rede por fixtures determinísticas; a collection reproduzível está em [postman/HERMES-Frankfurter-v2.postman_collection.json](postman/HERMES-Frankfurter-v2.postman_collection.json).

Se a API estiver indisponível, o app mantém estados de erro/indisponibilidade explícitos e não cria taxas de fallback. `VITE_FRANKFURTER_API_URL` é a única configuração pública da API; nenhum segredo deve ser colocado em variáveis `VITE_*`.

## E2E

O Playwright executa o smoke test contra o servidor Vite local em duas referências: Chromium desktop `1440×900` e Chromium mobile `390×844`. `test:e2e` usa o reporter padrão; `test:e2e:ci` ativa o reporter de linha, proíbe `test.only`, usa um worker e permite até dois retries. Na primeira execução de uma máquina, instale o browser com `npx playwright install chromium`.

## App shell e ambiente

`src/main.tsx` permanece como entrada pública e delega a montagem para `src/app/main.tsx`, que aplica `StrictMode` e `AppProviders`. O provider é intencionalmente neutro nesta fase; providers de features entram junto com suas respectivas tarefas. `src/App.tsx` mantém um re-export compatível para imports existentes, enquanto o componente está organizado em `src/app/App.tsx`.

`VITE_FRANKFURTER_API_URL` é uma configuração pública de browser documentada em [.env.example](.env.example). Variáveis `VITE_*` não podem conter segredos; o fallback local aponta para `https://api.frankfurter.dev/v2` até a camada HTTP ser implementada.

## Design foundation

Os tokens verificados no Design Guide local estão em `src/app/styles/tokens.css`, com aliases semânticos dark-only, dimensões HERMES, tipografia Inter, breakpoints de referência e mapeamento nominal para utilities Tailwind. `src/app/styles/globals.css` aplica reset, escala tipográfica, números tabulares, foco visível, seleção, contraste e overflow horizontal controlado; `src/index.css` permanece como ponto de entrada compatível.

## Moedas, bandeiras e ícones

`@phosphor-icons/react` é a fonte única para ícones de ação, com reexports em `src/shared/components/iconography.ts`. `country-flag-icons` é consumido por `CurrencyFlag`; o mapa explícito cobre `EUR → EU`, `USD → US`, `GBP → GB`, `BRL → BR` e `JPY → JP`. Códigos sem mapeamento exibem o código original e um marcador neutro, nunca uma bandeira presumida.

## UI compartilhada

`src/shared/components/ui/Button.tsx` fornece as variantes `primary`, `secondary` e `quiet`, tamanhos `md` e `sm`, suporte a ícone, loading, disabled e foco por teclado. O loading mantém o label acessível no DOM e desabilita a ação para impedir duplicidade.

`Input`, `Select` e `CurrencyAmountField` compartilham labels, ajuda, erro e estados de loading/disabled. O `Select` permite busca case-insensitive e seleção por teclado; valores monetários permanecem como strings para preservar vazio e zero sem coerção enganosa. `Card`, `Badge`, `Typography`, `LoadingState`, `ErrorState` e `EmptyState` completam a linguagem de superfícies e feedback.

## App shell

`src/shared/components/layout/AppShell.tsx` organiza landmarks, sidebar desktop com pares salvos e fonte, topbar com status/idioma e navegação móvel fixa. Conversor, Histórico e Relatórios mudam sem recarga, identificam a seção ativa e exibem estados reais de loading, erro, stale e vazio sem taxas fictícias.

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
- Entradas atuais: `src/main.tsx`, `src/App.tsx`, `src/app/App.tsx` e `src/index.css`.
- Axios e Recharts estão integrados para consulta e visualização; Excel permanece explicitamente desabilitado, pois a exportação implementada nesta etapa é CSV. Nenhuma URL temporária do Figma é usada em runtime.

## Escopo de referência

- Produto: [PRD_SPEC.md](PRD_SPEC.md)
- Arquitetura: [TECH_SPEC.md](TECH_SPEC.md)
- Plano geral: [TASKs_SPEC.md](TASKs_SPEC.md)
- Tarefas: [tasks/task1.md](tasks/task1.md) até `tasks/task42.md`
