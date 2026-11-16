# HERMES — Currency Exchange
## Product Requirements Document (PRD)

| Campo | Definição |
|---|---|
| Produto | HERMES — Currency Exchange |
| Tipo | Aplicação web de página única, frontend-only |
| Versão | 2.1 — consolidação da implementação observada |
| Data | 16/11/2026 |
| Status | MVP frontend implementado na branch `dev`, em revisão; P1 parcial e release ainda não concluídos |
| Idioma deste documento | Português do Brasil |
| Fonte funcional | [Projeto 02 — Currency Exchange App (Notion)](https://app.notion.com/p/Projeto-02-Currency-Exchange-App-3e4dfca74d8d819ebfeedbdbe661d76e) |
| Fonte visual | [HERMES — Premium UX/UI (Figma)](https://www.figma.com/design/lXz8qLzcQWvYolE2odWoYj/HERMES-%E2%80%94-Currency-Exchange-%7C-Premium-UX---UI?node-id=26-2) |
| Design Guide | [00_DESIGN-GUIDE no Figma](https://www.figma.com/design/lXz8qLzcQWvYolE2odWoYj/HERMES-%E2%80%94-Currency-Exchange-%7C-Premium-UX---UI?node-id=26-1408) |
| Fonte cambial | [Frankfurter API v2](https://frankfurter.dev/pt/) |

> Classificação de evidência: **[NOTION]** veio do briefing funcional; **[FIGMA]** foi identificado no protótipo ou no Design Guide; **[PROPOSTA]** é uma decisão de produto sujeita a validação. A presença visual no Figma não transforma automaticamente um recurso em requisito P0.

## 0. Estado atual da entrega

Este PRD continua sendo a fonte do **o quê** do produto. A tabela abaixo registra a implementação observada em 16/11/2026, sem transformar código parcial em requisito concluído.

| Área | Situação observada | Evidência principal |
|---|---|---|
| Conversor P0 | Implementado | Catálogo, cotação do par, cálculo local, troca de moedas, estados de loading/erro e fonte em `src/features/exchange/` e `src/features/currencies/` |
| Histórico P0 | Implementado | Oito períodos, gráfico Recharts, tabela, filtros, contador, paginação e CSV em `src/features/history/` e `src/features/export/` |
| Análise histórica P1 | Implementada como composição funcional | Comparação USD/EUR/GBP contra BRL, métricas, variação, volatilidade e filtros em `HistoricalAnalysisPage.tsx` |
| Navegação e responsividade | Implementadas | `AppShell`, navegação desktop/mobile e sweep E2E em 375–1440 px |
| Favoritos, idioma e tema | Parciais | Existem hooks/controles de base, mas a integração com o shell ainda não está concluída; tema permanece dark-only |
| Builder de relatórios | Parcial | Formulário, pré-visualização e CSV existem; colunas selecionadas e frequência ainda não alteram o payload exportado; Excel permanece desabilitado |
| Qualidade | Gates locais verdes | Lint, typecheck, 22 arquivos/44 testes Vitest, build e 7 testes Playwright passaram; o build emite aviso de chunk >500 kB |
| Release | Em revisão | Branch `dev`; não há PR ou merge de release confirmado |

## 1. Product Overview

### 1.1 Problema

Usuários consultam várias fontes para pesquisar taxas de câmbio, fazem conversões manuais e organizam históricos em planilhas. A fragmentação dificulta entender a taxa efetiva, acompanhar a evolução de um par e exportar dados de forma estruturada.

### 1.2 Solução

O HERMES centraliza consulta de taxas de referência, conversão indicativa, análise temporal, consulta tabular, filtros e exportação CSV em uma experiência web responsiva, sem login e sem servidor próprio.

### 1.3 Proposta de valor

**Câmbio claro. Decisões melhores.** O produto deve tornar dados cambiais compreensíveis, rastreáveis e exploráveis com poucos cliques, deixando clara a data e a natureza indicativa de cada taxa.

### 1.4 Público-alvo e personas

| Persona | Necessidade principal | Resultado esperado |
|---|---|---|
| Usuário de planejamento | Converter valores para uma decisão pessoal ou operacional | Obter valor indicativo, par, taxa e data sem cálculo manual |
| Estudante ou pesquisador | Observar tendências de um par ao longo do tempo | Comparar períodos e consultar a série histórica |
| Profissional ou analista | Filtrar e levar dados para outra análise | Encontrar registros, ordenar e exportar o conjunto filtrado |

### 1.5 Objetivos de negócio

| ID | Objetivo | Como validar |
|---|---|---|
| OBJ-01 | Permitir uma conversão válida com uma taxa de referência real | Fluxo de conversão concluído com resposta de API controlada |
| OBJ-02 | Permitir consulta dos oito períodos obrigatórios | Todos os períodos alteram a série apresentada |
| OBJ-03 | Reproduzir o histórico no gráfico e na tabela | Datas e valores correspondem à série recebida |
| OBJ-04 | Exportar somente registros que passaram pelos filtros | CSV contém o conjunto filtrado e ordenado completo |
| OBJ-05 | Manter uso funcional em 390 px e 1440 px | Validação responsiva e E2E |
| OBJ-06 | Evitar cotações inventadas ou apresentadas como tempo real | Auditoria de estados, textos, datas e fonte |

### 1.6 Escopo do MVP

O MVP P0 inclui:

- catálogo de moedas;
- seleção de origem e destino, troca de par e valor de entrada;
- conversão indicativa com taxa e data efetiva;
- histórico nos períodos `7D`, `15D`, `30D`, `3M`, `6M`, `1A`, `5A` e `10A`;
- gráfico e tabela da mesma série histórica;
- filtros de data e cotação, combinação, limpeza, ordenação e contador;
- exportação CSV do conjunto filtrado e bloqueio quando não houver registros;
- estados de carregamento, erro, vazio e indisponibilidade;
- responsividade, acessibilidade e identificação honesta da fonte.

### 1.7 Evoluções previstas

P1 representa a experiência HERMES já mostrada no Figma: visão de quatro pares, favoritos locais, paginação, navegação por seções, idiomas PT/EN/ES, preferência de tema e indicador do estado da API.

P2 representa possibilidades futuras: compartilhamento por URL, comparação simultânea de pares, escolha de fonte/provedor e formatos adicionais de exportação. P2 não condiciona o aceite do MVP.

### 1.8 Fora dos objetivos

O HERMES não executa operações cambiais, ordens, pagamentos ou liquidação; não oferece preço negociável, previsão, recomendação de investimento ou formação de preço; não exige autenticação, cadastro, backend próprio ou banco de dados no escopo inicial.

## 2. Product Scope

### 2.1 Incluído

| Prioridade | Entregas |
|---|---|
| P0 | Conversor, catálogo, histórico, gráfico, tabela, filtros, ordenação, CSV, estados e responsividade |
| P1 | Overview de quatro pares, favoritos locais, paginação, navegação por seções, idiomas, tema e status de API |
| P2 | Compartilhamento, comparação de vários pares, fonte selecionável e exportações adicionais |

### 2.2 Premissas

- O usuário aceita uma consulta indicativa e entende que a taxa pode não representar o momento atual de negociação.
- A fonte cambial disponível é a Frankfurter v2.
- Dados históricos podem ter lacunas, datas sem publicação ou cobertura diferente entre moedas.
- O navegador oferece APIs padrão para armazenamento local e download; o produto continua utilizável se o armazenamento estiver bloqueado.
- EUR/USD é o par inicial proposto; `pt-BR` e tema escuro são as preferências iniciais propostas.

### 2.3 Restrições

- Não fabricar taxas, variações, datas ou registros para preencher uma tela.
- O código ISO da moeda deve permanecer visível mesmo quando não houver bandeira correspondente.
- O tema claro não está aprovado no Design Guide atual.
- A data mostrada deve ser a data do registro da fonte, não a data local de acesso.
- O prazo de 27/10/2026 registrado no briefing original já passou e não é prazo vigente desta evolução.

### 2.4 Dependências externas

- Disponibilidade, cobertura, calendário de publicação e limites operacionais da Frankfurter.
- Figma V2 e Design Guide como referência visual; estados intermediários e WCAG final ainda precisam de validação.
- Conteúdo e decisões de produto pendentes listados na seção 10.

## 3. Functional Requirements

Cada requisito abaixo tem um identificador permanente. As referências cruzadas para arquitetura e tarefas estão em `TECH_SPEC.md` e `TASKs_SPEC.md`.

### 3.1 Catálogo e seleção de moedas

| ID | Nome | Descrição e objetivo | Entradas / saídas | Critérios de aceitação | Prioridade | Dependências |
|---|---|---|---|---|---|---|
| RF-001 | Catálogo suportado | Consultar o catálogo disponível na fonte ao inicializar os controles. | Entrada: catálogo atual. Saída: opções disponíveis. | A lista apresentada vem da fonte e não de um catálogo fixo embutido. | P0 | — |
| RF-002 | Seleção por código | Permitir selecionar origem e destino por código ISO. | Entrada: dois códigos válidos. Saída: par selecionado. | Seleções válidas atualizam o par usado nas consultas e na tela. | P0 | RF-001 |
| RF-003 | Identificação da moeda | Apresentar código e descrição da moeda. | Entrada: opção de moeda. Saída: código e nome legíveis. | Usuário distingue USD, EUR, BRL e outras opções sem depender apenas de ícone. | P0 | RF-001 |
| RF-004 | Inverter moedas | Trocar origem e destino. | Entrada: par atual. Saída: par invertido. | Origem, destino, cotação, histórico e valor exibido acompanham a troca. | P0 | RF-002 |
| RF-005 | Validar código | Rejeitar códigos que não estejam disponíveis para uma nova consulta. | Entrada: seleção inválida. Saída: mensagem orientativa. | Não há consulta com código inválido e o erro é compreensível. | P0 | RF-001 |
| RF-006 | Bandeira associada | Exibir bandeira quando houver associação explícita moeda-país/território. | Entrada: código ISO de moeda. Saída: bandeira ou fallback neutro. | Moeda sem associação continua identificada pelo código. | P1 | RF-002 |
| RF-007 | Buscar moeda | Permitir busca por código ou nome. | Entrada: texto e teclado. Saída: opções filtradas. | Busca ignora diferença entre maiúsculas e minúsculas e é operável por teclado. | P1 | RF-001, RF-003 |

### 3.2 Conversão

| ID | Nome | Descrição e objetivo | Entradas / saídas | Critérios de aceitação | Prioridade | Dependências |
|---|---|---|---|---|---|---|
| RF-008 | Valor de origem | Aceitar valor monetário editável. | Entrada: valor não negativo. Saída: valor convertido. | Valor válido dentro da faixa aprovada é interpretado corretamente. | P0 | RF-002 |
| RF-009 | Cotação do par | Obter a cotação do par escolhido. | Entrada: origem e destino. Saída: taxa e data. | Taxa e data correspondem ao par selecionado. | P0 | RF-001, RF-002 |
| RF-010 | Calcular conversão | Calcular o resultado a partir do valor e da taxa retornada. | Entrada: valor e taxa. Saída: valor convertido. | Resultado é equivalente a valor × taxa, sem arredondamento prematuro. | P0 | RF-008, RF-009 |
| RF-011 | Exibir resultado | Mostrar valor convertido, códigos/símbolos e relação da cotação. | Entrada: resultado válido. Saída: resultado formatado. | Usuário identifica o sentido de 1 unidade da origem na moeda de destino. | P0 | RF-010 |
| RF-012 | Data efetiva | Informar a data associada ao registro da taxa. | Entrada: data da fonte. Saída: data visível. | A data exibida não é substituída pela data/hora local do acesso. | P0 | RF-009 |
| RF-013 | Entrada inválida | Tratar vazio, texto, negativo, infinito e número fora da faixa. | Entrada: conteúdo inválido. Saída: erro de preenchimento. | Não aparece `NaN`, `Infinity` ou resultado enganoso. | P0 | RF-008 |
| RF-014 | Recalcular localmente | Recalcular ao mudar o valor sem nova consulta por tecla; consultar ao mudar o par. | Entrada: alteração de valor/par. Saída: cálculo ou nova taxa. | Digitar valor não gera uma requisição para cada tecla. | P0 | RF-009, RF-010 |
| RF-015 | Estados da conversão | Exibir carregamento, erro, indisponibilidade e recuperação. | Entrada: estado da consulta. Saída: estado visual e ação. | Falha não exibe taxa antiga como se fosse atual e oferece tentativa quando aplicável. | P0 | RF-009 |
| RF-016 | Favoritar par | Salvar e remover pares no navegador. | Entrada: par. Saída: lista local. | Pares únicos persistem no mesmo navegador e podem ser removidos. | P1 | RF-002 |

### 3.3 Visão de mercado e histórico gráfico

| ID | Nome | Descrição e objetivo | Entradas / saídas | Critérios de aceitação | Prioridade | Dependências |
|---|---|---|---|---|---|---|
| RF-017 | Série histórica | Consultar o histórico do par no intervalo escolhido. | Entrada: par, início e fim. Saída: série de registros. | Série pertence ao par e à janela solicitados. | P0 | RF-002 |
| RF-018 | Oito períodos | Oferecer 7D, 15D, 30D, 3M, 6M, 1A, 5A e 10A. | Entrada: período. Saída: série correspondente. | Cada opção altera o intervalo de forma coerente. | P0 | RF-017 |
| RF-019 | Gráfico de linha | Visualizar a série real com eixos, unidade e tooltip. | Entrada: série validada. Saída: gráfico legível. | Gráfico não usa valores ilustrativos do protótipo como produção. | P0 | RF-017 |
| RF-020 | Sincronizar histórico | Atualizar gráfico e tabela quando par ou período mudar. | Entrada: novo contexto. Saída: série correspondente. | Resposta antiga não substitui contexto mais recente. | P0 | RF-017, RF-026 |
| RF-021 | Histórico vazio | Tratar ausência de observações, pontos repetidos ou inválidos. | Entrada: série vazia/incompleta. Saída: estado vazio explicativo. | Não são inventados pontos para preencher o gráfico. | P0 | RF-017 |
| RF-022 | Resumo de variação | Mostrar último valor e variação quando houver dados suficientes. | Entrada: ao menos duas observações válidas. Saída: resumo. | Usa primeiro e último pontos reais; sem dados suficientes informa indisponibilidade. | P1 | RF-017 |
| RF-023 | Cards de mercado | Exibir EUR/USD, USD/BRL, GBP/USD e EUR/BRL. | Entrada: taxas dos pares. Saída: quatro cartões. | Taxa, data e variação vêm de dados da fonte, nunca de números fictícios. | P1 | RF-017 |
| RF-024 | Abrir par | Permitir abrir um par de cartão ou favorito no conversor. | Entrada: ação sobre par. Saída: conversor com par escolhido. | O conversor passa a refletir o par selecionado. | P1 | RF-016, RF-023 |
| RF-025 | Estado da fonte | Indicar o resultado recente da comunicação com a fonte. | Entrada: sucesso/falha da consulta relevante. Saída: status compreensível. | Não promete monitoramento contínuo nem conexão sem consulta bem-sucedida. | P1 | RF-015 |

### 3.4 Histórico tabular, filtros e exportação

| ID | Nome | Descrição e objetivo | Entradas / saídas | Critérios de aceitação | Prioridade | Dependências |
|---|---|---|---|---|---|---|
| RF-026 | Tabela histórica | Mostrar data, origem, destino e cotação. | Entrada: série canônica. Saída: linhas tabulares. | Cada linha corresponde a registro real da série. | P0 | RF-017 |
| RF-027 | Filtro por data | Filtrar por data inicial e final inclusivas. | Entrada: limites de data. Saída: linhas compatíveis. | Início posterior ao fim é rejeitado. | P0 | RF-026 |
| RF-028 | Filtro por cotação | Filtrar por mínimo e máximo inclusivos. | Entrada: limites numéricos. Saída: linhas compatíveis. | Mínimo maior que máximo é rejeitado. | P0 | RF-026 |
| RF-029 | Filtros combinados | Aplicar todos os filtros ativos em conjunto. | Entrada: quatro filtros. Saída: interseção das condições. | O resultado atende a todas as condições simultaneamente. | P0 | RF-027, RF-028 |
| RF-030 | Limpar filtros | Restaurar os registros da série sem filtros. | Entrada: ação de limpar. Saída: série completa. | Filtros visuais e resultado são resetados. | P0 | RF-029 |
| RF-031 | Ordenação | Ordenar por data ou cotação em ambas as direções. | Entrada: coluna/direção. Saída: linhas ordenadas. | Ordenação é determinística e tem desempate por data. | P0 | RF-026 |
| RF-032 | Contador | Mostrar total de registros após filtros. | Entrada: resultado filtrado. Saída: contagem. | Contagem não depende da página visível. | P0 | RF-029 |
| RF-033 | Vazio por filtro | Explicar quando filtros não retornarem linhas. | Entrada: resultado vazio. Saída: mensagem e ação. | Estado vazio oferece limpeza de filtros e não habilita exportação. | P0 | RF-030, RF-032 |
| RF-034 | Paginação | Paginar, alterar tamanho e navegar entre páginas. | Entrada: resultado ordenado. Saída: página visível. | Paginação ocorre após filtrar/ordenar e volta à página 1 após contexto alterado. | P1 | RF-031, RF-032 |
| RF-035 | Exportar CSV | Baixar CSV local sem backend. | Entrada: resultado filtrado. Saída: arquivo UTF-8 com cabeçalho. | Arquivo abre como CSV válido e identifica o contexto. | P0 | RF-026 |
| RF-036 | Exportar conjunto completo | Exportar todas as linhas filtradas e ordenadas, não só a página. | Entrada: resultado completo. Saída: todas as linhas no arquivo. | Número de linhas do CSV é igual ao contador, além do cabeçalho. | P0 | RF-032, RF-034 |
| RF-037 | Bloquear CSV vazio | Impedir download sem registros. | Entrada: conjunto vazio. Saída: ação desabilitada. | Nenhum arquivo vazio é gerado. | P0 | RF-033, RF-035 |
| RF-038 | Nome do arquivo | Identificar produto, par e intervalo no nome. | Entrada: contexto atual. Saída: nome previsível. | Nome segue convenção equivalente a `HERMES_EUR-USD_dataInicial_dataFinal.csv`. | P0 | RF-035 |

### 3.5 Navegação, idioma e tema

| ID | Nome | Descrição e objetivo | Entradas / saídas | Critérios de aceitação | Prioridade | Dependências |
|---|---|---|---|---|---|---|
| RF-039 | Navegação por seções | Oferecer Conversor, Histórico e Relatórios sem recarga da SPA. | Entrada: ação de navegação. Saída: seção ativa. | Seções são acessíveis por clique e teclado. | P1 | — |
| RF-040 | Idiomas | Disponibilizar PT-BR, EN-US e ES-ES. | Entrada: idioma. Saída: textos e formatos traduzidos. | Texto e formato local mudam sem modificar códigos ou valores canônicos. | P1 | — |
| RF-041 | Tema escuro/claro | Disponibilizar preferência de tema após definir tokens compatíveis. | Entrada: preferência. Saída: tema legível. | Escuro segue o guia; claro só é liberado com tokens e contraste validados. | P1 | — |
| RF-042 | Preferências locais | Restaurar idioma, tema e pares suportados. | Entrada: armazenamento local. Saída: preferências. | Bloqueio do armazenamento não impede o uso principal. | P1 | RF-016, RF-040, RF-041 |
| RF-043 | Fonte indicativa | Identificar Frankfurter e a natureza de referência da taxa. | Entrada: tela com cotação. Saída: aviso de fonte. | Não afirma cotação negociável, atualização segundo a segundo ou provedor específico sem evidência. | P0 | RF-009, RF-012 |

## 4. Business Rules

| ID | Regra |
|---|---|
| RN-001 | Frankfurter v2 é a única origem de dados cambiais no escopo. |
| RN-002 | A conversão é indicativa e não representa operação financeira, spread, imposto, tarifa ou liquidação. |
| RN-003 | Valor convertido = valor de origem × cotação da origem para o destino. |
| RN-004 | A cotação representa uma unidade da moeda base na moeda de destino. |
| RN-005 | A taxa não é arredondada antes do cálculo; arredondamento ocorre apenas na apresentação. |
| RN-006 | Valores monetários usam normalmente duas casas e cotações quatro, com precisão adicional quando quatro casas mostrariam zero enganoso. |
| RN-007 | Zero é permitido; negativos, texto, `NaN` e infinito não são. |
| RN-008 | O limite máximo de entrada protege a precisão segura do cálculo e precisa ser confirmado pelo produto. **[PROPOSTA]**: 1.000.000.000.000 unidades. |
| RN-009 | Origem igual ao destino produz taxa lógica 1 e valor inalterado; não exige consulta remota. |
| RN-010 | Inverter o par consulta o novo sentido; não presume que o inverso aproximado seja a taxa oficial. |
| RN-011 | A data exibida é a data retornada no registro da fonte. |
| RN-012 | Finais de semana, feriados e lacunas não são preenchidos com dados sintéticos. |
| RN-013 | 7D, 15D e 30D são dias corridos; 3M, 6M, 1A, 5A e 10A usam subtração de calendário. |
| RN-014 | O fim padrão é a data civil de referência; ausência de cotação no último dia não é, sozinha, erro total. |
| RN-015 | Um período de N dias inclui o fim e N−1 dias anteriores. |
| RN-016 | Períodos de mês/ano incluem os extremos conforme os resultados efetivamente disponíveis. |
| RN-017 | A série é ordenada cronologicamente antes de calcular variações. |
| RN-018 | Variação = ((última − primeira) / primeira) × 100, apenas com pelo menos duas taxas válidas e primeira maior que zero. |
| RN-019 | Cards comparam a última taxa com a observação anterior disponível, não necessariamente com ontem. |
| RN-020 | Gráfico e tabela usam o mesmo par e janela temporal, salvo otimização visual explicitamente documentada. |
| RN-021 | Filtros são locais ao histórico carregado e seguem dados → filtros → ordenação → paginação. |
| RN-022 | Datas e limites de cotação são inclusivos e combinados por AND. |
| RN-023 | Data inicial posterior à final ou mínimo acima do máximo invalida o filtro. |
| RN-024 | Trocar par ou período limpa filtros incompatíveis e reinicia a paginação. |
| RN-025 | CSV inclui todos os registros filtrados e ordenados, mesmo com tabela paginada. |
| RN-026 | CSV usa `data`, `moeda_origem`, `moeda_destino`, `cotacao`, data ISO, decimal e escape compatível com RFC 4180; BOM UTF-8 é a proposta de interoperabilidade. |
| RN-027 | Bandeira é associação de país/território; moeda é identificada por ISO 4217 e precisa de mapeamento explícito. |
| RN-028 | Idioma altera apresentação, nunca códigos ISO ou valores canônicos. |
| RN-029 | Valores do Figma são ilustrativos e não podem ser dados de produção. |
| RN-030 | A atribuição padrão é Frankfurter/fontes oficiais; não rotular toda taxa como ECB sem restringir e verificar a fonte. |
| RN-031 | “API conectada” só aparece após sucesso recente da consulta relevante. |
| RN-032 | Favoritos não duplicam; EUR/USD e USD/EUR são pares diferentes. |
| RN-033 | Cobertura de moedas e datas pode variar; a mensagem deve ser honesta quando não houver dado. |
| RN-034 | O tema escuro é o visual aprovado; tema claro exige tokens e validação próprios. |

### 4.1 Casos de borda obrigatórios

Valor zero, campo vazio, letras, sinais isolados, excesso de casas e separadores locais; EUR→EUR; troca de par durante consulta e várias trocas rápidas; erros 400, 404, 422, timeout, 5xx, JSON inesperado e falta de conexão; período sem cotações, uma observação, séries longas; taxa menor que 0,0001; datas repetidas ou registros inválidos; filtros sem linhas; exportação desabilitada; armazenamento local bloqueado ou com favoritos obsoletos.

## 5. Non-Functional Requirements

| ID | Categoria | Requisito verificável | Prioridade |
|---|---|---|---|
| RNF-001 | Arquitetura | Aplicação SPA em React e TypeScript, com separação por funcionalidades e responsabilidades. | P0 |
| RNF-002 | Tipagem | Tipagem estrita para dados externos, estado, propriedades e utilitários; nenhum `any` implícito. | P0 |
| RNF-003 | Responsividade | Sem rolagem horizontal da página em 375, 390, 430, 768, 1024, 1280 e 1440 px; tabelas podem ter rolagem própria. | P0 |
| RNF-004 | Acessibilidade | Almejar WCAG 2.2 AA: teclado, foco visível, nomes acessíveis, erros anunciados e informação não dependente apenas de cor. | P0 |
| RNF-005 | Contraste | Mínimo de 4,5:1 para texto comum, 3:1 para texto grande e foco identificável. | P0 |
| RNF-006 | Desempenho inicial | Meta em ambiente controlado: LCP ≤ 2,5 s; separar atraso de rede externa da renderização. | P1 |
| RNF-007 | Desempenho de interação | Filtros e ordenação locais em até 200 ms para séries usuais de aproximadamente 4 mil registros em desktop de referência. | P1 |
| RNF-008 | Rede | Consultas têm timeout, cancelamento de obsoletas e cache/desduplicação de curta duração quando aplicável. | P0 |
| RNF-009 | Resiliência | Loading, erro, vazio e dado obsoleto são distinguíveis; uma taxa de outro contexto não pode aparecer como atual. | P0 |
| RNF-010 | Segurança | Sem segredos no bundle, somente HTTPS, validação de dados externos e prevenção de injeção no CSV. | P0 |
| RNF-011 | Privacidade | Nenhuma PII é exigida; armazenamento local guarda apenas preferências e favoritos P1. | P0 |
| RNF-012 | Internacionalização | PT/EN/ES são suportados sem textos rígidos que impeçam tradução e formatação local. | P1 |
| RNF-013 | Testabilidade | Testes unitários, de componentes, integração com rede simulada e pelo menos um fluxo E2E automatizado. | P0 |
| RNF-014 | Compatibilidade | Últimas versões estáveis de Chrome, Edge, Firefox e Safari e mobile atual. | P1 |
| RNF-015 | Observabilidade | Falhas são categorizadas com contexto não sensível e exibidas na UI em linguagem amigável. | P0 |
| RNF-016 | Manutenibilidade | Lint, formatação, nomenclatura previsível, documentação e commits semânticos. | P0 |
| RNF-017 | Build e entrega | Build, lint, typecheck e testes executam sem erro; deploy é estático e HTTPS. | P0 |
| RNF-018 | Consistência visual | Tokens reais do Design Guide, composição reutilizável, estados e layout mobile-first; sem cores genéricas substituindo a identidade. | P0 |
| RNF-019 | Precisão informativa | Toda cotação apresenta data efetiva, código ISO, fonte e aviso de referência; cálculos são verificáveis. | P0 |
| RNF-020 | Séries longas | 5A/10A preservam registros completos na tabela/CSV; redução gráfica, se necessária, seleciona pontos existentes e não inventa valores. | P1 |

> As metas temporais devem ser medidas em ambiente, hardware e rede documentados. Não há SLA de disponibilidade ou latência da API pública neste produto.

## 6. User Stories

### US-001 — Converter um valor

Como usuário de planejamento, quero escolher origem, destino e valor para obter uma conversão indicativa.

Critérios de aceitação: selecionar um par válido, informar zero ou valor positivo, ver resultado formatado, taxa, data e aviso de referência; entradas inválidas não produzem resultado enganoso. Requisitos: RF-002, RF-008–RF-015.

### US-002 — Inverter o par

Como usuário, quero inverter origem e destino para consultar o sentido oposto.

Critérios de aceitação: o par é trocado, a nova consulta é feita e o gráfico/histórico não conserva dados do par anterior. Requisitos: RF-004, RF-014, RN-010.

### US-003 — Explorar um período

Como estudante ou analista, quero escolher um período histórico para observar a evolução de um par.

Critérios de aceitação: todos os oito períodos aparecem, a série respeita a janela e gráfico/tabela permanecem sincronizados. Requisitos: RF-017–RF-022.

### US-004 — Filtrar o histórico

Como analista, quero combinar datas e limites de cotação para encontrar registros relevantes.

Critérios de aceitação: filtros são inclusivos, combinados por AND, validados e contabilizados; limpar filtros restaura a série. Requisitos: RF-026–RF-033.

### US-005 — Ordenar e paginar

Como analista, quero ordenar e navegar por uma série extensa.

Critérios de aceitação: data e cotação podem ser ordenadas nos dois sentidos, a paginação ocorre depois dos filtros e a contagem representa o total. Requisitos: RF-031, RF-032, RF-034.

### US-006 — Exportar dados

Como analista, quero baixar os resultados filtrados para continuar a análise.

Critérios de aceitação: CSV inclui cabeçalho e todas as linhas filtradas/ordenadas, mesmo que não estejam na página atual; sem linhas, a ação fica indisponível. Requisitos: RF-035–RF-038.

### US-007 — Entender a confiabilidade da taxa

Como qualquer usuário, quero saber a fonte, data e natureza da cotação.

Critérios de aceitação: a interface identifica Frankfurter/fontes oficiais, data do registro e caráter indicativo, sem alegar preço em tempo real. Requisitos: RF-012, RF-015, RF-043.

### US-008 — Encontrar e salvar pares

Como usuário recorrente, quero pesquisar moedas e salvar pares de interesse.

Critérios de aceitação: busca por código/nome funciona, favoritos não duplicam, persistem localmente e podem ser removidos. Requisitos: RF-006, RF-007, RF-016.

### US-009 — Personalizar a experiência

Como usuário, quero escolher idioma e tema para usar a aplicação com conforto.

Critérios de aceitação: PT/EN/ES alteram textos e formatos; tema só é liberado quando tokens e contraste estiverem aprovados; preferências locais são opcionais. Requisitos: RF-039–RF-042.

## 7. User Flows e estados

### JOR-01 — Consultar e converter

1. Abrir o HERMES com um par padrão válido.
2. Aguardar o catálogo e a cotação.
3. Escolher origem/destino e informar valor.
4. Exibir resultado, taxa, data, par e aviso indicativo.
5. Permitir inverter ou corrigir a entrada.

Estados: inicial, carregando catálogo, carregando taxa, sucesso, entrada inválida, indisponível e erro recuperável.

### JOR-02 — Analisar evolução

1. Escolher par e um dos oito períodos.
2. Consultar e validar a série.
3. Exibir linha temporal, resumo e tabela.
4. Exibir vazio quando não houver observações.

Estados: carregando, sucesso com dados, sucesso sem dados, erro, dados insuficientes para variação e resposta obsoleta descartada.

### JOR-03 — Filtrar e exportar

1. Abrir o histórico detalhado.
2. Informar datas e/ou limites.
3. Ver contador e resultado filtrado.
4. Ordenar e paginar.
5. Exportar o conjunto filtrado/ordenado inteiro.

Estados: filtros válidos, filtro inválido, sem resultados, exportação disponível e exportação bloqueada.

### JOR-04 — Monitorar favoritos (P1)

1. Ver os quatro pares de overview.
2. Abrir um par no conversor ou salvar um par.
3. Consultar a lista local.
4. Remover um item.

Estados: carregamento parcial, erro parcial, lista vazia, item salvo e armazenamento indisponível.

### JOR-05 — Personalizar (P1)

1. Escolher idioma e/ou tema.
2. Atualizar textos e formatos.
3. Manter códigos e valores canônicos.
4. Restaurar preferências quando possível.

Estados: preferência padrão, mudança local, armazenamento bloqueado e tema claro pendente de aprovação.

## 8. Success Metrics

| ID | Indicador | Critério inicial |
|---|---|---|
| MET-001 | Conversão concluída | Fluxo E2E de uma conversão válida termina sem erro e mostra data/taxa |
| MET-002 | Cobertura de períodos | 8/8 períodos alteram a consulta e a visualização coerentemente |
| MET-003 | Integridade histórico | 100% das linhas exibidas vêm do payload validado; nenhuma linha fictícia |
| MET-004 | Integridade CSV | Linhas de dados exportadas = contador filtrado |
| MET-005 | Responsividade | Fluxos principais utilizáveis em 390 px e 1440 px sem scroll horizontal da página |
| MET-006 | Acessibilidade | Fluxos principais navegáveis por teclado, com foco e mensagens identificáveis |
| MET-007 | Transparência | Toda cotação de produção mostra fonte, data e aviso indicativo |

## 9. Critérios de aceite do produto

Os casos abaixo são a referência comportamental para o aceite do MVP:

- **CA-01 — Conversão válida:** uma entrada válida é multiplicada pela taxa retornada e mostra localidade, data e par.
- **CA-02 — Inversão:** o novo par é consultado e atualiza todas as visualizações.
- **CA-03 — Oito períodos:** cada período gera limites coerentes e dados do par correto.
- **CA-04 — Filtros:** somente registros que atendem a todas as condições permanecem.
- **CA-05 — CSV com paginação:** 32 registros filtrados geram 32 linhas, ainda que 10 estejam visíveis.
- **CA-06 — CSV bloqueado:** conjunto vazio mostra estado vazio e desabilita a ação.
- **CA-07 — Consulta interrompida:** resposta tardia de EUR/USD não substitui USD/BRL.
- **CA-08 — Falha:** erro/timeout não exibe valor fictício e oferece recuperação quando aplicável.
- **CA-09 — Mobile e acessibilidade:** em 390 px os controles continuam operáveis por teclado/toque sem scroll horizontal geral.
- **CA-10 — Fonte:** a UI não chama a taxa de tempo real nem a atribui ao ECB sem evidência.

## 10. Pendências e decisões de produto

| ID | Decisão pendente | Impacto |
|---|---|---|
| PD-001 | Confirmar limite máximo de entrada da RN-008. | Validação do conversor e mensagens de erro. |
| PD-002 | Confirmar período inicial; a implementação atual inicia em `1A`, enquanto `30D` permanece a proposta de produto. | Estado inicial e primeira consulta. |
| PD-003 | Aprovar ou adiar tema claro; o Figma atual formaliza dark. | Escopo de RF-041. |
| PD-004 | Confirmar comportamento final de favoritos e limite, se houver. | Persistência P1. |
| PD-005 | Confirmar se overview e preferências entram na primeira release ou seguem como P1. | Planejamento de release. |
| PD-006 | Decidir se a atribuição de provedores será apenas “Frankfurter/fontes oficiais” ou detalhada. | Texto de fonte e possível evolução P2. |
| PD-007 | Validar estados de tablet/1280 px, hover/focus/loading e WCAG com Design Guide/Figma. | Aceite visual e acessibilidade. |

## 11. Referências

1. [Notion — Projeto 02 / Currency Exchange App](https://app.notion.com/p/Projeto-02-Currency-Exchange-App-3e4dfca74d8d819ebfeedbdbe661d76e).
2. [Figma — HERMES / telas V2](https://www.figma.com/design/lXz8qLzcQWvYolE2odWoYj/HERMES-%E2%80%94-Currency-Exchange-%7C-Premium-UX---UI?node-id=26-2): desktop `26:441`, mobile `26:616`.
3. [Figma — Design Guide](https://www.figma.com/design/lXz8qLzcQWvYolE2odWoYj/HERMES-%E2%80%94-Currency-Exchange-%7C-Premium-UX---UI?node-id=26-1408): página `00_DESIGN-GUIDE`, `26:1408`.
4. [Frankfurter — documentação oficial v2](https://frankfurter.dev/pt/).

## 12. Controle de mudanças

- **14/11/2026 — v2.0:** reorganização dos requisitos, regras, jornadas, critérios e decisões de produto.
- **16/11/2026 — v2.1:** inclusão do snapshot de implementação, gates observados, limitações P1 e status de revisão.

Arquitetura, contratos, componentes, serviços, hooks, testes e plano de execução ficam em `TECH_SPEC.md`, `SPEC.md` e `TASKs_SPEC.md`. O plano de execução foi sintetizado em 10 fases e não mantém arquivos individuais de task.
