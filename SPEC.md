# HERMES — Specification Index

Documento operacional da implementação observada em 16/11/2026. Este arquivo não substitui os documentos de origem:

- [PRD_SPEC.md](PRD_SPEC.md) define o produto, requisitos funcionais, regras de negócio e critérios de aceite.
- [TECH_SPEC.md](TECH_SPEC.md) define arquitetura, contratos, integração, testes e decisões técnicas.
- [TASKs_SPEC.md](TASKs_SPEC.md) define o plano de execução e a rastreabilidade por fase.
- [TASKs_SPEC.md](TASKs_SPEC.md) contém o plano consolidado em 10 fases; os arquivos individuais foram removidos após a síntese.

## 1. Estado da entrega

O projeto está na branch `dev`, em `IN_REVIEW`. O frontend funcional já cobre o caminho principal de conversão, histórico e exportação; a release não está concluída porque ainda há pendências de integração P1, revisão visual/manual e PR/merge.

| Bloco | Estado | Evidência |
|---|---|---|
| Setup e qualidade | Concluído tecnicamente | Vite, TypeScript estrito, ESLint, Vitest, MSW, Playwright, Tailwind v4 e scripts npm |
| Design system | Implementado | Tokens dark HERMES, tipografia, breakpoints e estilos globais em `src/app/styles/` |
| Shell | Implementado | `src/shared/components/layout/AppShell.tsx`, navegação desktop/mobile e landmarks |
| Conversor | Implementado | Catálogo, cotação, cálculo local, swap, formatação e estados de rede |
| Histórico | Implementado | Oito períodos, gráfico, tabela, filtros, paginação e exportação CSV |
| Análise | Implementada | Comparação de USD/EUR/GBP contra BRL, métricas e variação em `HistoricalAnalysisPage.tsx` |
| Relatórios | Parcial | Builder e CSV existem; colunas selecionadas e frequência ainda não alteram o arquivo |
| P1 de preferências | Parcial | Hooks de favoritos/locale existem, mas shell, tema e idioma ainda não estão completamente conectados |
| Release | Pendente | Sem PR/merge confirmado e com revisão visual/manual ainda necessária |

## 2. Contrato de runtime

### Fonte de dados

- Base configurável por `VITE_FRANKFURTER_API_URL`.
- Fallback local: `https://api.frankfurter.dev/v2`.
- Catálogo: `GET /currencies`.
- Cotação: `GET /rate/{base}/{quote}`.
- Histórico: `GET /rates?from={from}&to={to}&base={base}&quotes={quote}`.
- Axios usa timeout de 10 segundos, `Accept: application/json` e `AbortSignal`.
- Nenhuma taxa, data ou registro sintético deve ser criado para preencher a interface.

### Estado e dados

O estado compartilhado de tela está em `useExchangeViewState`:

```ts
type ExchangeViewState = {
  pair: { base: string; quote: string }
  amount: string
  period: '7D' | '15D' | '30D' | '3M' | '6M' | '1A' | '5A' | '10A'
  filters: { from: string; to: string; minRate: string; maxRate: string }
  page: number
}
```

O fluxo derivado do histórico é:

```text
API → adapter/validação → série canônica
                         → filtros → ordenação → contagem → paginação/CSV
                         → gráfico/tabela
```

O catálogo possui TTL local de 24 horas. Cotação e histórico ainda não possuem cache TTL ou deduplicação.

## 3. Organização do código

```text
src/
├── app/                 # entrada, providers, configuração e estilos globais
├── features/
│   ├── currencies/      # catálogo, adapter, bandeiras e hook
│   ├── exchange/        # conversor, cotação, evolução e estado do par
│   ├── export/          # geração e download de CSV
│   ├── favorites/       # persistência local de pares (hook ainda não conectado ao shell)
│   ├── history/         # API, série, períodos, análise, tabela e pipeline
│   ├── market/          # overview de pares
│   ├── preferences/     # locale/tema dark-only
│   └── reports/          # builder e preview de relatório
├── shared/              # UI, layout, feedback, API, cache, formatadores e validação
└── test/                # setup e mocks MSW
tests/e2e/               # smoke Playwright desktop/mobile
```

### Regras de implementação

1. Dados externos são validados antes de chegar à UI.
2. O cálculo da conversão ocorre no cliente: `valor × taxa`.
3. A taxa não é arredondada antes do cálculo; arredondamento é somente de apresentação.
4. Datas de fonte permanecem em ISO no domínio e são localizadas na apresentação.
5. O gráfico e a tabela devem usar o mesmo contexto de par/período.
6. CSV exporta o conjunto filtrado completo, não apenas a página visível, e bloqueia lista vazia.
7. Foco, labels, estados de erro/loading e código ISO não podem depender apenas de cor ou bandeira.

## 4. Evidência de validação

Executado em 16/11/2026:

| Comando | Resultado |
|---|---|
| `npm run lint` | Passou |
| `npm run typecheck` | Passou |
| `npm run test` | Passou — 22 arquivos, 44 testes |
| `npm run build` | Passou — aviso do Vite para chunk >500 kB |
| `npm run test:e2e` | Passou — 7 testes; 1 cenário pulado por ser exclusivo do projeto desktop |

O E2E utiliza fixtures determinísticas para a API e Chromium em `1440×900` e `390×844`; o sweep de overflow cobre 375, 390, 430, 768, 1024, 1280 e 1440 px.

## 5. Pendências de aceite

- Conectar `useFavorites` ao shell e substituir os valores estáticos da sidebar.
- Tornar idioma funcional para textos e formatos, ou manter o controle explicitamente como preview.
- Finalizar o contrato do tema; hoje somente dark está aprovado.
- Derivar o indicador “API conectada” de uma consulta bem-sucedida recente.
- Conectar ordenação por coluna no histórico detalhado.
- Fazer seleção de colunas e frequência refletirem o CSV do builder, ou reduzir o formulário.
- Adicionar cenários E2E para swap, períodos, retry, ordenação e preferências.
- Executar revisão visual/manual contra os frames Figma e auditoria WCAG formal.
- Avaliar code splitting para remover o aviso de chunk grande.
- Abrir e integrar PR somente após a revisão dos critérios e das evidências.

## 6. Definition of Done

Uma entrega só pode ser marcada como concluída quando o código, os critérios do PRD, os gates aplicáveis, a documentação, a revisão visual/funcional e o PR/merge estiverem confirmados. `SPEC.md` deve ser atualizado junto com `PRD_SPEC.md`, `TECH_SPEC.md`, `README.md` ou o plano de fases quando uma decisão alterar o comportamento documentado.
