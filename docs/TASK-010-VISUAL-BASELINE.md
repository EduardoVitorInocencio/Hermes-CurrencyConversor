# TASK-010 — Baseline visual HERMES

Data da validação: 16/11/2026

## Fontes comparadas

- Design Guide local: `styleRef/HERMES_Design_System_Standalone.html`.
- Figma desktop: node `26:441`, referência 1440 × 1578.
- Figma mobile: node `26:616`, referência 390 × 2572.
- Contrato de tokens e telas: `TECH_SPEC.md`, seções 5.1–5.7.

As referências Figma foram usadas como contrato de dimensões e hierarquia; nenhuma alteração foi feita no arquivo Figma e nenhum screenshot foi importado como UI.

## Capturas do shell atual

- [Desktop 1440 × 900](../tests/screenshots/task10-desktop.png)
- [Mobile 390 × 844](../tests/screenshots/task10-mobile.png)

As imagens foram capturadas com Playwright contra o dev server local, em modo full-page. O viewport mobile usa Chromium com largura 390 px; a altura 844 px é a referência de execução, enquanto o documento completo foi capturado.

## Comparação automatizada

O script de verificação comparou 42 tokens entre o `styleRef` e `src/app/styles/tokens.css`:

- 12 primitivas de cor.
- 16 dimensões.
- 14 valores tipográficos de tamanho/line-height.
- Divergências encontradas: **0**.

Contraste principal já validado em TASK-007: foreground `16.95:1`, muted `8.91:1`, subtle `5.94:1`, positive `11.63:1` e negative `8.41:1` sobre o canvas.

## Checklist de divergências

| Área | Resultado | Evidência / decisão |
|---|---|---|
| Canvas dark, aliases e primitives | Corrigido | 42 tokens coincidem com o `styleRef`; não há tema claro nem `emerald`/paleta genérica. |
| Tipografia base e foco | Corrigido | Inter/fallback, escala H1–Caption, foco positivo e seleção estão em `globals.css`. |
| Overflow global | Corrigido | Smoke responsivo passou em 375/390/430/768/1024/1280/1440; capturas 390/1440 sem scroll horizontal da página. |
| Estrutura desktop HERMES | Pendente | O shell atual ainda exibe o starter React/Vite; sidebar, topbar, cards, conversor, gráfico e histórico pertencem às tarefas de layout. |
| Estrutura mobile HERMES | Pendente | O shell atual ainda não possui cabeçalho/nav/cards/filtros da referência `26:616`; não corrigido para não antecipar implementação de produto. |
| Histórico `77:47` | Pendente | Nenhuma tela analítica foi criada; a referência permanece contrato para TASK-031+ e não fixture de dados. |
| Tablet 768/1280 | Pendente de referência visual | O Figma não formaliza telas nesses tamanhos; somente o smoke de overflow foi executado. |

## Decisão

As diferenças de conteúdo e composição são divergências esperadas do starter e ficam registradas, não corrigidas, porque esta tarefa valida a fundação visual e não implementa o layout final. A próxima correção visual deve usar os tokens já validados e as referências Figma sem transformar coordenadas em layout rígido.
