# HERMES — Currency Exchange
## Product Requirements Document (PRD) + Technical Specification

| Campo | Definição |
|---|---|
| Produto | HERMES — Currency Exchange |
| Tipo | Single Page Application (SPA), frontend-only |
| Versão do documento | 1.0 |
| Data de elaboração | 14/11/2026 |
| Status | Especificação proposta, pronta para planejamento e desenvolvimento; decisões destacadas para validação |
| Fonte funcional principal | [Projeto 02 — Currency Exchange App (Notion)](https://app.notion.com/p/Projeto-02-Currency-Exchange-App-3e4dfca74d8d819ebfeedbdbe661d76e) |
| Fonte visual principal | [HERMES — Premium UX/UI (Figma)](https://www.figma.com/design/lXz8qLzcQWvYolE2odWoYj/HERMES-%E2%80%94-Currency-Exchange-%7C-Premium-UX---UI?node-id=26-2) |
| Design Guide | [Figma — 00_DESIGN-GUIDE](https://www.figma.com/design/lXz8qLzcQWvYolE2odWoYj/HERMES-%E2%80%94-Currency-Exchange-%7C-Premium-UX---UI?node-id=26-1408) |
| API oficial | [Frankfurter API v2](https://frankfurter.dev/pt/) |
| Stack | React, TypeScript, Vite, Tailwind CSS v4, Axios, Recharts, `@phosphor-icons/react`, `country-flag-icons` |
| Idioma do documento | Português (Brasil) |

> **Classificação de evidências:** **[NOTION]** = requisito originalmente descrito no briefing; **[FIGMA]** = funcionalidade ou padrão identificado no protótipo/Design Guide; **[PROPOSTA]** = decisão de produto/engenharia formulada neste PRD, sujeita a validação. Onde o Notion previa `fetch`, JavaScript e CSS Modules, este documento adota **Axios, TypeScript e Tailwind CSS v4**, conforme solicitado para a evolução HERMES.

---

## 1. Visão do produto

### 1.1 Problema

Usuários consultam múltiplos sites para pesquisar taxas de câmbio, realizam conversões manuais e organizam históricos em planilhas. A fragmentação dificulta a leitura da taxa efetiva, da evolução dos pares e a exportação estruturada para análise.

### 1.2 Solução

Criar uma aplicação web responsiva que centralize consulta de taxas **de referência**, conversão indicativa, monitoramento de pares, análise temporal, consulta tabular e exportação CSV. A experiência usará os dados da Frankfurter v2, respeitará o Design System HERMES e funcionará sem login e sem servidor próprio.

### 1.3 Proposta de valor

**“Câmbio claro. Decisões melhores.”** A plataforma deve tornar dados de câmbio compreensíveis, rastreáveis e exploráveis com poucos cliques.

### 1.4 Público-alvo

- Usuários que precisam converter valores entre moedas para consulta e planejamento pessoal.
- Estudantes, profissionais e analistas que precisam estudar tendências históricas e baixar informações.
- Usuários de desktop e mobile que desejam uma experiência consistente e acessível.

### 1.5 Objetivos mensuráveis propostos

| ID | Objetivo | Como validar |
|---|---|---|
| OBJ-01 | Concluir uma conversão válida com taxa real | Teste E2E de EUR → USD com API simulada e resultado calculado |
| OBJ-02 | Consultar todos os 8 períodos obrigatórios | Testes parametrizados de intervalos, requisições e renderização |
| OBJ-03 | Reproduzir dados históricos em gráfico e tabela | Comparação de valores com payload da API |
| OBJ-04 | Exportar apenas registros que passaram nos filtros | Verificação do CSV contra o conjunto filtrado |
| OBJ-05 | Manter uso funcional em 390 px e 1440 px | Testes visuais/responsivos |
| OBJ-06 | Evitar cotações inventadas ou classificadas como tempo real | Auditoria de textos, datas e atribuição de fontes |

### 1.6 Não objetivos

O HERMES **não** executará operações de câmbio, ordens, pagamentos, projeções preditivas, recomendações de investimento ou formação de preços de negociação. Não haverá autenticação, cadastro, backend próprio ou banco de dados no escopo inicial. **[NOTION]**

---

## 2. Fontes e diagnóstico do escopo

### 2.1 Requisitos explícitos do Notion

1. Seleção de moeda de origem/destino, valor e taxa da conversão.
2. Inversão de moedas, validação de valores e exibição da data efetiva.
3. Períodos históricos: `7D`, `15D`, `30D`, `3M`, `6M`, `1A`, `5A`, `10A`.
4. Gráfico e tabela de históricos reais, atualizados por par e intervalo.
5. Filtros de data e cotação mínima/máxima; combinação, limpeza e ordenação.
6. Contador de registros encontrados.
7. CSV local, com cabeçalhos, somente dados filtrados e bloqueio da exportação vazia.
8. Loading, erro, ausência de dados, responsividade e documentação.
9. Entrega de código-fonte, Figma, testes de API (Postman) e histórico Git.

> O briefing registra **27/10/2026** como prazo original da atividade educacional. Essa data já passou e **não deve ser reinterpretada como prazo da evolução HERMES** sem uma nova decisão de planejamento.

### 2.2 Elementos vistos no Figma V2

- **Desktop:** frame `26:441` (1440 px); **mobile:** frame `26:616` (390 px).
- Navegação: **Conversor**, **Histórico**, **Relatórios**.
- Cabeçalho com troca de idiomas PT/EN/ES, indicador da API e preferência de tema.
- Visão de mercado com quatro pares: EUR/USD, USD/BRL, GBP/USD e EUR/BRL.
- Conversor com valor de origem, valor convertido, botão swap, cotação efetiva e ação de salvar par.
- Sidebar/área mobile com **pares salvos** e remoção de itens.
- Gráfico com oito períodos, taxa destacada e variação percentual do período.
- Histórico detalhado com quatro campos de filtro, limpeza, contador, ordenação, paginação e CSV.
- Nota sobre fonte de dados e natureza indicativa das cotações.
- Elementos numéricos e séries dos protótipos são **ilustrativos**: o código não deve hardcodar taxas, variações ou datas fictícias.

### 2.3 Decisão de prioridades

| Prioridade | Definição | Entregas |
|---|---|---|
| **P0 — MVP obrigatório** | Requisito original do Notion necessário ao funcionamento principal | Conversor, moedas disponíveis, invert, histórico 8 períodos, Recharts, tabela, filtros, ordenação, CSV, estados e responsividade |
| **P1 — Experiência HERMES** | Recursos já representados no Figma e coerentes com a proposta | Overview 4 pares, variações, favoritos locais, paginação, i18n PT/EN/ES, tema, status real da API, navegação por seções |
| **P2 — Evolução futura** | Melhorias opcionais, não condicionantes de aceite do MVP | Compartilhamento por URL, comparação simultânea de múltiplos pares, preferências de fonte/provedor, exportação adicional, monitoramento avançado |

**Regra de planejamento:** o protótipo é fonte de verdade **visual** e evidencia funcionalidades, mas não transforma automaticamente uma interação ilustrativa em requisito P0. O PRD diferencia os níveis acima.

---

## 3. Jornadas e fluxos de usuário

### JOR-01 — Consultar e converter moedas

1. Usuário abre HERMES e vê um par padrão válido.
2. API fornece catálogo de moedas e taxa do par.
3. Usuário escolhe moeda de origem/destino e informa valor.
4. Conversão é calculada a partir da taxa vigente de referência.
5. Interface exibe resultado formatado, taxa, par, data efetiva e aviso indicativo.
6. Usuário pode inverter o par e refazer a consulta.

### JOR-02 — Analisar evolução histórica

1. Usuário escolhe par e período (`7D` a `10A`).
2. Sistema consulta histórico, ordena cronologicamente e apresenta linha temporal.
3. Sistema mostra valor inicial, final e variação do período, quando houver pelo menos duas observações válidas.
4. Tooltip mostra data e taxa real; tabela apresenta a série completa retornada.

### JOR-03 — Filtrar e exportar

1. Usuário abre histórico detalhado.
2. Define intervalo de datas e/ou taxas mínima e máxima.
3. Tabela atualiza resultados e contador.
4. Usuário ordena por data ou taxa, escolhe página e tamanho da página.
5. Sistema gera CSV do **conjunto filtrado e ordenado inteiro**, não apenas da página visível.

### JOR-04 — Monitorar pares preferidos (P1)

1. Usuário vê quatro cartões pré-configurados e pode abrir seus pares no conversor.
2. Salva um par e encontra-o na seção lateral (ou lista mobile).
3. Remove o par; suas preferências persistem apenas no navegador/dispositivo.
4. Valores exibidos nos cartões dependem dos dados da API, nunca de mocks de produção.

### JOR-05 — Personalização (P1)

1. Usuário escolhe idioma e/ou tema.
2. Interface traduz textos, ajusta formatos numéricos e conserva códigos ISO de moedas.
3. Preferências são mantidas localmente; a aplicação continua utilizável com armazenamento bloqueado.

---

## 4. Requisitos funcionais (RF)

**Legenda:** `P0` obrigatório; `P1` refinamento HERMES; `P2` futuro. Os requisitos abaixo utilizam o padrão **“O sistema deve...”** e IDs estáveis para rastreamento e testes.

### 4.1 Catálogo e seleção de moedas

| ID | Pri. | Requisito | Critério funcional de aceite | Origem |
|---|---|---|---|---|
| RF-001 | P0 | Consultar moedas suportadas na API v2 ao inicializar os controles. | Lista alimentada por `/v2/currencies`, sem assumir catálogo fixo. | NOTION |
| RF-002 | P0 | Selecionar moeda de origem e destino por código ISO. | Após escolher códigos válidos, estado e consultas refletem a escolha. | NOTION |
| RF-003 | P0 | Apresentar código e descrição da moeda nos seletores. | É possível distinguir `USD`, `EUR`, `BRL` etc. sem depender da bandeira. | PROPOSTA |
| RF-004 | P0 | Oferecer botão para inverter moedas. | Origem e destino trocam; cotação e histórico acompanham o novo par. | NOTION |
| RF-005 | P0 | Rejeitar códigos não presentes no catálogo retornado para consultas novas. | Não dispara requisição inválida; mensagem informativa é exibida. | PROPOSTA |
| RF-006 | P1 | Exibir ícone de bandeira quando houver mapeamento explícito moeda→país/território. | Moeda sem mapeamento usa ícone genérico; código permanece visível. | FIGMA/PROPOSTA |
| RF-007 | P1 | Permitir busca por código ou nome no seletor de moedas. | Busca não diferencia maiúsculas/minúsculas e aceita teclado. | PROPOSTA |

### 4.2 Conversão

| ID | Pri. | Requisito | Critério funcional de aceite | Origem |
|---|---|---|---|---|
| RF-008 | P0 | Aceitar valor monetário de origem editável. | Valor válido não negativo, dentro de faixa numérica segura, é interpretado corretamente. | NOTION |
| RF-009 | P0 | Consultar a cotação do par pelo endpoint de taxa individual. | Usa `/v2/rate/{base}/{quote}` com símbolos corretos. | NOTION |
| RF-010 | P0 | Calcular valor convertido localmente. | `converted = amount × rate` sem usar API de conversão inexistente. | NOTION |
| RF-011 | P0 | Apresentar valor convertido e símbolos/códigos de ambas as moedas. | Saída corresponde à multiplicação sem arredondamento prematuro. | NOTION |
| RF-012 | P0 | Exibir relação de cotação e data efetiva informada pelo provedor. | Usuário identifica `1 EUR = X USD` e a data exata do registro. | NOTION |
| RF-013 | P0 | Tratar entrada vazia, inválida, negativa, infinita ou muito grande. | Não exibe `NaN`/`Infinity` nem solicita cálculo sem validação. | NOTION/PROPOSTA |
| RF-014 | P0 | Atualizar cotação quando o par muda sem fazer nova requisição a cada tecla do valor. | Mudança de valor só recalcula no cliente; troca de par consulta dados. | PROPOSTA |
| RF-015 | P0 | Exibir estados loading/erro/dado indisponível e opção de tentar novamente. | Qualquer falha impede resultado enganoso e oferece recuperação. | NOTION |
| RF-016 | P1 | Salvar/remover pares favoritos no armazenamento local. | Pares únicos persistem após recarregamento na mesma origem/navegador. | FIGMA |

### 4.3 Visão do mercado e gráfico

| ID | Pri. | Requisito | Critério funcional de aceite | Origem |
|---|---|---|---|---|
| RF-017 | P0 | Consultar o histórico do par dentro de intervalo definido. | Usa `/v2/rates` com `from`, `to`, `base` e `quotes`. | NOTION |
| RF-018 | P0 | Exibir seletores para os oito intervalos obrigatórios. | Todos os períodos respondem e alteram o intervalo consultado. | NOTION |
| RF-019 | P0 | Renderizar gráfico de linha com Recharts e dados reais. | Série tem eixos rotulados, tooltip e unidade da cotação. | NOTION |
| RF-020 | P0 | Atualizar histórico após alteração do par ou período. | Resultado antigo não substitui consulta mais recente. | NOTION |
| RF-021 | P0 | Tratar ausência de histórico, intervalo sem observações e pontos repetidos. | Gráfico apresenta estado vazio significativo sem inventar observações. | PROPOSTA |
| RF-022 | P1 | Exibir resumo do último valor e variação percentual no período. | Usa primeiro e último pontos reais disponíveis, com data/legenda. | FIGMA |
| RF-023 | P1 | Exibir quatro cartões de mercado: EUR/USD, USD/BRL, GBP/USD, EUR/BRL. | Mostra taxa, data e variação calculada do registro imediatamente anterior disponível. | FIGMA |
| RF-024 | P1 | Permitir abrir par de um cartão ou favorito no conversor. | Seleção atualiza o estado compartilhado do par. | FIGMA/PROPOSTA |
| RF-025 | P1 | Exibir indicação de status da comunicação com API sem caracterizar monitoramento contínuo. | Estado se baseia no resultado das requisições, não em texto decorativo. | FIGMA/PROPOSTA |

### 4.4 Histórico tabular e filtros

| ID | Pri. | Requisito | Critério funcional de aceite | Origem |
|---|---|---|---|---|
| RF-026 | P0 | Exibir tabela com data, moeda origem, destino e cotação. | Cada linha corresponde a registro real da série retornada. | NOTION |
| RF-027 | P0 | Filtrar por data inicial e final. | Datas inclusivas e validadas; não permite início posterior ao fim. | NOTION |
| RF-028 | P0 | Filtrar por cotação mínima e máxima. | Limites inclusivos; mínimo maior que máximo é rejeitado. | NOTION |
| RF-029 | P0 | Aplicar simultaneamente todos os filtros ativos. | Resultado é a interseção das condições, não união. | NOTION |
| RF-030 | P0 | Limpar filtros. | Restaura histórico completo para o par/período consultado. | NOTION |
| RF-031 | P0 | Ordenar tabela por data e cotação, ascendente/descendente. | Ordenação determinística, com critério de desempate por data. | NOTION |
| RF-032 | P0 | Exibir contagem de registros filtrados. | Número considera todos os filtros e não depende da página atual. | NOTION |
| RF-033 | P0 | Apresentar estado vazio específico quando filtros retornam zero registros. | Mostra mensagem e ação Limpar filtros. | NOTION |
| RF-034 | P1 | Paginar registros, configurar itens por página e navegar entre páginas. | Paginação ocorre **após** filtro/ordenação e reinicia na página 1 após alterações. | FIGMA |

### 4.5 Exportação e navegação

| ID | Pri. | Requisito | Critério funcional de aceite | Origem |
|---|---|---|---|---|
| RF-035 | P0 | Exportar CSV no navegador sem backend. | Download gera arquivo válido UTF-8 com cabeçalhos. | NOTION |
| RF-036 | P0 | Exportar registros filtrados e ordenados, independentemente da paginação. | CSV tem exatamente N linhas de dados do conjunto filtrado, N = contador. | NOTION/PROPOSTA |
| RF-037 | P0 | Bloquear exportação quando não houver registros. | Botão desabilitado, sem gerar arquivo vazio. | NOTION |
| RF-038 | P0 | Nomear arquivo com produto, par e intervalo. | Ex.: `HERMES_EUR-USD_2026-10-01_2026-10-31.csv`. | NOTION/PROPOSTA |
| RF-039 | P1 | Oferecer navegação Conversor / Histórico / Relatórios. | As seções/âncoras são acessíveis por clique e teclado sem recarregar SPA. | FIGMA |
| RF-040 | P1 | Disponibilizar PT-BR, EN-US e ES-ES. | Textos e formatos locais mudam; códigos das moedas não mudam. | FIGMA |
| RF-041 | P1 | Disponibilizar preferência de tema escuro/claro. | Alternância não compromete legibilidade; tokens claros precisam ser definidos. | FIGMA/PROPOSTA |
| RF-042 | P1 | Restaurar preferências locais suportadas. | Idioma, tema e pares são preservados sem exigir login. | PROPOSTA |
| RF-043 | P0 | Identificar a fonte como Frankfurter e explicitar taxa de referência/indicativa. | Não há alegação de cotação negociável ou atualização segundo a segundo. | FIGMA/PROPOSTA |

---

## 5. Regras de negócio (RN)

| ID | Regra mandatória | Implicação técnica |
|---|---|---|
| RN-001 | A Frankfurter v2 é a única origem de dados cambiais no escopo. | Não usar mocks em produção nem combinar taxas inventadas. |
| RN-002 | A conversão é **indicativa**, não operação financeira. | Aviso legível de ausência de spread, impostos, tarifas e liquidação. |
| RN-003 | Fórmula: `valor_convertido = valor_origem × cotação(base→quote)`. | Taxa deve ser aplicada na direção correta. |
| RN-004 | A taxa representa **1 unidade da moeda base** na moeda de destino. | Exibir sentido e par, nunca apenas valor isolado. |
| RN-005 | Não arredondar a taxa antes do cálculo; arredondar **somente na apresentação** do resultado. | Preservar `rate` original em estado/processamento. |
| RN-006 | Formatação padrão: valores monetários com 2 casas, cotações com 4 casas; mais precisão visível se necessário para não apresentar zero enganoso. | `Intl.NumberFormat` e tooltip opcional com precisão original. |
| RN-007 | Valor de entrada pode ser **zero**, mas não negativo, não numérico, `NaN` ou infinito. | Zero converte em zero; mensagem específica para erro de preenchimento. |
| RN-008 | Limite de valor é definido para proteger a precisão segura do cálculo. | **[PROPOSTA]** aceitar até `1.000.000.000.000` unidades; falhar se o produto não for finito/seguro. |
| RN-009 | Mesmo código de origem e destino produz taxa lógica `1` e valor inalterado. | Não consultar API nesse cenário; histórico informativo “moedas idênticas”. |
| RN-010 | A troca de origem/destino não implica reutilizar inverso aproximado sem validação. | Consultar par na nova direção; não presumir `1/rate` como dado oficial. |
| RN-011 | A data de referência exibida é a **data retornada no registro**, não a data/hora local de acesso. | Exibir `rate.date`; pode diferir do dia atual. |
| RN-012 | Finais de semana, feriados e lacunas de publicação não são preenchidos com dados sintéticos. | Renderizar somente registros existentes; permitir intervalos sem pontos. |
| RN-013 | Períodos `7D`, `15D`, `30D` são dias **corridos**; `3M`, `6M`, `1A`, `5A`, `10A` usam subtração de meses/anos de calendário. | **[PROPOSTA]** usar datas `YYYY-MM-DD` e uma biblioteca de datas para evitar erros de mês/fuso. |
| RN-014 | A data final do período padrão é a data civil corrente de referência; a cotação exibida pode ser anterior. | Não tratar falta de cotação no último dia como erro total. |
| RN-015 | Para intervalos de N dias, incluir a data final e N−1 datas anteriores (ex.: 7D = 7 datas corridas). | Convenção precisa ser consistente e testada. |
| RN-016 | Em intervalos de meses/anos, usar `subMonths/subYears` na data final e incluir extremos conforme resultados da API. | Notar que períodos de calendário não têm duração fixa em dias. |
| RN-017 | Histórico deve ser ordenado por data cronológica antes de cálculo de variações. | `YYYY-MM-DD` pode ser comparado lexicograficamente se validado. |
| RN-018 | Variação percentual: `((última_taxa − primeira_taxa) / primeira_taxa) × 100`, somente com ≥2 taxas válidas e primeira taxa > 0. | Sem dados suficientes: “Variação indisponível”. |
| RN-019 | Variação dos cartões compara a última taxa com a observação **anterior disponível**, não necessariamente com “ontem”. | Exibir rótulo “vs. cotação anterior”. |
| RN-020 | Dados selecionados no gráfico e na tabela pertencem ao mesmo par e janela temporal. | Um único conjunto canônico de histórico, salvo otimização visual identificada. |
| RN-021 | Filtros de tabela são aplicados localmente ao histórico carregado, sem nova requisição por digitação. | Pipeline determinístico `dados → filtros → ordenação → paginação`. |
| RN-022 | Datas de filtro e limites de cotação são **inclusivos** e combinados por AND. | Testar extremos e combinações. |
| RN-023 | Data inicial posterior à final ou mínimo superior ao máximo torna o filtro inválido. | Sinalizar erro; não exibir resultado potencialmente incorreto. |
| RN-024 | Ao mudar par ou período, limpar filtros incompatíveis e reiniciar paginação para 1. | **[PROPOSTA]** evitar filtros invisíveis ou resíduos de outro contexto. |
| RN-025 | Exportar **todos** os registros filtrados e ordenados, mesmo se a tabela estiver paginada. | Não usar array da página atual para gerar CSV. |
| RN-026 | CSV contém `data`, `moeda_origem`, `moeda_destino`, `cotacao`, com data ISO, taxa em notação decimal e escape de campos. | **[PROPOSTA]** delimitador vírgula, aspas RFC 4180 e BOM UTF-8 para interoperabilidade. |
| RN-027 | Bandeiras representam países/territórios, enquanto moedas são identificadas por ISO 4217: associação deve ser explícita. | Ex.: `EUR→EU`, `USD→US`, `GBP→GB`, `BRL→BR`, `JPY→JP`; fallback quando não aplicável. |
| RN-028 | Não alterar códigos ISO nem dados numéricos com a mudança de idioma; apenas apresentação. | Idiomas `pt-BR`, `en-US`, `es-ES`; persistência de valores canônicos. |
| RN-029 | Valores ilustrativos do Figma não devem ser usados como dados em ambiente real. | Mock apenas em desenvolvimento/testes controlados. |
| RN-030 | No modo padrão da Frankfurter, dados podem combinar múltiplas fontes; não rotular toda taxa como “ECB”. | Rotular “Frankfurter / fontes oficiais”; usar `providers`/`expand=providers` apenas se origem específica for necessária. |
| RN-031 | Indicador “API conectada” só aparece após sucesso recente da consulta relevante. | Falha/ausência de rede altera estado; não prometer health check contínuo. |
| RN-032 | Favoritos não são duplicados; distinguir `EUR/USD` de `USD/EUR`. | Chave `{base}:{quote}`; persistência em `localStorage` (P1). |
| RN-033 | Disponibilidade de moeda e histórico varia conforme fontes e datas. | Mensagem honesta caso par/época não seja atendido. |
| RN-034 | O tema escuro do guia é aprovado visualmente; tema claro exige tokens próprios. | Não inverter cores automaticamente nem inventar paleta sem validação. |

### 5.1 Casos de borda mandatórios

- Valor `0`, campo vazio, letras, sinais isolados, excesso de decimais e separadores locais.
- `EUR→EUR`, troca de par durante requisição e várias trocas rápidas consecutivas.
- API responde 400, 404, 422, timeout, 5xx, JSON inesperado e sem conexão.
- Ausência de cotações no período solicitado; apenas 1 registro; séries muito longas.
- Cotação menor que `0,0001` — não mostrar `0,0000` sem opção de precisão adicional.
- Histórico com registros não ordenados, datas repetidas ou valores inválidos — validar/normalizar.
- Filtros resultando em zero linhas; exportação desabilitada; paginação após filtragem.
- Persistência local indisponível/limpa; itens favoritos desatualizados.

---

## 6. Requisitos não funcionais (RNF)

| ID | Categoria | Exigência verificável | Prioridade |
|---|---|---|---|
| RNF-001 | Arquitetura | SPA React + TSX com componentes funcionais; módulos por feature, hooks e serviços separados. | P0 |
| RNF-002 | Qualidade de tipos | `strict: true`; proibir `any` implícito; tipar DTOs da API, estados, props e utilitários. | P0 |
| RNF-003 | Responsividade | Sem scroll horizontal **da página** em 375, 390, 430, 768, 1024, 1280 e 1440 px. Tabelas podem usar scroll próprio com affordance. | P0 |
| RNF-004 | Acessibilidade | Almejar WCAG 2.2 AA: teclado, foco visível, nomes acessíveis, erros anunciados e não depender exclusivamente de cor. | P0 |
| RNF-005 | Contraste | Mínimo 4,5:1 para texto comum; 3:1 para texto grande; foco identificável. | P0 |
| RNF-006 | Desempenho UI | Meta em ambiente controlado: LCP ≤2,5 s em conexão de teste adequada; não atribuir atrasos externos à renderização. | P1 |
| RNF-007 | Desempenho interação | Troca local de filtros e ordenação em até 200 ms para séries usuais (até ~4 mil registros) em desktop de referência. | P1 |
| RNF-008 | Rede | Timeout HTTP configurado; abortar requisições obsoletas; desduplicação/cache curto. | P0 |
| RNF-009 | Resiliência | Loading, erro, vazio e stale-data claramente diferenciados; não exibir taxa de outro par. | P0 |
| RNF-010 | Segurança | Sem tokens sensíveis no bundle; URLs via HTTPS; dados da API validados; evitar injeção em CSV. | P0 |
| RNF-011 | Privacidade | Sem PII exigida; `localStorage` apenas para preferências/favoritos P1, sem dados pessoais sensíveis. | P0 |
| RNF-012 | Internacionalização | UI adaptável a PT/EN/ES, com formatação e tradução sem interpolar textos rígidos. | P1 |
| RNF-013 | Testabilidade | Vitest + React Testing Library, MSW e pelo menos um fluxo E2E automatizado com Playwright (**bibliotecas auxiliares sugeridas**). | P0 |
| RNF-014 | Compatibilidade | Últimas versões estáveis de Chrome, Edge, Firefox e Safari; mobile atual. | P1 |
| RNF-015 | Observabilidade | Falhas categorizadas com contexto não sensível (`endpoint`, `status`, `feature`) em desenvolvimento; mensagens amigáveis na UI. | P0 |
| RNF-016 | Manutenibilidade | ESLint/Prettier, imports consistentes, nomes previsíveis, documentação e commits semânticos. | P0 |
| RNF-017 | Build/entrega | `npm run build`, `npm run lint`, `npm run test` sem erros; deploy estático sem backend. | P0 |
| RNF-018 | Consistência visual | Usar tokens reais do Figma, componentes reutilizáveis, estados e layouts mobile-first; sem cores Tailwind genéricas substituindo a identidade. | P0 |
| RNF-019 | Precisão informativa | Sempre exibir data efetiva, código ISO e aviso de taxa de referência; cálculos verificáveis. | P0 |
| RNF-020 | Robustez do gráfico | Para 10 anos, preservar dados completos para tabela/CSV e reduzir apenas pontos renderizados, se necessário, sem inventar valores. | P1 |

**Nota de qualidade:** metas temporais devem ser medidas em ambiente, hardware e rede fixados pelo projeto. Não há SLA de disponibilidade/latência assegurado pela API pública no escopo desta especificação.

---

## 7. Integração Frankfurter API v2

**Base URL:** `https://api.frankfurter.dev/v2`

### 7.1 Endpoints adotados

| Finalidade | Método/rota | Parâmetros essenciais | Uso |
|---|---|---|---|
| Moedas disponíveis | `GET /currencies` | — | RF-001 |
| Cotação do par | `GET /rate/{base}/{quote}` | Base/quote ISO (ex.: `EUR/USD`) | RF-009 |
| Histórico do par | `GET /rates` | `from`, `to`, `base`, `quotes` | RF-017 |
| Últimas taxas por moeda | `GET /rates` | `base`, `quotes` | P1: otimização de cartões |
| Cotação em data específica | `GET /rate/{base}/{quote}?date=YYYY-MM-DD` | Opcional | Testes / P2 |
| Histórico por origem específica | `GET /rates?providers=ecb` | Opcional; restringe cobertura | P2 |
| Detalhes das fontes | `GET /providers` | — | P2 |

Exemplos de URLs:

```text
https://api.frankfurter.dev/v2/currencies
https://api.frankfurter.dev/v2/rate/EUR/USD
https://api.frankfurter.dev/v2/rates?from=2026-10-01&to=2026-10-31&base=EUR&quotes=USD
https://api.frankfurter.dev/v2/rates?base=EUR&quotes=USD,BRL
```

**Importante:** a **v1 é uma API diferente e está depreciada**. Não consumir `/v1/latest` nem assumir que `/v2/rates` retorna objeto aninhado `rates: { USD: ... }`. O endpoint v2 de histórico retorna **array de registros**; `GET /v2/rate/{base}/{quote}` retorna um único registro de taxa. A API **não oferece endpoint de conversão**.

### 7.2 Contratos de dados esperados

```ts
/** DTO mínimo usado pelo HERMES; campos opcionais podem evoluir na API. */
export interface ExchangeRateDTO {
  date: string;   // YYYY-MM-DD
  base: string;   // ISO 4217 ou ativo compatível com a API
  quote: string;
  rate: number;
  providers?: string[];
}

export type RateResponseDTO = ExchangeRateDTO;
export type HistoryResponseDTO = ExchangeRateDTO[];

export interface ExchangeRecord {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export type HistoryPeriod = '7D' | '15D' | '30D' | '3M' | '6M' | '1A' | '5A' | '10A';
export type AppLocale = 'pt-BR' | 'en-US' | 'es-ES';
```

**Catálogo de moedas:** consumir e normalizar a estrutura efetivamente devolvida por `/v2/currencies`; construir o adaptador `CurrencyDTO → CurrencyOption` de forma isolada e testar contra fixture capturada do endpoint. Evitar assumir previamente um formato legado da v1.

### 7.3 Exemplo de configuração Axios

```ts
// src/shared/lib/api/axiosClient.ts
import axios from 'axios';

export const frankfurterClient = axios.create({
  baseURL: 'https://api.frankfurter.dev/v2',
  timeout: 10_000,
  headers: { Accept: 'application/json' },
});

// src/features/exchange/api/exchangeApi.ts
import { frankfurterClient } from '@/shared/lib/api/axiosClient';
import type { ExchangeRateDTO } from '../types/exchange';

export async function getExchangeRate(base: string, quote: string, signal?: AbortSignal) {
  const { data } = await frankfurterClient.get<ExchangeRateDTO>(
    `/rate/${encodeURIComponent(base)}/${encodeURIComponent(quote)}`,
    { signal },
  );
  return data;
}

export async function getRateHistory(
  base: string, quote: string, from: string, to: string,
  signal?: AbortSignal,
) {
  const { data } = await frankfurterClient.get<ExchangeRateDTO[]>('/rates', {
    params: { base, quotes: quote, from, to },
    signal,
  });
  return data;
}
```

### 7.4 Política de erros e recuperação

- **HTTP 400:** parâmetros inválidos; mostrar ação corretiva e não repetir automaticamente.
- **HTTP 404:** moeda/par/registro inexistente; estado indisponível.
- **HTTP 422:** parâmetros ou par não processáveis; exibir erro validado.
- **Timeout / rede / 5xx:** exibir erro de conectividade, permitir retry manual; máximo de 1 retry automático apenas para falhas transitórias se implementado, nunca para erros 4xx.
- **Requisições concorrentes:** cancelar com `AbortController`, descartar respostas que não correspondam ao par/período atual.
- **Payload inválido:** validar `date`, `base`, `quote`, `rate` finito e >0; não propagar resultado incorreto.
- **Resposta vazia:** estado “Sem cotações para este intervalo”; não interpolar dados.
- **Cache P1:** catálogo até 24h, cotações até 5 minutos, histórico por chave `base|quote|from|to` até 15 minutos; são **valores propostos**, não garantias de atualização da Frankfurter. Persistência do cache não é obrigatória.

### 7.5 Fonte e precisão de comunicação

A documentação oficial informa que a Frankfurter combina taxas de múltiplas fontes por padrão; `providers=ecb` restringe a fonte. Assim, o HERMES deve indicar **“Taxas de referência obtidas via Frankfurter — fontes oficiais”**, exceto se o app solicitar explicitamente e verificar uma fonte particular. Dados são publicados ao longo do dia e não são ticks de mercado em tempo real.

---

## 8. Modelagem do frontend e cálculos

### 8.1 Estado de domínio

```ts
export interface CurrencyPair { base: string; quote: string }
export interface ExchangeViewState {
  pair: CurrencyPair;
  amountInput: string;
  period: HistoryPeriod;
}
export interface HistoryFilters {
  from?: string;
  to?: string;
  minRate?: number;
  maxRate?: number;
}
export interface HistorySort {
  field: 'date' | 'rate';
  direction: 'asc' | 'desc';
}
export interface PaginationState { page: number; pageSize: number }
```

**Fonte única de verdade:** `pair` e `period` vivem em estado compartilhado da página/feature; taxas e séries são dados remotos; `filteredRows`, `sortedRows`, `paginatedRows`, `convertedAmount` e `percentageChange` são **dados derivados**, não estados independentes duplicados.

### 8.2 Pipeline de dados

```text
Moedas disponíveis ───────────► CurrencySelect
                                     │
Usuário seleciona par ────────────────┤
                                     ├──► GET /rate/base/quote ─► converter
Período selecionado ──────────────────└──► GET /rates?from&to&base&quotes
                                                │
                                        validar / normalizar
                                                │
                                      histórico canônico
                                      ├──► Recharts (visualização)
                                      └──► filtros por AND
                                              └──► ordenação
                                                    ├──► contador
                                                    ├──► exportação CSV (todas as linhas)
                                                    └──► paginação (linhas visíveis)
```

### 8.3 Cálculos

```ts
export const convertAmount = (amount: number, rate: number): number => {
  if (!Number.isFinite(amount) || amount < 0 || !Number.isFinite(rate) || rate <= 0) {
    throw new Error('Valores inválidos para conversão');
  }
  const result = amount * rate;
  if (!Number.isFinite(result)) throw new Error('Resultado fora do intervalo suportado');
  return result;
};

export const calculatePercentageChange = (first: number, last: number): number | null =>
  Number.isFinite(first) && Number.isFinite(last) && first > 0
    ? ((last - first) / first) * 100
    : null;
```

**Atenção à precisão:** `number` é adequado à apresentação educacional de taxas indicativas, mas não equivale a um motor contábil de liquidação. Caso o produto evolua para cálculos transacionais, será necessária biblioteca decimal e política explícita de arredondamento.

### 8.4 Tratamento de longas séries

Para 5A/10A, manter **todos os registros do histórico** para tabela e CSV. Caso o gráfico fique lento, adotar um algoritmo de subamostragem **somente para renderização**, com seleção de pontos já existentes (preferencialmente preservando extremos e picos), nunca por interpolação inventada. Registrar a diferença entre dados exibidos e dados disponíveis em tooltip/legenda quando necessário. A opção `group=week|month` existe na API, mas não deve substituir silenciosamente os dados diários exigidos na tabela.

---

## 9. UI/UX e Design System HERMES

### 9.1 Referências Figma verificadas

| Artefato | Localização | Papel |
|---|---|---|
| Design Guide | Página `00_DESIGN-GUIDE`, `26:1408` | Tokens e diretrizes |
| Biblioteca de componentes | Seção `44:2` | Component sets e variantes |
| Desktop V2 | Frame `26:441` | Layout de 1440 px |
| Mobile V2 | Frame `26:616` | Layout de 390 px |
| Protótipos anteriores | Página `03_HIGH-FI` | Histórico de decisões; **não prevalecem** sobre V2 |

### 9.2 Tokens visuais verificados no guia

O Design Guide registra tema **dark**, família **Inter**, escala de 4 px, 12 primitivas de cor, 12 semânticas de cor e 16 variáveis de dimensões. Foram inventariados no guia 54 estilos de texto (47 legados + 7 de fundamento), 6 component sets e 24 variantes nativas. Alguns bindings de espaçamento/raio, estados interativos e responsividade intermediária ainda exigem revisão: não assumir implementação integral.

| Token HERMES | Valor hexadecimal | Utilização |
|---|---|---|
| `canvas` | `#0D1412` | Fundo principal |
| `sidebar` | `#101A17` | Navegação lateral |
| `surface` | `#16221E` | Cards/painéis |
| `raised` | `#1B2924` | Inputs e superfícies elevadas |
| `line` | `#263630` | Divisores/contornos |
| `control-line` | `#304039` | Borda dos controles |
| `foreground` | `#F1F5F2` | Texto principal |
| `muted` | `#A7B7AE` | Texto secundário |
| `subtle` | `#82968B` | Metadados |
| `brand` | `#235C4B` | Ação principal |
| `positive` | `#8BDEA6` | Alta e foco |
| `negative` | `#E49B9D` | Queda/erro |
| `brand-hover` | `#226351` | Hover de ações |

> A paleta é **customizada**; não substituir `brand` por `green-600`/`emerald-600`. Em Tailwind v4, criar tokens semânticos em `@theme`/CSS e usá-los consistentemente como `bg-canvas`, `text-foreground`, `border-line`, etc., após alinhamento da configuração.

**Tipografia:** Inter, pesos `400/500/600/700`, `font-variant-numeric: tabular-nums` em taxas e valores. Escala referenciada: `text-3xl` 30/36 (título), `text-2xl` 24/32 (número), `text-xl` 20/28 (seção), `text-lg` 18/28, `text-base` 16/24, `text-sm` 14/20, `text-xs` 12/16.

**Espaçamento:** 4, 8, 12, 16, 24, 32, 40, 48 e 64 px (`gap-1/2/3/4/6/8/10/12/16`). **Raios:** 6 px `rounded-md`, 8 px `rounded-lg`, 12 px `rounded-xl`, 16 px `rounded-2xl`, `rounded-full` para pílulas. Sem sombras pesadas nem gradientes decorativos.

**Componentes/variantes previstos:** `PeriodSelector/Item`, `FilterField/Value`, `Button/Action`, `Navigation/Item`, `CurrencyAmount/Field` e `SwapCurrencies/Button`. Implementar composição reutilizável e variantes `default`, `hover`, `focus`, `selected`, `disabled`, `loading` e `error` quando aplicável.

### 9.3 Layout e responsividade

- **Mobile-first**. Em 390 px: cards de mercado em 2 colunas, campos do conversor empilhados, filtros empilhados, navegação adaptada, tabela com acesso seguro aos dados.
- **Desktop (1440 px):** sidebar com largura visual de 248 px no protótipo, área principal com quatro cards de mercado e seções verticais.
- **768 / 1024 / 1280 px:** layouts intermediários a adaptar e validar; o guia indica pendência de revisão nesses breakpoints.
- Nenhuma ação ou rótulo essencial pode depender apenas de hover; alvos de toque com pelo menos 44×44 px quando apropriado.
- Ordem preservada: **Visão do mercado → Conversor → Evolução → Histórico detalhado**.

### 9.4 Telas e componentes necessários

| Área | Componentes sugeridos | Estados obrigatórios |
|---|---|---|
| Layout principal | `AppShell`, `Sidebar`, `Topbar`, `MobileNavigation`, `SectionHeader` | responsivo; menu ativo |
| Mercado | `MarketOverview`, `MarketPairCard`, `RateChangeBadge` | loading, erro parcial, indisponível |
| Conversor | `CurrencyConverter`, `CurrencyAmountField`, `CurrencySelect`, `CurrencyFlag`, `SwapCurrenciesButton`, `ExchangeRateInfo` | entrada inválida, loading, erro, sucesso |
| Histórico gráfico | `HistoryPanel`, `PeriodSelector`, `ExchangeRateChart`, `RateSummary` | loading, vazio, erro, tooltip |
| Histórico tabela | `HistoryTable`, `HistoryFilters`, `SortButton`, `Pagination`, `RecordCount` | vazio, erro, sort, filtro inválido |
| Exportação | `ExportCsvButton` | habilitado, desabilitado, sucesso local |
| Preferências P1 | `LanguageSelector`, `ThemeToggle`, `SavedPairsList`, `ApiStatus` | seleção, persistência, indisponível |
| Base UI | `Button`, `Input`, `Select`, `Card`, `Badge`, `Skeleton`, `EmptyState`, `ErrorState` | variantes e acessibilidade |

### 9.5 Bibliotecas de UI solicitadas

- **Ícones:** importar de `@phosphor-icons/react` (pacote atual, em vez do legado `phosphor-react`). Aplicar dimensões, pesos e cores conforme tokens.
- **Bandeiras:** importar SVG/React do `country-flag-icons/react/3x2`; `country-flag-icons` utiliza **ISO 3166 de países**, enquanto o domínio cambial usa **ISO 4217 de moedas**. Usar mapeamento explícito e fallback neutro.
- **Gráfico:** `Recharts` com `ResponsiveContainer`, `LineChart`, `Line`, `XAxis`, `YAxis`, `Tooltip`, `CartesianGrid` e estados de carregamento. Tooltip acessível também por dados tabulares.
- **Estilo:** Tailwind CSS v4 e tokens do Design Guide. Não introduzir CSS Modules como sistema principal; CSS dedicado pode ficar restrito a resets, tokens ou efeitos que justifiquem CSS puro.

---

## 10. Arquitetura frontend proposta

### 10.1 Stack e responsabilidades

| Tecnologia | Responsabilidade |
|---|---|
| React + TypeScript | Componentes, estados e contrato de tipos |
| Vite | Dev server, build e env vars públicas |
| Tailwind CSS v4 | Design tokens e estilização responsiva |
| Axios | Clientes HTTP, timeout, cancelamento e tratamento de erros |
| Recharts | Visualização histórica |
| `@phosphor-icons/react` | Iconografia |
| `country-flag-icons` | Bandeiras SVG via mapa moeda→país |
| `date-fns` **(sugerido)** | Intervalos de meses/anos e formatação de datas |
| Vitest, Testing Library, MSW, Playwright **(sugeridos)** | Testes unitários, integração e E2E |

### 10.2 Estrutura sugerida

```text
hermes-currency-exchange/
├── public/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── providers/
│   │   └── styles/
│   │       ├── globals.css
│   │       └── tokens.css
│   ├── features/
│   │   ├── currencies/
│   │   │   ├── api/currenciesApi.ts
│   │   │   ├── components/CurrencySelect.tsx
│   │   │   ├── components/CurrencyFlag.tsx
│   │   │   ├── constants/flagMap.ts
│   │   │   ├── hooks/useCurrencies.ts
│   │   │   └── types/currency.ts
│   │   ├── exchange/
│   │   │   ├── api/exchangeApi.ts
│   │   │   ├── components/CurrencyConverter.tsx
│   │   │   ├── components/CurrencyAmountField.tsx
│   │   │   ├── hooks/useExchangeRate.ts
│   │   │   ├── utils/convertAmount.ts
│   │   │   └── types/exchange.ts
│   │   ├── history/
│   │   │   ├── components/ExchangeRateChart.tsx
│   │   │   ├── components/PeriodSelector.tsx
│   │   │   ├── components/HistoryTable.tsx
│   │   │   ├── components/HistoryFilters.tsx
│   │   │   ├── components/Pagination.tsx
│   │   │   ├── hooks/useRateHistory.ts
│   │   │   ├── utils/filterHistory.ts
│   │   │   ├── utils/sortHistory.ts
│   │   │   ├── utils/getPeriodRange.ts
│   │   │   └── types/history.ts
│   │   ├── market/
│   │   │   ├── components/MarketOverview.tsx
│   │   │   ├── components/MarketPairCard.tsx
│   │   │   └── hooks/useMarketOverview.ts
│   │   ├── favorites/
│   │   │   ├── components/SavedPairsList.tsx
│   │   │   └── hooks/useSavedPairs.ts
│   │   ├── export/
│   │   │   ├── components/ExportCsvButton.tsx
│   │   │   └── utils/exportCsv.ts
│   │   └── preferences/
│   │       ├── components/LanguageSelector.tsx
│   │       ├── components/ThemeToggle.tsx
│   │       └── i18n/
│   ├── shared/
│   │   ├── components/ui/
│   │   ├── components/layout/
│   │   ├── hooks/
│   │   ├── lib/api/axiosClient.ts
│   │   ├── lib/format/
│   │   ├── constants/
│   │   └── types/
│   └── test/
│       ├── fixtures/
│       └── mocks/
├── docs/
│   ├── PRD_HERMES.md
│   ├── REQUIREMENTS.md
│   ├── COMPONENTS.md
│   ├── FIGMA.md
│   ├── API_TESTS.md
│   ├── FUNCTION_TESTS.md
│   ├── AI_USAGE.md
│   └── ADR/
├── postman/
│   └── hermes-frankfurter-v2.postman_collection.json
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

> **Organização documental:** este PRD pode ser mantido como `docs/PRD_HERMES.md`; `REQUIREMENTS.md` pode apontar para ele ou conter uma versão resumida com IDs. Evitar duas fontes divergentes de requisitos.

### 10.3 Gestão de estado

- `useState`/`useReducer` para estado de UI compartilhado no escopo do dashboard (par, período, filtros, idioma/tema).
- Custom hooks para regras reutilizáveis, fetch e ciclo de vida dos requests.
- `useEffect` para sincronização, com limpeza e `AbortController`; não usar efeitos para cálculos deriváveis.
- `useMemo` para filtro/ordenação/visualização de séries maiores; `useCallback` apenas quando necessário.
- Biblioteca de server-state (ex.: TanStack Query) **não é mandatória**. A primeira versão pode usar hooks com Axios, cache simples e cancelamento; adicionar dependência somente mediante justificativa.
- Fonte remota nunca deve ser regravada por formatações de localidade.

### 10.4 Configuração e deploy

- `.env.example`: `VITE_FRANKFURTER_API_URL=https://api.frankfurter.dev/v2` (valor **público**, sem segredo).
- Scripts: `dev`, `build`, `preview`, `lint`, `typecheck`, `test`, `test:coverage`, `test:e2e` (os últimos conforme ferramentas instaladas).
- Deploy em hospedagem estática com HTTPS; se houver client-side routes reais, configurar fallback para `index.html`.
- Assets estáticos de marca devem residir em `src/assets` ou `public`, conforme uso, respeitando material do Figma e licenças.

---

## 11. Casos de uso e critérios de aceite (Gherkin)

### CA-01 — Conversão válida

```gherkin
Dado que a API retorna uma taxa válida de 1 EUR para USD
E o usuário selecionou EUR como origem e USD como destino
Quando o usuário informa 100 EUR
Então o sistema calcula 100 × taxa retornada
E exibe o valor convertido na localidade selecionada
E informa a data efetiva da cotação e o par EUR/USD
```

### CA-02 — Inversão de par

```gherkin
Dado que o par atual é EUR/USD
Quando o usuário aciona “Inverter moedas”
Então o par passa a ser USD/EUR
E o sistema consulta a taxa do novo par
E atualiza gráfico, histórico e resumo sem reaproveitar indevidamente taxa antiga
```

### CA-03 — Oito períodos

```gherkin
Dado que existe histórico para o par
Quando o usuário seleciona cada um dos períodos 7D, 15D, 30D, 3M, 6M, 1A, 5A e 10A
Então a requisição contém limites de datas coerentes
E os dados do gráfico e tabela correspondem ao intervalo e ao par
```

### CA-04 — Filtros combinados

```gherkin
Dado que o histórico possui várias datas e taxas
Quando o usuário define data inicial/final e taxa mínima/máxima
Então são exibidos somente registros que atendem a TODAS as condições
E o contador informa a quantidade total filtrada
```

### CA-05 — CSV com paginação

```gherkin
Dado que 32 registros satisfazem os filtros
E a tabela está exibindo 10 registros por página
Quando o usuário aciona “Exportar CSV”
Então o arquivo gerado contém 32 linhas de dados e 1 linha de cabeçalho
E respeita a ordenação selecionada
E o nome do arquivo identifica par e período
```

### CA-06 — Exportação bloqueada

```gherkin
Dado que os filtros não retornam nenhum registro
Então o sistema mostra o estado vazio
E a ação “Exportar CSV” não fica disponível
```

### CA-07 — Consulta interrompida

```gherkin
Dado que o usuário solicita histórico EUR/USD
E antes da resposta troca para USD/BRL
Quando a resposta antiga de EUR/USD chegar tardiamente
Então ela não substitui o histórico de USD/BRL
E a UI mantém correspondência entre par, data e taxa
```

### CA-08 — Falha de API

```gherkin
Dado que a consulta retorna erro ou excede o timeout
Então o HERMES não mostra um valor fictício como atual
E informa o problema em linguagem compreensível
E disponibiliza “Tentar novamente” quando aplicável
```

### CA-09 — Mobile e acessibilidade

```gherkin
Dado que a aplicação é aberta em largura de 390 px
Quando o usuário navega somente por teclado e/ou toque
Então os campos, filtros, períodos, botões e exportação permanecem acessíveis
E a página não sofre rolagem horizontal geral
```

### CA-10 — Fonte dos dados

```gherkin
Dado que a cotação foi obtida pela Frankfurter sem restringir o provedor
Então a interface identifica a fonte como Frankfurter/fontes oficiais
E não afirma que a taxa é necessariamente do ECB
E não afirma que o preço é negociável em tempo real
```

---

## 12. Estratégia de testes

### 12.1 Testes unitários (Vitest)

| ID | Rotina | Casos obrigatórios |
|---|---|---|
| TU-01 | `convertAmount` | zero, taxa válida, negativos, NaN, infinito, overflow |
| TU-02 | `calculatePercentageChange` | subida, queda, zero, primeira taxa inválida |
| TU-03 | `getPeriodRange` | oito períodos, final de mês, ano bissexto, datas inclusivas |
| TU-04 | `filterHistory` | datas, mínimo, máximo, combinação AND, intervalos extremos |
| TU-05 | `sortHistory` | data e taxa asc/desc, desempates, sem mutar array de entrada |
| TU-06 | `exportCsv` | cabeçalho, escape, BOM, ordem, sem registros, valores especiais |
| TU-07 | `currencyFlagMap` | EUR, USD, GBP, BRL e sem mapeamento |
| TU-08 | parse/format | `pt-BR`, `en-US`, `es-ES`, não perder valor canônico |

### 12.2 Testes de integração (Testing Library + MSW)

- Catálogo de moedas correto e seletor funcional.
- Buscar cotação, alterar valor sem novo HTTP, inverter par.
- Buscar série, selecionar cada intervalo, exibir spinner e estado vazio.
- Erros 400/404/422/500 e timeout, retry e cancelamento.
- Filtros combinados, contador e botão CSV.
- Carregamento parcial de overview sem quebrar conversor.
- Persistência/remover favoritos e fallback sem storage (P1).

### 12.3 Testes E2E (Playwright)

1. Conversão completa do carregamento até a taxa formatada.
2. Alteração de par/período, gráfico e tabela sincronizados.
3. Filtros/ordenação/paginação e download CSV com conferência do conteúdo.
4. Fluxo mobile 390 px: navigation, conversão, gráfico e filtros.
5. Acessibilidade básica: foco, labels, botões, mensagens de erro.

### 12.4 Postman e evidências

- Collection com `/v2/currencies`, `/v2/rate/EUR/USD`, `/v2/rates?...`, casos inválidos e casos sem dado quando reproduzíveis.
- Documentar status HTTP, payload real observado, duração e comportamento da API em `docs/API_TESTS.md`.
- Screenshots e link do Figma em `docs/FIGMA.md`; funções testadas em `FUNCTION_TESTS.md`.
- Registrar decisões de uso de IA em `AI_USAGE.md` quando exigido pelo contexto educacional.

---

## 13. Plano de implementação incremental

| Fase | Prioridade | Entrega demonstrável | Exemplo de commit |
|---|---|---|---|
| F0 — Fundação | P0 | Vite React TS, lint/test, tokens Tailwind v4, shell responsivo | `chore: bootstrap hermes react typescript application` |
| F1 — UI base | P0 | Buttons, inputs, currency fields, containers, Figma responsivo | `feat: implement hermes design system foundations` |
| F2 — Integração | P0 | Axios, types, catálogo, taxa, erro/loading | `feat: integrate frankfurter v2 rates and currencies` |
| F3 — Conversão | P0 | Valor, pares, swap, validações, formatos | `feat: build currency converter and pair swap` |
| F4 — Histórico | P0 | Oito períodos e gráfico Recharts | `feat: add exchange rate historical chart` |
| F5 — Exploração | P0 | Tabela, filtros, ordenação, contador | `feat: implement historical data filtering and sorting` |
| F6 — Exportação | P0 | CSV filtrado, casos vazios, nomenclatura | `feat: export filtered exchange rates to csv` |
| F7 — Qualidade MVP | P0 | Responsividade, WCAG, testes, documentação | `test: cover converter history and csv workflows` |
| F8 — Experiência HERMES | P1 | Cards de mercado, favoritos, paginação | `feat: add market overview saved pairs and pagination` |
| F9 — Preferências | P1 | Idiomas, temas validados, indicadores API | `feat: support localization themes and api status` |
| F10 — Entrega | P0/P1 | Build, Postman, README, revisão contra Figma | `docs: finalize hermes documentation and release checklist` |

**Fluxo Git recomendado:** `main` estável; `dev` para integração quando fizer sentido; branches `feat/...`, `fix/...`, `refactor/...`, `test/...`. Commits progressivos e PRs pequenos; não esperar a entrega para versionar.

---

## 14. Matriz de rastreabilidade resumida

| Necessidade de negócio | Requisitos | Regras principais | Testes |
|---|---|---|---|
| Converter valor | RF-001–015 | RN-001–011 | TU-01, CA-01, CA-02 |
| Histórico de 8 períodos | RF-017–022 | RN-012–020 | TU-02/03, CA-03, CA-07 |
| Filtros e tabela | RF-026–034 | RN-021–024 | TU-04/05, CA-04 |
| Exportar CSV | RF-035–038 | RN-025/026 | TU-06, CA-05/06 |
| Overview e favoritos | RF-016, 023–025 | RN-019, 031/032 | Integração P1 |
| Idioma, bandeira e tema | RF-006/007, 040–042 | RN-027/028/034 | TU-07/08, E2E P1 |
| Informações confiáveis | RF-012/015/043 | RN-002/011/029/030/033 | CA-08/10 |
| UX responsiva e acessível | RF-039 | RNF-003/004/005/018 | CA-09 |

---

## 15. Riscos, dependências e decisões pendentes

| ID | Risco/pendência | Impacto | Decisão ou mitigação |
|---|---|---|---|
| R-01 | API externa pode ficar fora do ar, lenta ou indisponível. | Conversão/histórico comprometidos. | Timeout, retry manual, fallback de UI; não fabricar taxa. |
| R-02 | Frequência de publicação e alcance das moedas variam. | Dados de datas diferentes entre pares. | Mostrar data de cada taxa; avisar indisponibilidade. |
| R-03 | Padrão mistura fontes; Figma inclui menções a ECB. | Atribuição incorreta de taxa. | Usar “Frankfurter / fontes oficiais”, ou filtrar provedor explicitamente. |
| R-04 | Moedas não equivalem diretamente a países. | Bandeiras incorretas. | Mapa explícito ISO 4217 → ISO 3166 e fallback. |
| R-05 | 10 anos de dados afeta gráfico mobile/desempenho. | UI lenta, bundle/payload maiores. | Dados completos na tabela; subamostragem visual se necessária. |
| R-06 | Tema claro não está formalizado na paleta dark do Design Guide. | Inconsistência visual/acessibilidade. | Definir tokens light antes de implementação P1. |
| R-07 | Figma indica pendências 768/1280, focus/hover/loading e WCAG. | Divergência entre design e produção. | Implementar estados em código e validar protótipo visualmente. |
| R-08 | Comportamento exato de favoritos e paginação não foi formalizado no briefing. | Divergência de expectativa. | Assumir definições de RN-032 e RF-034; revisar ao finalizar P0. |
| R-09 | Formatação numérica local é ambígua com milhares/decimais. | Conversão errada de `1.234,56`. | Parser por locale testado; exibir sempre formato consistente. |
| R-10 | Dados de protótipo são fictícios. | Confusão sobre confiabilidade do produto. | Carregar dados reais e mostrar placeholders apenas como estado de loading. |

### 15.1 Defaults propostos para permitir implementação sem bloqueio

- Par inicial: **EUR/USD**, alinhado ao exemplo do Figma.
- Valor de exemplo ao carregar: **10.000,00**, editável, sem presumir transferência real.
- Período histórico inicial: **30D** (**proposta**, pois seleção inicial não está confirmada).
- Idioma inicial: **pt-BR**; tema inicial: **dark** (único com guia completo observado).
- Ordenação inicial: data **descendente**; tamanho inicial da página: **10 registros** (**proposta**).
- Pares de overview: EUR/USD, USD/BRL, GBP/USD e EUR/BRL, conforme Figma.
- Favoritos armazenados localmente sem login; sem limite artificial de três pares (três são os exemplares do protótipo).
- Filtros de tabela restringem o conjunto carregado; não alteram a série gráfica no MVP.
- Exportação CSV segue filtros + ordenação, mas ignora paginação.

---

## 16. Definição de pronto (Definition of Done)

### Checklist funcional P0

- [ ] Catálogo de moedas vem da API v2 e os seletores funcionam.
- [ ] Conversor opera com valor, taxa e data efetiva reais; swap e validações passam.
- [ ] Os oito períodos carregam histórico correto do par.
- [ ] Gráfico e tabela usam o mesmo conjunto de histórico validado.
- [ ] Filtros individuais e combinados, reset, ordenação e contador passam.
- [ ] CSV exporta todos os filtrados e não exporta conjunto vazio.
- [ ] Loading, erro, vazio e retries funcionam sem taxas fictícias.
- [ ] Componentes visuais seguem os tokens do Figma; layouts desktop/mobile são utilizáveis.
- [ ] Uso via teclado, foco, rótulos e contraste revisados.
- [ ] Build, lint, typecheck, testes unitários e integração concluídos.
- [ ] README, REQUIREMENTS/PRD, COMPONENTS, FIGMA, API_TESTS, FUNCTION_TESTS, AI_USAGE e Postman documentados.
- [ ] Histórico Git representa o desenvolvimento incremental.

### Checklist de evolução P1

- [ ] Cartões de mercado mostram quatro pares e variações verificáveis.
- [ ] Favoritos persistem, não duplicam e podem ser removidos.
- [ ] Paginação não reduz o conjunto exportado.
- [ ] PT/EN/ES incluem textos e formatos de números/datas.
- [ ] Tema claro usa tokens formalmente definidos e contrastes revisados.
- [ ] Indicador API reflete consulta bem-sucedida/falha e não finge tempo real.

---

## 17. Referências consultadas

**Requisitos e design**

1. [Notion — Projeto 02 / Currency Exchange App](https://app.notion.com/p/Projeto-02-Currency-Exchange-App-3e4dfca74d8d819ebfeedbdbe661d76e) — contexto, escopo original, documentação e entregáveis; lido em 14/11/2026.
2. [Figma — HERMES / 03_HIGH-FI](https://www.figma.com/design/lXz8qLzcQWvYolE2odWoYj/HERMES-%E2%80%94-Currency-Exchange-%7C-Premium-UX---UI?node-id=26-2) — telas V2 desktop e mobile; estrutura examinada em 14/11/2026.
3. [Figma — 00_DESIGN-GUIDE](https://www.figma.com/design/lXz8qLzcQWvYolE2odWoYj/HERMES-%E2%80%94-Currency-Exchange-%7C-Premium-UX---UI?node-id=26-1408) — tokens, componentes, diretrizes e pendências; examinado em 14/11/2026.

**API e bibliotecas**

4. [Frankfurter — documentação oficial v2 (PT)](https://frankfurter.dev/pt/) — endpoints, fontes, conversão, erros e parâmetros; consultado em 14/11/2026.
5. [Frankfurter — referência v1 (depreciada)](https://frankfurter.dev/pt/v1/) — apenas para evitar mistura entre versões.
6. [Phosphor Icons — pacote React](https://github.com/phosphor-icons/react/blob/master/README.md) — pacote recomendado `@phosphor-icons/react`.
7. [country-flag-icons — uso em React](https://github.com/catamphetamine/country-flag-icons/blob/master/README.md) — `country-flag-icons/react/3x2` e códigos de países.

---

## 18. Orientações objetivas para o Codex

1. **Ler este PRD integralmente antes de alterar código**, junto ao README e Design Guide/Figma.
2. Implementar **P0 antes de P1**, salvo dependências técnicas comuns.
3. Usar **React + TypeScript + Vite + Tailwind CSS v4 + Axios + Recharts + Phosphor Icons + country-flag-icons**; preservar modularização e acessibilidade.
4. Consumir **somente Frankfurter v2**; tipar/validar respostas e não confundir objetos v1 com arrays v2.
5. **Não hardcodar** taxas, datas, variações, quantidade de linhas nem conteúdo fictício do Figma.
6. Manter **uma fonte canônica do histórico** para gráfico, tabela, filtros, paginação e CSV.
7. Usar **tokens HERMES do Figma** em vez de cores arbitrárias; respeitar desktop 1440 e mobile 390, com adaptação aos breakpoints intermediários.
8. Associar bandeiras via **mapa explícito** moeda→país, com fallback seguro.
9. Implementar os testes de cada feature junto da feature, não apenas no final.
10. Ao concluir cada fase, registrar arquivos criados, decisões, testes executados, limitações e sugestão de commit.

**Resultado esperado:** aplicação SPA HERMES visualmente alinhada à V2 do Figma, funcional sobre dados reais da Frankfurter, com conversão, histórico, filtros, relatórios e CSV verificáveis, arquitetura sustentável e documentação rastreável.
