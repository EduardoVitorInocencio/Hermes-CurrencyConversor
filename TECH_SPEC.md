# HERMES — Currency Exchange
## Technical Specification

| Campo | Definição |
|---|---|
| Fonte de requisitos | [`PRD_SPEC.md`](PRD_SPEC.md) |
| Versão | 1.1 — consolidação da arquitetura implementada |
| Data | 16/11/2026 |
| Status | Fundação, UI, shell, integração Frankfurter, conversor, histórico, análise e CSV implementados; P1 parcial; em revisão |
| Repositório observado | Vite + React + TypeScript, branch `dev`, sem PR/merge de release confirmado |

Este documento descreve **como** implementar os requisitos do PRD e registra o estado técnico observado. Não altera o escopo de produto. Toda funcionalidade técnica deve apontar para IDs `RF`, `RN` e `RNF` do PRD; divergências entre intenção e implementação ficam marcadas como parciais ou pendentes.

## 1. Technical Overview

### 1.1 Objetivos arquiteturais

- Separar apresentação, estado de tela, domínio de câmbio e acesso à Frankfurter.
- Manter um único conjunto canônico de histórico para gráfico, tabela e exportação.
- Tornar efeitos de rede canceláveis, validáveis e observáveis sem expor dados sensíveis.
- Preservar os valores numéricos canônicos e aplicar localidade somente na apresentação.
- Permitir evolução de P0 para P1 sem acoplar favoritos, idioma ou tema ao núcleo do conversor.

### 1.2 Princípios

1. Dados externos são não confiáveis até serem validados.
2. Estado derivável não é duplicado como estado independente.
3. Componentes compartilhados não conhecem regras específicas de uma feature.
4. Cada erro de rede tem um estado visual explícito; nenhum dado fictício é fallback de produção.
5. A implementação do Figma usa tokens reais do Design Guide; números demonstrativos do `styleRef` não são fixtures de produção.
6. Uma tarefa deve entregar uma mudança pequena, testável e rastreável.

### 1.3 Restrições atuais do repositório

O estado observado contém `src/app/`, `src/features/`, `src/shared/`, testes unitários/componentes em `src/**/*.test.*`, mocks MSW em `src/test/mocks/`, E2E Playwright em `tests/e2e/`, assets locais e o Design Guide em `styleRef/HERMES_Design_System_Standalone.html`. Axios, Recharts, Tailwind CSS v4, Phosphor, `country-flag-icons`, Vitest, Testing Library, MSW, cobertura V8 e Playwright estão instalados e configurados. O alias `@/*`, a variável pública `VITE_FRANKFURTER_API_URL` e os scripts de qualidade estão ativos.

Limitações técnicas atuais: o cache TTL está aplicado ao catálogo, não às taxas/históricos; favoritos e preferências têm hooks, mas ainda não estão conectados ao `AppShell`; o status da API e os pares exibidos na sidebar ainda são composição estática; e o builder de relatórios ainda não projeta as colunas selecionadas no CSV.

## 2. Technology Stack

| Tecnologia | Responsabilidade | Situação observada | Regra |
|---|---|---|---|
| React + TypeScript | Componentes, estado e contratos | Já presente | Manter componentes funcionais e tipagem estrita |
| Vite | Dev server e build estático | Já presente | Manter como pipeline principal |
| Tailwind CSS v4 | Tokens e estilização responsiva | Integrado pelo plugin oficial do Vite e `src/index.css` | Não substituir os tokens HERMES por paleta genérica |
| Axios | Cliente HTTP, timeout e cancelamento | Integrado em `src/shared/lib/api/axiosClient.ts` | Manter URL pública configurável e `AbortSignal` |
| Recharts | Gráfico histórico | Integrado em `ExchangeRateChart` e na análise comparativa | Renderizar somente dados normalizados |
| `@phosphor-icons/react` | Ícones | Integrado com reexports em `src/shared/components/iconography.ts` | Não usar `phosphor-react` legado |
| `country-flag-icons` | SVG de bandeiras | Integrado com mapa explícito em `flagMap.ts` | Não presumir país para moeda sem mapeamento |
| Frankfurter API v2 | Fonte cambial | Dependência externa | Base pública em `https://api.frankfurter.dev/v2` |
| date-fns | Cálculo de intervalos | Não adotado; o projeto usa cálculo UTC próprio | Adotar somente se a regra de calendário exigir uma dependência |
| Vitest + Testing Library + MSW | Unitários, componentes e integração | Integrado; 22 arquivos e 44 testes passaram em 16/11/2026 | Manter rede determinística nos testes |
| Playwright | E2E e viewport | Integrado; 7 testes passaram e 1 foi pulado por projeto | Manter Chromium desktop/mobile e sweep responsivo |

Dependências adicionais precisam de justificativa em uma tarefa e no registro de decisão correspondente. A versão instalada deve ser compatível com Node/npm e confirmada pelo lockfile no momento da implementação.

## 3. Application Architecture

### 3.1 Camadas

```text
UI / layout / acessibilidade
        │
features (converter, history, market, preferences)
        │
hooks e estado de feature
        │
domínio (cálculos, períodos, filtros, ordenação, CSV)
        │
services / adapters / validação de DTO
        │
Axios → Frankfurter v2
```

- **UI:** recebe props tipadas, dispara eventos e renderiza estados.
- **Feature state:** mantém par, período, entrada, request status e preferências do contexto.
- **Domínio:** funções puras para conversão, intervalo, filtros, ordenação, paginação e CSV.
- **Services:** conhecem endpoint, parâmetros, cancelamento e transformação de resposta; não renderizam.
- **Adapters/validation:** convertem DTOs externos em modelos internos e rejeitam payload inválido.

### 3.2 Fonte de verdade e dados derivados

Estado compartilhado de página: `pair`, `period`, `amount`, filtros e página. Dados remotos: catálogo, taxa e série histórica. Derivados: valor convertido, variação, linhas filtradas, linhas ordenadas, página atual e contagem. A implementação centraliza esse estado em `useExchangeViewState`; não armazenar derivados em `useState` separado quando puderem ser calculados do estado atual.

### 3.3 Fluxo de dados

```text
catalog ──────────────► CurrencySelect
                           │
pair ──────────────────────┼──► getRate(base, quote) ─► converter
period ────────────────────└──► getHistory(base, quote, from, to)
                                      │
                              validate / normalize
                                      │
                              canonical history
                              ├──► chart
                              └──► filters → sort → count/export → pagination
```

### 3.4 Estado de requests

A implementação mantém `data`, `loading`, `error` e `stale` por hook. Um `AbortController` cancela a consulta anterior e uma flag de contexto impede que respostas obsoletas alterem a tela. O estado `empty` é derivado de uma resposta válida sem registros; `idle` não é exposto como estado visual separado. `stale-data` só pode ser mostrado quando o contexto ainda for o mesmo e o produto explicar que o dado não é novo.

### 3.5 Tratamento de erros

Normalizar erros de Axios, timeout, abort, HTTP e payload inválido para um tipo interno. Mensagens de usuário não devem expor stack, URL completa ou detalhes sensíveis. Logs de desenvolvimento podem registrar `feature`, endpoint lógico e status, sem PII.

## 4. Project Structure

Estrutura implementada e mantida incrementalmente:

```text
src/
├── app/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles/
│       ├── globals.css
│       └── tokens.css
├── assets/
├── features/
│   ├── currencies/
│   │   ├── api/currenciesApi.ts
│   │   ├── components/CurrencySelect.tsx
│   │   ├── components/CurrencyFlag.tsx
│   │   ├── constants/flagMap.ts
│   │   ├── hooks/useCurrencies.ts
│   │   └── types/currency.ts
│   ├── exchange/
│   │   ├── api/exchangeApi.ts
│   │   ├── components/CurrencyConverter.tsx
│   │   ├── components/CurrencyAmountField.tsx
│   │   ├── hooks/useExchangeRate.ts
│   │   ├── utils/convertAmount.ts
│   │   └── types/exchange.ts
│   ├── history/
│   │   ├── components/ExchangeRateChart.tsx
│   │   ├── components/PeriodSelector.tsx
│   │   ├── components/HistoryTable.tsx
│   │   ├── components/HistoryFilters.tsx
│   │   ├── components/Pagination.tsx
│   │   ├── hooks/useRateHistory.ts
│   │   ├── utils/filterHistory.ts
│   │   ├── utils/sortHistory.ts
│   │   ├── utils/getPeriodRange.ts
│   │   └── types/history.ts
│   ├── market/
│   │   ├── MarketOverview.tsx
│   │   └── market.css
│   ├── favorites/
│   │   └── hooks/useFavorites.ts
│   ├── export/
│   │   ├── components/ExportCsvButton.tsx
│   │   └── utils/exportCsv.ts
│   └── preferences/
│       ├── components/PreferencesPanel.tsx
│       └── hooks/usePreferences.ts
├── shared/
│   ├── components/ui/
│   ├── components/layout/
│   ├── components/feedback/
│   ├── lib/api/axiosClient.ts
│   ├── lib/format/
│   ├── constants/
│   ├── hooks/
│   └── types/
└── test/
    ├── mocks/
    ├── setup.ts
    └── smoke.test.tsx
tests/
└── e2e/
```

O caminho físico dos arquivos deve ser ajustado somente se a implementação justificar; a responsabilidade da pasta não deve ser duplicada.

## 5. Design System & Tokens

### 5.1 Fonte e limites

Fonte normativa local: `styleRef/HERMES_Design_System_Standalone.html`, derivada do Figma `00_DESIGN-GUIDE`, node `26:1408`. As telas de referência que devem orientar qualquer implementação futura são:

| Tela | Nó Figma | Dimensão | Uso técnico |
|---|---|---:|---|
| Visão geral desktop | `26:441` | 1440 × 1578 | Layout completo com sidebar, overview, conversor, gráfico e histórico resumido |
| Visão geral mobile | `26:616` | 390 × 2572 | Ordem mobile, cabeçalho, navegação, cards em 2 colunas e filtros/tabela empilhados |
| Histórico e análise | `77:47` | 1440 × 2040 | Tela analítica com filtros, indicadores e comparação de moedas |

O guia aprovado é **dark**. O arquivo registra 12 primitivas de cor, 12 aliases semânticos, escala de 4 px, 7 fundamentos tipográficos, 5 raios principais, 6 component sets e 24 variantes. O HTML contém estados e valores de demonstração que não devem ser tratados como tokens adicionais.

Implementação atual: os tokens estão em `src/app/styles/tokens.css`, o reset e os contratos globais em `src/app/styles/globals.css`, e os componentes de UI consomem variáveis semânticas HERMES. A validação automatizada cobre overflow horizontal nos sete pontos de viewport; ainda falta uma revisão visual/manual formal contra todos os frames Figma e uma auditoria WCAG completa.

Regra de implementação: o screenshot/contexto obtido pelo MCP do Figma é referência visual; a implementação deve permanecer em camadas editáveis e responsivas, usando os tokens abaixo. Não importar uma captura da tela como fundo nem usar URLs temporárias de assets do MCP em código. Quando a implementação for retomada, assets estáticos devem ser exportados pelo MCP, armazenados localmente e referenciados por seus arquivos versionados.

### 5.2 Cores

| Token primitivo | Valor | Token semântico | Uso |
|---|---|---|---|
| `canvas` | `#0D1412` | `color/background/canvas` | Fundo principal |
| `sidebar` | `#101A17` | `color/background/sidebar` | Navegação |
| `surface` | `#16221E` | `color/surface/default` | Cards/painéis |
| `raised` | `#1B2924` | `color/surface/raised` | Inputs/superfícies |
| `line` | `#263630` | `color/border/default` | Divisores |
| `control-line` | `#304039` | `color/border/control` | Controles |
| `foreground` | `#F1F5F2` | `color/text/primary` | Texto principal |
| `muted` | `#A7B7AE` | `color/text/secondary` | Texto secundário |
| `subtle` | `#82968B` | `color/text/subtle` | Metadados |
| `brand` | `#235C4B` | `color/action/primary` | Ação principal |
| `positive` | `#8BDEA6` | `color/status/positive` | Alta, gráfico e foco |
| `negative` | `#E49B9D` | `color/status/negative` | Queda e erro |

Referências de estado do guia: `brand-hover #226351`, `selected #2B4438`, `positive-soft #1C392A`. Não substituir a paleta HERMES por `green-600`, `emerald` ou outra escala genérica.

### 5.3 Tipografia

Família Inter, pesos 400/500/600/700, `font-variant-numeric: tabular-nums` em valores e taxas.

| Fundação | Tamanho / linha | Peso |
|---|---:|---:|
| H1 | 30 / 36 px | 600 |
| H2 | 24 / 32 px | 600 |
| H3 | 20 / 28 px | 600 |
| H4 | 18 / 28 px | 600 |
| Body large | 16 / 24 px | 400 |
| Body medium | 14 / 20 px | 400 |
| Caption small | 12 / 16 px | 400 |

### 5.4 Dimensões

- Espaçamento: 4, 8, 12, 16, 24, 32, 40, 48 e 64 px; `spacing-period-mobile = 10 px`; `spacing-7 = 28 px`.
- Raios: 6, 8, 12, 16 e 999 px.
- Receita de controle: `padding-inline 16 px`, `padding-block 12 px`.
- Receita de card: `padding 24 px`, `gap 16 px`; entre seções, `gap 32 px`.
- Não existe sombra oficial no guia atual; evitar sombras pesadas e gradientes decorativos.

### 5.5 Responsividade

Mobile-first: 375–430 px, tablet 768 px, desktop ≥1024 px e desktop grande 1280–1440 px. O layout de 390 px usa cards em duas colunas e empilha conversor/filtros; 1440 px usa sidebar visual de aproximadamente 248 px e quatro cards. 768/1024/1280 são pontos de validação pendentes no Figma, não novos tokens.

### 5.6 Estados interativos

Aplicar `default`, `hover`, `focus-visible`, `selected`, `disabled`, `loading` e `error` quando fizerem sentido. O foco deve ser identificável por contorno e nunca depender apenas da cor. Alvos de toque devem ter pelo menos 44 × 44 px quando apropriado.

### 5.7 Contrato visual das telas de referência

#### Visão geral desktop — `26:441`

- Canvas de 1440 px, com sidebar de 248 px e área de conteúdo de 1192 px.
- Top bar de 74 px, divisor inferior e controles de idioma à direita, status da API à esquerda e tema próximo aos controles globais.
- Conteúdo principal começa em aproximadamente `x=36`, com largura de 1120 px.
- Ordem obrigatória: visão do mercado → conversor → evolução da cotação → histórico detalhado.
- Overview com quatro cards de 271 × 154 px e gap de 12 px: EUR/USD, USD/BRL, GBP/USD e EUR/BRL.
- Conversor com painel de 1120 × 248 px; campos de moeda de aproximadamente 500 × 75 px e botão de swap circular de 52 px.
- Gráfico em painel de 1120 × 397 px; seletor dos oito períodos na mesma linha em desktop.
- Histórico resumido em painel de 1120 × 408 px, com filtros de 44 px de altura e ação CSV alinhada ao cabeçalho.

#### Visão geral mobile — `26:616`

- Canvas de 390 px com padding horizontal de 16 px e conteúdo de 358 px.
- Cabeçalho de 72 px; status/tema em linha separada; navegação principal com três itens de 44 px de altura.
- Cards de mercado em grade 2 × 2, aproximadamente 173 × 154 px, com gap de 12 px.
- Conversor empilhado; a ação de swap permanece acessível entre os campos.
- Períodos em duas linhas de quatro itens, cada item com aproximadamente 74 × 38 px e gap de 10 px.
- Filtros do histórico em duas colunas no mobile, com tabela de overflow próprio e sem scroll horizontal da página.

#### Histórico e análise — `77:47`

- Canvas desktop de 1440 px, com a mesma sidebar de 248 px e top bar de 74 px da visão geral.
- Conteúdo começa em aproximadamente `x=284`, `y=104`, com largura de 1120 px.
- Cabeçalho da tela, filtros de referência/data/moedas e ação de aplicar filtros.
- Quatro indicadores em cards de aproximadamente 262 × 280 px, com separadores internos e valores/legendas alinhados.
- Seção de comparação de moedas de aproximadamente 1120 × 532 px, com controles de métrica/período, grade percentual e séries comparáveis.
- Os valores exibidos no Figma são ilustrativos; a tela deve renderizar dados validados da fonte e mostrar vazio/indisponível quando não houver observações.

#### Asset e iconografia

Os nós de referência usam símbolo oficial HERMES, bandeiras BR/US/ES, indicadores de conexão, tema, mini-gráficos e série visual. A implementação deve reutilizar equivalentes locais exatos ou exports do MCP, preservar dimensões/slot e manter imagens dinâmicas quando o conteúdo vier da API. Ícones de ação devem seguir `@phosphor-icons/react`; não reconstruir ícones com linhas/retângulos arbitrários.

#### Tipografia aplicada

Usar Inter com os nomes de estilo do Figma: `Regular`, `Medium`, `Semi Bold` e `Bold`. Em particular, `Semi Bold` não deve ser escrito como `SemiBold` no carregamento de fontes. Textos longos devem ter largura definida e quebra vertical controlada; não usar posicionamento absoluto como regra de layout.

## 6. Component Architecture

| Componente | Responsabilidade | Props/estado principal | Variantes e testes |
|---|---|---|---|
| `AppShell` | Ordem semântica e regiões da aplicação | `children`, seção ativa | desktop/mobile; landmarks e navegação |
| `Sidebar` / `MobileNavigation` | Navegar entre Conversor, Histórico e Relatórios | `activeSection`, `onNavigate` | selected, teclado, foco |
| `SectionHeader` | Título, descrição e contexto | `eyebrow`, `title`, `description` | responsividade e hierarquia |
| `Button` | Ações reutilizáveis | `variant`, `size`, `loading`, `disabled`, `icon`, `onClick` | default/hover/focus/disabled/loading; nome acessível |
| `Input` | Entrada textual/númerica | `label`, `value`, `error`, `help`, `onChange` | inválido, foco, associação label/erro |
| `Select` / `CurrencySelect` | Seleção de opções | `options`, `value`, `searchable`, `onChange` | teclado, busca, vazio e código visível |
| `CurrencyFlag` | Bandeira opcional | `currencyCode`, `countryCode?` | fallback neutro, texto alternativo |
| `CurrencyAmountField` | Valor + moeda no conversor | `amount`, `currency`, `readOnly?`, callbacks | vazio, inválido, loading, tabular nums |
| `SwapCurrenciesButton` | Inverter par | `onSwap`, `disabled?` | nome acessível e foco |
| `ExchangeRateInfo` | Taxa, direção, data e aviso | `rate`, `date`, `base`, `quote`, `status` | sucesso, indisponível, fonte |
| `Card` / `Badge` | Superfície e status | `variant`, `children` | surface/raised, positive/negative |
| `FeedbackState` | Loading, erro, vazio, retry | `status`, `message`, `onRetry?` | anúncio, ação e sem dado fictício |
| `MarketOverview` / `MarketPairCard` | Cards P1 de quatro pares | `pairs`, `onSelectPair` | loading parcial, erro parcial, data |
| `PeriodSelector` | Seleção dos oito períodos | `value`, `options`, `onChange` | selected/default, teclado |
| `ExchangeRateChart` | Série histórica visual | `data`, `base`, `quote`, `status` | vazio/loading/tooltip responsivo |
| `HistoryFilters` | Inputs de data e cotação | `filters`, `onChange`, `onClear`, `error` | combinados, inválidos, reset |
| `HistoryTable` | Linhas canônicas e ordenação | `rows`, `sort`, `onSort` | tabela acessível, empty, scroll próprio |
| `Pagination` | Página e tamanho | `page`, `pageSize`, `total`, callbacks | disabled, teclado |
| `ExportCsvButton` | Download do resultado completo | `rows`, `context`, `disabled` | disponível/desabilitado/sucesso |
| `SavedPairsList` / `LanguageSelector` / `ThemeToggle` | P1 de preferências | valor e callbacks | armazenamento indisponível, labels |

Cada componente deve ter teste de renderização, interação principal, estados aplicáveis e acessibilidade. Componentes P1 não devem bloquear o núcleo P0.

Estado observado: os componentes base, feedback, layout, conversor, mercado, histórico, análise e exportação já existem. `SortButton` e `useFavorites` estão disponíveis no código, mas a ordenação por coluna e a lista dinâmica de favoritos ainda não estão conectadas ao fluxo principal. O `AppShell` exibe pares e status de API estáticos enquanto essa integração não é finalizada.

## 7. Custom Hooks

| Hook | Assinatura conceitual | Responsabilidade e efeitos | Testes |
|---|---|---|---|
| `useCurrencies` | `(enabled?) => { data, loading, error, stale, retry }` | Carregar, validar e cachear o catálogo por 24h | sucesso, payload inválido, erro, retry |
| `useExchangeRate` | `(base, quote, enabled?) => { data, loading, error, stale, retry }` | Consultar par, cancelar troca rápida e rejeitar resposta obsoleta | loading, swap, cancelamento, 4xx/5xx |
| `useRateHistory` | `(base, quote, from, to, enabled?) => { data, loading, error, stale, retry }` | Consultar e normalizar série para o intervalo | oito períodos, vazio, mudança de contexto |
| `useFavorites` | `() => { pairs, toggle, storageStatus }` | Persistir pares únicos e sobreviver a storage bloqueado | duplicata, parse inválido, fallback |
| `usePreferences` | `() => { locale, theme, setLocale }` | Persistir locale; manter tema dark-only | idioma e storage bloqueado |
| Pipeline de histórico | `filterHistory → sortHistory → paginateHistory` | Compor filtros, ordenação e paginação sem mutar a fonte | AND, desempate, página após filtro |

Não criar hook para cálculo trivial que possa ser função pura.

## 8. API Integration

### 8.1 Base e endpoints

Base URL: `https://api.frankfurter.dev/v2`. A documentação oficial consultada em 14/11/2026 confirma que v2 usa:

| Finalidade | Método/rota | Parâmetros |
|---|---|---|
| Catálogo | `GET /currencies` | `scope=all` apenas se necessário; padrão é o catálogo ativo |
| Cotação de par | `GET /rate/{base}/{quote}` | `base`, `quote`; `date`/`providers` são opcionais |
| Histórico | `GET /rates` | `from`, `to`, `base`, `quotes`; `group` não substitui os dados diários do MVP |
| Últimas taxas múltiplas | `GET /rates` | `base`, `quotes`; otimização P1 |
| Provedores | `GET /providers` | P2, caso atribuição detalhada seja aprovada |

O endpoint de série v2 retorna uma lista plana de registros; a API não oferece conversão pronta. A conversão é calculada pelo cliente a partir da taxa. Por padrão, as taxas podem combinar fontes; somente uma consulta explicitamente restringida pode ser atribuída a um provedor específico.

### 8.2 DTOs e modelos

```ts
export interface CurrencyDTO {
  iso_code: string;
  iso_numeric: string | null;
  name: string;
  symbol: string | null;
  start_date?: string;
  end_date?: string | null;
  [key: string]: unknown;
}

export interface ProviderAttributionDTO {
  key: string;
  date?: string;
  rate?: number;
  excluded?: boolean;
}

export interface ExchangeRateDTO {
  date: string | null;
  base: string;
  quote: string;
  rate: number;
  providers?: ProviderAttributionDTO[];
}

export interface CurrencyOption {
  code: string;
  name: string;
  symbol?: string;
}

export interface ExchangeRecord {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export type HistoryPeriod = '7D' | '15D' | '30D' | '3M' | '6M' | '1A' | '5A' | '10A';
export type AppLocale = 'pt-BR' | 'en-US' | 'es-ES';
```

`CurrencyDTO` é adaptado isoladamente porque a v2 usa objetos com `iso_code`, `name` e `symbol`; não usar o formato aninhado da v1. O adaptador deve rejeitar código vazio e preservar campos relevantes sem depender de todos os campos opcionais.

### 8.3 Cliente HTTP

Configuração implementada: Axios com base URL via `VITE_FRANKFURTER_API_URL`, fallback para `https://api.frankfurter.dev/v2`, timeout de 10.000 ms, `Accept: application/json` e propagação de `AbortSignal`. A URL pública não é segredo. Endpoints codificam o par e usam `params` para query string.

### 8.4 Validação e normalização

- Validar `date` como `YYYY-MM-DD` quando presente.
- Validar `base`/`quote` como códigos não vazios e normalizar para maiúsculas.
- Validar `rate` finito e maior que zero para registros de câmbio.
- Remover ou rejeitar registros inválidos conforme a decisão da feature; nunca convertê-los em zero.
- Ordenar por data ascendente antes de variações.
- Deduplicar somente se houver regra explícita para datas repetidas; registrar a decisão.

### 8.5 Erros e recuperação

| Situação | Comportamento |
|---|---|
| 400 | Erro de parâmetro; orientar correção, sem retry automático |
| 404 | Par, moeda ou registro indisponível; estado indisponível |
| 422 | Requisição não processável; mensagem amigável |
| Timeout/rede/5xx | Erro de conectividade, retry manual; no máximo um retry automático se implementado |
| Abort | Silenciar erro esperado e descartar resposta obsoleta |
| JSON inválido | Estado de erro de dados; não renderizar resposta parcial como correta |
| Array vazio | Estado sem cotações para o intervalo |

Cache observado: o catálogo usa TTL local de 24h em `TtlCache`. Cotação e histórico ainda não têm cache TTL ou deduplicação. Cache de cotação até 5 min e histórico por `base|quote|from|to` até 15 min continuam decisões P1, não garantias de atualização da fonte.

## 9. Data Models & Domain Logic

```ts
export interface CurrencyPair { base: string; quote: string }
export interface ExchangeViewState {
  pair: CurrencyPair;
  amount: string;
  period: HistoryPeriod;
  filters: HistoryFilters;
  page: number;
}
export interface HistoryFilters {
  from: string;
  to: string;
  minRate: string;
  maxRate: string;
}
export interface HistorySort {
  field: 'date' | 'rate';
  direction: 'asc' | 'desc';
}
export interface PaginationState { page: number; pageSize: number }
```

Funções puras obrigatórias:

- `convertAmount(amount, rate)`: aceitar zero, rejeitar inválidos/negativos e rejeitar resultado não finito.
- `calculatePercentageChange(first, last)`: retornar `null` quando faltar dado ou o primeiro valor não for positivo.
- `getPeriodRange(period, referenceDate)`: dias corridos para 7/15/30 e calendário para meses/anos, incluindo extremos conforme RN-015/RN-016.
- `filterHistory(records, filters)`: limites inclusivos e AND.
- `sortHistory(records, sort)`: data/taxa, direção e desempate determinístico sem mutar entrada.
- `paginate(records, pagination)`: aplicar somente depois de filtro e ordenação.
- `exportCsv(records, context)`: cabeçalho, data ISO, decimal, escape RFC 4180, BOM UTF-8 e nenhum arquivo para lista vazia.

Para séries longas, preservar todos os registros no modelo e no CSV. Se o gráfico precisar subamostragem, selecionar pontos existentes, conservar extremos e documentar a diferença visual.

## 10. Feature Specifications

### TECH-001 — Fundação do repositório

Requisitos relacionados: RNF-001, RNF-002, RNF-016, RNF-017. Responsabilidade: ajustar scripts, aliases, Tailwind, ambiente e gates sem alterar comportamento de produto. Fase: 1 — Foundation & Tooling.

### TECH-002 — Design System HERMES

Requisitos relacionados: RF-039, RF-041, RN-034, RNF-003 a RNF-005, RNF-018. Responsabilidade: tokens dark verificados, tipografia, estados e breakpoints. Fase: 2 — Design Foundation.

### TECH-003 — UI compartilhada

Requisitos relacionados: RNF-004, RNF-005, RNF-018. Responsabilidade: Button, controles, superfícies, feedback, foco e testes de acessibilidade. Fase: 3 — Shared UI & Accessibility.

Implementação atual: `src/shared/components/ui/` cobre Button, Input, Select, CurrencyAmountField, Card, Badge e Typography; `src/shared/components/feedback/` cobre loading, skeleton, erro com retry opcional e vazio. Todos usam os tokens HERMES e contratos semânticos. O conversor, histórico, análise, relatórios e exportação já compõem esses componentes.

### TECH-004 — Shell da aplicação

Requisitos relacionados: RF-039, RNF-003, RNF-004, RNF-018. Responsabilidade: ordem Mercado → Conversor → Evolução → Histórico, navegação P1 e containers responsivos. Fase: 4 — App Shell & Responsive Layout.

Implementação atual: `src/shared/components/layout/AppShell.tsx` fornece landmarks, sidebar desktop, navegação móvel e troca local entre Conversor, Histórico e Relatórios sem recarga. A sidebar ainda exibe pares salvos e status da API como composição estática; as telas de produto consultam a API e usam estados reais de loading, erro, stale e vazio.

### TECH-005 — Cliente e contratos de API

Requisitos relacionados: RF-001, RF-009, RF-017, RF-015, RN-001, RN-011, RN-030, RN-033, RNF-008 a RNF-010. Responsabilidade: Axios, DTOs, validação, erros, cancelamento e cache local. Fase: 5 — API & Data Contracts.

### TECH-006 — Catálogo de moedas

Requisitos relacionados: RF-001 a RF-007, RN-027. Responsabilidade: adaptador de `/currencies`, busca, seleção e mapa de bandeiras. Fase: 5 — API & Data Contracts.

### TECH-007 — Cotação e conversão

Requisitos relacionados: RF-008 a RF-015, RN-002 a RN-011, RNF-009, RNF-019. Responsabilidade: consulta de par, cálculo local, validação, formatação e estados. Fase: 6 — Domain State, Hooks & Formatting.

### TECH-008 — Histórico temporal

Requisitos relacionados: RF-017 a RF-022, RN-012 a RN-020, RNF-020. Responsabilidade: intervalos, série canônica, cancelamento e visualização. Fases: 6 e 8 — Domain State, Hooks & Formatting; History, Analysis & Export.

### TECH-009 — Domínio de cálculo

Requisitos relacionados: RF-010, RF-013, RF-022, RN-003, RN-005 a RN-008, RN-018. Responsabilidade: funções puras de conversão, variação e precisão de apresentação. Fases: 6 e 8 — Domain State, Hooks & Formatting; History, Analysis & Export.

### TECH-010 — Pipeline do histórico

Requisitos relacionados: RF-026 a RF-034, RN-017, RN-021 a RN-024. Responsabilidade: filtros, ordenação, contador e paginação derivados. Fases: 6 e 8 — Domain State, Hooks & Formatting; History, Analysis & Export.

### TECH-011 — Estado de features

Requisitos relacionados: RF-014, RF-020, RN-024, RNF-008, RNF-009. Responsabilidade: hooks de catálogo, taxa, histórico, preferências e resposta obsoleta. Fases: 5, 6, 7 e 9.

### TECH-012 — Feature Converter

Requisitos relacionados: RF-002, RF-004, RF-008 a RF-015, RF-043. Responsabilidade: composição do conversor P0, informação de fonte e estados. Fases: 6, 7 e 10.

### TECH-013 — Feature History

Requisitos relacionados: RF-017 a RF-034, RNF-003, RNF-018 e RNF-020. Responsabilidade: seletor de períodos, gráfico, tabela, filtros, sort, paginação e composição visual das telas `26:441`, `26:616` e `77:47`. Fase: 8 — History, Analysis & Export.

O histórico possui duas camadas de produto:

1. **Histórico P0:** série do par selecionado, gráfico, tabela, filtros, ordenação, contador, paginação e CSV.
2. **Histórico e análise da referência `77:47`:** filtros de moeda de referência/data/moedas comparadas, indicadores de média/mínima/máxima/volatilidade e comparação percentual. Essa composição já está implementada com dados da API para USD/EUR/GBP contra BRL, mas continua P1 para fins de aceite visual e de produto; não utilizar os números do Figma como dados reais.

O componente de comparação deve receber séries normalizadas, usar uma mesma data-base para todas as moedas e tratar ausência de histórico de 12 meses como estado informativo. A seção deve preservar a hierarquia, os espaçamentos e os tokens do Design Guide sem transformar coordenadas absolutas do Figma em uma implementação rígida.

### TECH-014 — Exportação

Requisitos relacionados: RF-035 a RF-038, RN-025/RN-026, RNF-010. Responsabilidade: gerar CSV local a partir do conjunto filtrado e ordenado. Fases: 8 e 10.

### TECH-015 — Experiência P1

Requisitos relacionados: RF-016, RF-023 a RF-025, RF-039 a RF-042, RN-028, RN-031/RN-032. Responsabilidade: overview, favoritos, preferências, idioma, tema e status da API desacoplados do MVP. Fases: 7 e 9.

### TECH-016 — Qualidade e release

Requisitos relacionados: RNF-003 a RNF-017, CA-01 a CA-10. Responsabilidade: testes unitários, integração, E2E, acessibilidade, desempenho, segurança, documentação e build. Fase: 10 — E2E, Documentation & Release.

### 10.1 Snapshot de implementação

| Bloco | Estado em 16/11/2026 | Observação |
|---|---|---|
| TECH-001 a TECH-004 | Implementados | Setup, tokens, UI base, feedback, shell e viewports de referência estão no código e cobertos por testes |
| TECH-005 a TECH-009 | Implementados | Axios, adapters, validação, catálogo, cotação, histórico, intervalos e cálculo local estão ativos |
| TECH-010 a TECH-014 | Implementados com limites | Pipeline de filtros/paginação, conversor, histórico, análise e CSV estão ativos; sort por coluna e projeção de colunas do relatório ainda precisam de conexão de UI |
| TECH-015 | Parcial | Hooks de favoritos/preferências existem, mas o shell usa composição estática; idioma não traduz o conteúdo e tema permanece dark-only |
| TECH-016 | Em revisão | Gates verdes localmente; não há PR ou merge confirmado; build mantém aviso de chunk grande |

## 11. Testing Strategy

### 11.1 Unitários

Vitest para funções puras e adaptadores: conversão, variação, períodos, filtro, sort, paginação, CSV, parser/formatter, mapa de bandeiras e validação de DTO. Cobrir zero, inválidos, overflow, datas de fim de mês/ano bissexto, limites inclusivos, empate, escape e listas vazias.

### 11.2 Componentes e integração

React Testing Library para interações e estados. MSW para simular respostas de catálogo, taxa, histórico, 400/404/422/5xx, timeout, vazio e atraso. Verificar que mudar o valor não gera novo HTTP, swap consulta novo par, período altera intervalo, filtros combinam por AND e CSV ignora paginação.

### 11.3 E2E

O smoke E2E atual cobre conversão com taxa mockada, navegação para histórico, tabela/CSV e ausência de overflow nas larguras 375, 390, 430, 768, 1024, 1280 e 1440 px, em Chromium desktop/mobile. Ainda faltam cenários automatizados específicos para swap, os oito períodos, ordenação por coluna, retry e preferências.

### 11.4 Acessibilidade e responsividade

Testar teclado, foco visível, nomes/descrições, `aria-invalid`, anúncio de erro/loading, contraste e ausência de rolagem horizontal geral nos sete breakpoints do PRD. A tabela pode ter overflow próprio com indicação visual.

### 11.5 Gates mínimos

Validação observada em 16/11/2026: `npm run lint` passou; `npm run typecheck` passou; `npm run test` passou com 22 arquivos e 44 testes; `npm run build` passou com aviso de chunk maior que 500 kB; `npm run test:e2e` passou com 7 testes e 1 cenário pulado por projeto. Esses gates não substituem revisão visual/manual, PR ou merge.

## 12. Performance, Accessibility & Security

- Usar `useMemo` apenas para pipeline de séries maiores; não otimizar prematuramente.
- Requisições limitadas a par/período necessários; cache curto e cancelamento evitam desperdício.
- Para 10A, manter dados completos e reduzir apenas a lista enviada ao gráfico se houver evidência de lentidão.
- Não logar valor pessoal de entrada, preferências ou conteúdo de armazenamento.
- `localStorage` deve ser tratado como indisponível, corrompido ou limpo sem quebrar P0.
- Todo controle deve ter label/nome acessível e estado de erro associado.
- CSV deve escapar aspas, quebras de linha e valores que possam ser interpretados como fórmula; não incluir conteúdo arbitrário sem sanitização.
- URL da API deve ser HTTPS e configurável somente por variável pública.
- O build atual gera um bundle JavaScript minificado acima do limite de aviso do Vite (~737 kB antes de gzip); code splitting é uma pendência de desempenho, não uma falha do gate.

## 13. Definition of Done técnica

Uma tarefa só pode ser `DONE` quando:

- escopo, requisitos e critérios da fase foram atendidos;
- testes aplicáveis foram criados/atualizados e aprovados;
- lint, typecheck e build/testes exigidos passaram;
- estados de loading, erro, vazio e acessibilidade foram considerados;
- documentação e matriz de rastreabilidade foram atualizadas;
- branch e commits seguem o fluxo documentado;
- Pull Request foi revisado e integrado de forma real; sem simular aprovação ou merge.

## 14. Decisões técnicas pendentes

| ID | Decisão | Dono/condição |
|---|---|---|
| TD-001 | A implementação atual usa cálculo UTC próprio em `getPeriodRange.ts`; confirmar se essa decisão permanece suficiente ou se uma biblioteca deve ser adotada. | Produto/engenharia antes da release |
| TD-002 | Confirmar limite de entrada RN-008. | Produto antes da Fase 6 |
| TD-003 | Definir política de deduplicação de datas repetidas. | Antes de concluir a Fase 5 |
| TD-004 | Aprovar tema claro e seus tokens; a implementação permanece dark-only. | Produto/design antes da Fase 9 |
| TD-005 | Confirmar cache P1 de cotação/histórico e tornar o indicador de API derivado de request real no shell. | Antes de concluir a Fase 9 |
| TD-006 | Confirmar cobertura adicional de E2E e browsers no CI; o baseline atual cobre Chromium desktop/mobile. | Antes da release |
| TD-007 | Conectar favoritos e preferências ao shell e substituir pares/status estáticos. | Antes de considerar TECH-015 concluído |
| TD-008 | Fazer colunas selecionadas e frequência do builder alterarem o CSV, ou reduzir o formulário ao escopo suportado. | Antes de considerar relatórios concluídos |

## 15. Referências externas verificadas

- [Frankfurter API v2 — documentação oficial](https://frankfurter.dev/pt/): endpoints, arrays de séries, moedas, fontes, erros e ausência de endpoint de conversão.
- [Design Guide local](styleRef/HERMES_Design_System_Standalone.html): tokens e referência visual disponível no repositório.
