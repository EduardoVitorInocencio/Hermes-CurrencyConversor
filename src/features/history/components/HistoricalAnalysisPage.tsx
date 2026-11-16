import { useMemo, useState, type Dispatch } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import { ErrorState, LoadingState } from '@/shared/components/feedback'
import { formatRateFixed, type AppLocale } from '@/shared/lib/format/number'
import type { ExchangeViewAction } from '@/shared/types/view'
import { downloadCsv } from '@/features/export/utils/exportCsv'
import type { HistoryPeriod, HistoryRecord } from '../types/history'
import { useRateHistory } from '../hooks/useRateHistory'
import { getPeriodRange } from '../utils/getPeriodRange'
import { calculatePercentageChange } from '../utils/calculatePercentageChange'
import './analysis.css'

type AnalysisCurrency = 'USD' | 'EUR' | 'GBP'
type ChartMode = 'rate' | 'variation'

const locale: AppLocale = 'pt-BR'
const currencies: AnalysisCurrency[] = ['USD', 'EUR', 'GBP']
const periodOptions: HistoryPeriod[] = ['7D', '30D', '3M', '6M', '1A']
const seriesColors: Record<AnalysisCurrency, string> = {
  USD: '#75B8F1',
  EUR: '#8BDEA6',
  GBP: '#E6BC66',
}

interface AnalysisSeriesRow {
  date: string
  label: string
  USD?: number
  EUR?: number
  GBP?: number
  movingAverage?: number
}

interface HistoricalTableRow {
  date: string
  USD: number | null
  EUR: number | null
  GBP: number | null
  eurVariation: number | null
}

function formatPercent(value: number | null) {
  if (value === null || !Number.isFinite(value)) return '—'
  return (value >= 0 ? '+' : '−') + Math.abs(value).toFixed(2).replace('.', ',') + '%'
}

function formatDateShort(value: string) {
  const date = new Date(value + 'T00:00:00Z')
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', timeZone: 'UTC' })
    .format(date)
    .replace(' de ', ' ')
    .replace('.', '')
}

function formatDateInput(value: string) {
  const date = new Date(value + 'T00:00:00Z')
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(date)
}

function formatMetric(value: number | null) {
  return value === null ? '—' : formatRateFixed(value, locale)
}

function getAverage(records: HistoryRecord[]) {
  if (!records.length) return null
  return records.reduce((sum, record) => sum + record.rate, 0) / records.length
}

function getVolatility(records: HistoryRecord[]) {
  if (records.length < 2) return null
  const returns = records.slice(1).map((record, index) => (record.rate - records[index].rate) / records[index].rate)
  const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length
  const variance = returns.reduce((sum, value) => sum + (value - mean) ** 2, 0) / returns.length
  return Math.sqrt(variance) * 100
}

function getLatest(records: HistoryRecord[]) {
  return records.length ? records[records.length - 1].rate : null
}

function filterByCutoff(records: HistoryRecord[], cutoff: string) {
  return records.filter((record) => !cutoff || record.date <= cutoff)
}

function getRateMaps(recordsByCurrency: Record<AnalysisCurrency, HistoryRecord[]>) {
  return {
    USD: new Map(recordsByCurrency.USD.map((record) => [record.date, record.rate])),
    EUR: new Map(recordsByCurrency.EUR.map((record) => [record.date, record.rate])),
    GBP: new Map(recordsByCurrency.GBP.map((record) => [record.date, record.rate])),
  }
}

function buildSeries(
  recordsByCurrency: Record<AnalysisCurrency, HistoryRecord[]>,
  selectedCurrencies: AnalysisCurrency[],
  mode: ChartMode,
  movingAverageCurrency: AnalysisCurrency,
) {
  const maps = getRateMaps(recordsByCurrency)
  const dates = Array.from(new Set(currencies.flatMap((currency) => recordsByCurrency[currency].map((record) => record.date)))).sort()
  const firstRates = currencies.reduce<Record<AnalysisCurrency, number | null>>((result, currency) => {
    result[currency] = recordsByCurrency[currency][0]?.rate ?? null
    return result
  }, { USD: null, EUR: null, GBP: null })

  const rows: AnalysisSeriesRow[] = dates.map((date) => {
    const row: AnalysisSeriesRow = { date, label: formatDateShort(date) }
    for (const currency of Array.from(new Set([...selectedCurrencies, movingAverageCurrency]))) {
      const rate = maps[currency].get(date)
      if (rate === undefined) continue
      row[currency] = mode === 'rate' || firstRates[currency] === null
        ? rate
        : ((rate - firstRates[currency]!) / firstRates[currency]!) * 100
    }
    return row
  })

  for (let index = 0; index < rows.length; index += 1) {
    const values = rows
      .slice(Math.max(0, index - 19), index + 1)
      .map((row) => row[movingAverageCurrency])
      .filter((value): value is number => value !== undefined)
    if (values.length) rows[index].movingAverage = values.reduce((sum, value) => sum + value, 0) / values.length
  }
  return rows
}

function buildHistoricalRows(recordsByCurrency: Record<AnalysisCurrency, HistoryRecord[]>) {
  const maps = getRateMaps(recordsByCurrency)
  const dates = Array.from(new Set(currencies.flatMap((currency) => recordsByCurrency[currency].map((record) => record.date)))).sort().reverse()
  const eurRecords = recordsByCurrency.EUR
  const previousEur = new Map<string, number | null>()
  eurRecords.forEach((record, index) => {
    previousEur.set(record.date, index > 0 ? eurRecords[index - 1].rate : null)
  })

  return dates.map<HistoricalTableRow>((date) => {
    const currentEur = maps.EUR.get(date) ?? null
    const previous = previousEur.get(date) ?? null
    return {
      date,
      USD: maps.USD.get(date) ?? null,
      EUR: currentEur,
      GBP: maps.GBP.get(date) ?? null,
      eurVariation: currentEur !== null && previous !== null ? ((currentEur - previous) / previous) * 100 : null,
    }
  })
}

function AnalysisSelect({
  label,
  value,
  options,
  onChange,
  showLabel = true,
}: {
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  onChange?: (value: string) => void
  showLabel?: boolean
}) {
  return (
    <label className="analysis-field">
      <span className={showLabel ? undefined : 'visually-hidden'}>{label}</span>
      <span className="analysis-select">
        <select aria-label={label} onChange={(event) => onChange?.(event.target.value)} value={value}>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <span aria-hidden="true">⌄</span>
      </span>
    </label>
  )
}

function CurrencyMultiSelect({
  selected,
  onToggle,
}: {
  selected: AnalysisCurrency[]
  onToggle: (currency: AnalysisCurrency) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="analysis-field">
      <span>MOEDAS PARA COMPARAR</span>
      <div className="analysis-multi-select">
        <button aria-expanded={open} className="analysis-select analysis-select--button" onClick={() => setOpen((value) => !value)} type="button">
          <span>{selected.join(', ')}</span><span aria-hidden="true">⌄</span>
        </button>
        {open ? (
          <div className="analysis-multi-select__menu" role="group" aria-label="Moedas para comparar">
            {currencies.map((currency) => (
              <label key={currency}>
                <input checked={selected.includes(currency)} onChange={() => onToggle(currency)} type="checkbox" />
                <span>{currency}</span>
              </label>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  description,
  rows,
  footer,
  footnote,
}: {
  title: string
  value: string
  description: string
  rows: Array<[string, string]>
  footer: string
  footnote: string
}) {
  return (
    <Card as="article" className="analysis-metric-card">
      <h2>{title}</h2>
      <strong>{value}</strong>
      <p className="analysis-metric-card__description">{description}</p>
      <div className="analysis-metric-card__divider" />
      <div className="analysis-metric-card__rows">
        {rows.map(([label, rowValue]) => <div key={label}><span>{label}</span><b>{rowValue}</b></div>)}
      </div>
      <div className="analysis-metric-card__divider" />
      <p className="analysis-metric-card__footer">{footer}</p>
      <p className="analysis-metric-card__footnote">{footnote}</p>
    </Card>
  )
}

function ComparisonChart({
  data,
  selectedCurrencies,
  mode,
  latestValues,
}: {
  data: AnalysisSeriesRow[]
  selectedCurrencies: AnalysisCurrency[]
  mode: ChartMode
  latestValues: Record<AnalysisCurrency, number | null>
}) {
  const formatter = (value: number) => mode === 'rate' ? formatRateFixed(value, locale) : formatPercent(value)
  if (!data.length) return <p className="analysis-empty">Sem dados para comparar no período selecionado.</p>
  return (
    <div className="analysis-comparison-chart">
      <p className="analysis-comparison-chart__label">VARIAÇÃO ACUMULADA (%)</p>
      <div className="analysis-comparison-chart__plot">
        <ResponsiveContainer height="100%" width="100%">
          <LineChart data={data} margin={{ top: 8, right: 96, bottom: 22, left: 0 }}>
            <CartesianGrid horizontal vertical={false} stroke="var(--color-border-default)" />
            <XAxis axisLine={false} dataKey="label" interval="preserveStartEnd" tick={{ fill: 'var(--color-text-subtle)', fontSize: 10 }} tickLine={false} />
            <YAxis axisLine={false} domain={['auto', 'auto']} tick={{ fill: 'var(--color-text-subtle)', fontSize: 10 }} tickFormatter={(value) => mode === 'rate' ? formatRateFixed(Number(value), locale) : formatPercent(Number(value))} tickLine={false} width={45} />
            <Tooltip formatter={(value) => formatter(Number(value))} labelFormatter={(label) => String(label)} />
            {selectedCurrencies.map((currency) => (
              <Line connectNulls dataKey={currency} dot={false} key={currency} stroke={seriesColors[currency]} strokeDasharray={currency === 'USD' ? '5 4' : undefined} strokeWidth={2.2} type="monotone" />
            ))}
            <Line connectNulls dataKey="movingAverage" dot={false} name="Média móvel" stroke="#F2A65A" strokeDasharray="5 4" strokeWidth={2} type="monotone" />
          </LineChart>
        </ResponsiveContainer>
        <div className="analysis-comparison-chart__end-labels">
          {selectedCurrencies.map((currency) => <span className={'analysis-series-label analysis-series-label--' + currency} key={currency}><i />{currency} {formatter(latestValues[currency] ?? 0)}</span>)}
        </div>
      </div>
    </div>
  )
}

function AnalysisSummary({
  recordsByCurrency,
}: {
  recordsByCurrency: Record<AnalysisCurrency, HistoryRecord[]>
}) {
  const rows = currencies.map((currency) => {
    const records = recordsByCurrency[currency]
    const latest = getLatest(records)
    const change = calculatePercentageChange(records[0]?.rate, latest)
    return { currency, latest, change, volatility: getVolatility(records) }
  })
  return (
    <Card className="analysis-summary-card">
      <h2>Resumo por moeda</h2>
      <p>Cotações em BRL · Mesmo intervalo para todas as moedas</p>
      <div className="analysis-summary-table-wrap">
        <table className="analysis-summary-table" role="presentation">
          <caption className="visually-hidden">Resumo das cotações por moeda</caption>
          <thead><tr><th>MOEDA</th><th>ÚLTIMA</th><th>VARIAÇÃO</th><th>VOL. DIÁRIA¹</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.currency}>
                <td><i className={'analysis-summary-dot analysis-summary-dot--' + row.currency} />{row.currency}</td>
                <td>{formatMetric(row.latest)}</td>
                <td className={row.change !== null && row.change >= 0 ? 'is-positive' : 'is-negative'}>{formatPercent(row.change)}</td>
                <td>{row.volatility === null ? '—' : formatPercent(row.volatility)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <small>¹ Desvio-padrão dos retornos diários; não anualizado.</small>
    </Card>
  )
}

function VariationCard({
  recordsByCurrency,
}: {
  recordsByCurrency: Record<AnalysisCurrency, HistoryRecord[]>
}) {
  const rows = currencies.map((currency) => ({
    currency,
    change: calculatePercentageChange(recordsByCurrency[currency][0]?.rate, getLatest(recordsByCurrency[currency])),
  }))
  const strongest = [...rows].sort((a, b) => (b.change ?? -Infinity) - (a.change ?? -Infinity))[0]
  const max = Math.max(...rows.map((row) => Math.abs(row.change ?? 0)), 1)
  const gbpChange = rows.find((row) => row.currency === 'GBP')?.change ?? 0
  const usdChange = rows.find((row) => row.currency === 'USD')?.change ?? 0
  return (
    <Card className="analysis-variation-card">
      <h2>Variação no período</h2>
      <p>{strongest?.change === null || strongest?.change === undefined ? 'A variação será exibida quando houver dados.' : strongest.currency + ' lidera a valorização frente ao real.'}</p>
      <div className="analysis-variation-chart">
        <div className="analysis-variation-zero" />
        {rows.map((row) => {
          const change = row.change ?? 0
          const width = Math.max(4, Math.abs(change) / max * 248) + 'px'
          return (
            <div className="analysis-variation-row" key={row.currency}>
              <b>{row.currency}</b>
              <div className={change >= 0 ? 'analysis-variation-bar is-positive' : 'analysis-variation-bar is-negative'} style={{ width }} />
              <span className={change >= 0 ? 'is-positive' : 'is-negative'}>{formatPercent(row.change)}</span>
            </div>
          )
        })}
        <small>0%</small>
      </div>
      <footer>Diferença entre GBP e USD: {formatPercent(gbpChange - usdChange).replace('+', '')} pontos percentuais.</footer>
    </Card>
  )
}

function HistoricalQuotesTable({
  rows,
  tablePage,
  onPageChange,
  filter,
  onFilterChange,
}: {
  rows: HistoricalTableRow[]
  tablePage: number
  onPageChange: (page: number) => void
  filter: string
  onFilterChange: (value: string) => void
}) {
  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))
  const currentPage = Math.min(tablePage, totalPages)
  const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  return (
    <Card className="analysis-history-card">
      <div className="analysis-history-card__header">
        <div><h2>Cotações históricas</h2><p>Fechamentos diários · 1 unidade de cada moeda em BRL</p></div>
        <AnalysisSelect label="Filtro da tabela" options={[{ value: 'all', label: 'Todas as moedas' }, ...currencies.map((currency) => ({ value: currency, label: currency }))]} showLabel={false} value={filter} onChange={onFilterChange} />
      </div>
      <div className="analysis-history-table-wrap">
        <table className="analysis-history-table">
          <caption className="visually-hidden">Cotações históricas por moeda</caption>
          <thead><tr><th>DATA ↓</th><th>USD / BRL</th><th>EUR / BRL</th><th>GBP / BRL</th><th>VAR. DIÁRIA · EUR</th></tr></thead>
          <tbody>
            {pageRows.map((row) => (
              <tr key={row.date}>
                <td>{formatDateInput(row.date)}</td>
                <td>{formatMetric(row.USD)}</td>
                <td>{formatMetric(row.EUR)}</td>
                <td>{formatMetric(row.GBP)}</td>
                <td className={row.eurVariation !== null && row.eurVariation >= 0 ? 'is-positive' : 'is-negative'}>{formatPercent(row.eurVariation)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!pageRows.length ? <p className="analysis-empty">Sem cotações para exibir.</p> : null}
      </div>
      <div className="analysis-history-pagination">
        <span>{rows.length ? (String((currentPage - 1) * pageSize + 1) + '–' + String(Math.min(currentPage * pageSize, rows.length)) + ' de ' + String(rows.length) + ' registros') : '0 registros'}</span>
        <span>Por página</span>
        <button className="analysis-page-size" type="button">5⌄</button>
        <Button disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} size="sm" variant="quiet">Anterior</Button>
        {[1, 2, 3].filter((page) => page <= totalPages).map((page) => <button aria-current={currentPage === page ? 'page' : undefined} className={currentPage === page ? 'is-current' : undefined} key={page} onClick={() => onPageChange(page)} type="button">{page}</button>)}
        {totalPages > 3 ? <><span>…</span><button onClick={() => onPageChange(totalPages)} type="button">{totalPages}</button></> : null}
        <Button disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)} size="sm" variant="quiet">Próxima →</Button>
      </div>
    </Card>
  )
}

export function HistoricalAnalysisPage({ dispatch }: { dispatch: Dispatch<ExchangeViewAction> }) {
  const [period, setPeriod] = useState<HistoryPeriod>('6M')
  const range = useMemo(() => getPeriodRange(period), [period])
  const [cutoffDraft, setCutoffDraft] = useState(range.to)
  const [appliedCutoff, setAppliedCutoff] = useState(range.to)
  const [selectedCurrencies, setSelectedCurrencies] = useState<AnalysisCurrency[]>(currencies)
  const [chartMode, setChartMode] = useState<ChartMode>('variation')
  const [movingAverageCurrency, setMovingAverageCurrency] = useState<AnalysisCurrency>('EUR')
  const [tableFilter, setTableFilter] = useState('all')
  const [tablePage, setTablePage] = useState(1)

  const usdHistory = useRateHistory('USD', 'BRL', range.from, range.to)
  const eurHistory = useRateHistory('EUR', 'BRL', range.from, range.to)
  const gbpHistory = useRateHistory('GBP', 'BRL', range.from, range.to)
  const requestStates = [usdHistory, eurHistory, gbpHistory]

  const recordsByCurrency = useMemo<Record<AnalysisCurrency, HistoryRecord[]>>(() => ({
    USD: filterByCutoff(usdHistory.data ?? [], appliedCutoff),
    EUR: filterByCutoff(eurHistory.data ?? [], appliedCutoff),
    GBP: filterByCutoff(gbpHistory.data ?? [], appliedCutoff),
  }), [appliedCutoff, eurHistory.data, gbpHistory.data, usdHistory.data])

  const hasData = currencies.some((currency) => recordsByCurrency[currency].length > 0)
  const allRecords = currencies.flatMap((currency) => recordsByCurrency[currency])
  const tableRows = useMemo(() => {
    const rows = buildHistoricalRows(recordsByCurrency)
    if (tableFilter === 'USD') return rows.filter((row) => row.USD !== null)
    if (tableFilter === 'EUR') return rows.filter((row) => row.EUR !== null)
    if (tableFilter === 'GBP') return rows.filter((row) => row.GBP !== null)
    return rows
  }, [recordsByCurrency, tableFilter])
  const series = useMemo(() => buildSeries(recordsByCurrency, selectedCurrencies, chartMode, movingAverageCurrency), [chartMode, movingAverageCurrency, recordsByCurrency, selectedCurrencies])
  const latestValues = currencies.reduce<Record<AnalysisCurrency, number | null>>((result, currency) => {
    const value = series.length ? series[series.length - 1][currency] : undefined
    result[currency] = value === undefined ? null : value
    return result
  }, { USD: null, EUR: null, GBP: null })
  const eurRecords = recordsByCurrency.EUR
  const eurAverage = getAverage(eurRecords)
  const eurLatest = getLatest(eurRecords)
  const eurMinimum = eurRecords.length ? Math.min(...eurRecords.map((record) => record.rate)) : null
  const eurMaximum = eurRecords.length ? Math.max(...eurRecords.map((record) => record.rate)) : null
  const eurVolatility = getVolatility(eurRecords)

  if (requestStates.every((request) => request.loading && !request.data)) return <LoadingState message="Carregando análise histórica" />
  if (!hasData && requestStates.every((request) => request.error && !request.data)) {
    return <ErrorState message="Não foi possível carregar a análise das moedas." onRetry={() => requestStates.forEach((request) => request.retry())} />
  }

  function changePeriod(nextPeriod: HistoryPeriod) {
    const nextRange = getPeriodRange(nextPeriod)
    setPeriod(nextPeriod)
    setCutoffDraft(nextRange.to)
    setAppliedCutoff(nextRange.to)
    setTablePage(1)
    dispatch({ type: 'setPeriod', value: nextPeriod })
  }

  function toggleCurrency(currency: AnalysisCurrency) {
    setSelectedCurrencies((current) => current.includes(currency)
      ? current.length === 1 ? current : current.filter((item) => item !== currency)
      : [...current, currency])
  }

  function applyFilters() {
    setAppliedCutoff(cutoffDraft)
    setTablePage(1)
  }

  return (
    <div className="analysis-page">
      <header className="analysis-page__header">
        <div><p className="analysis-page__eyebrow">ANÁLISE CAMBIAL</p><h1>Histórico de moedas</h1><p>Explore tendências, compare moedas e acompanhe a variação ao longo do tempo.</p></div>
        <Button disabled={!allRecords.length} onClick={() => downloadCsv(allRecords, 'hermes-analise-' + period + '.csv')} variant="primary">Exportar CSV ↗</Button>
      </header>

      <Card className="analysis-filter-card">
        <div className="analysis-filter-grid">
          <AnalysisSelect label="MOEDA DE REFERÊNCIA" options={[{ value: 'BRL', label: 'BRL · Real brasileiro' }]} value="BRL" />
          <label className="analysis-field"><span>DATA DE CORTE</span><span className="analysis-select analysis-date-input"><input aria-label="Data de corte" onChange={(event) => setCutoffDraft(event.target.value)} type="date" value={cutoffDraft} /></span></label>
          <CurrencyMultiSelect selected={selectedCurrencies} onToggle={toggleCurrency} />
          <Button onClick={applyFilters} variant="secondary">Aplicar filtros</Button>
        </div>
        <p className="analysis-filter-note">Data de corte: {formatDateInput(appliedCutoff)} · {selectedCurrencies.join(', ')} em relação ao BRL · Dias úteis</p>
      </Card>

      <section aria-label="Indicadores do período" className="analysis-metrics">
        <MetricCard description={eurRecords.length ? 'Média observada no período' : 'Média ainda não informada'} footnote={eurRecords.length ? 'Baseado nas cotações disponíveis' : 'Base de 12 meses não informada'} footer={'Variação do período atual: ' + formatPercent(calculatePercentageChange(eurRecords[0]?.rate, eurLatest))} rows={[['12 meses anteriores', '—'], ['Valor atual', formatMetric(eurLatest)], ['Variação vs. 12 meses', '—']]} title="EUR / BRL · média do período" value={formatMetric(eurAverage)} />
        <MetricCard description="Mínima registrada no período" footnote={eurMinimum === null ? 'Base de 12 meses não informada' : 'Última cotação ' + formatPercent(eurLatest !== null && eurMinimum ? ((eurLatest - eurMinimum) / eurMinimum) * 100 : null) + ' acima da mínima'} footer={eurMinimum === null ? 'Sem mínima registrada' : 'Registrada em ' + formatDateShort(eurRecords.find((record) => record.rate === eurMinimum)?.date ?? eurRecords[0]?.date ?? '')} rows={[['12 meses anteriores', '—'], ['Mínima atual', formatMetric(eurMinimum)], ['Variação vs. 12 meses', '—']]} title="Menor cotação · EUR / BRL" value={formatMetric(eurMinimum)} />
        <MetricCard description="Máxima registrada no período" footnote={eurMaximum === null ? 'Base de 12 meses não informada' : 'Última cotação ' + formatPercent(eurMaximum ? ((eurLatest! - eurMaximum) / eurMaximum) * 100 : null) + ' abaixo da máxima'} footer={eurMaximum === null ? 'Sem máxima registrada' : 'Registrada em ' + formatDateShort(eurRecords.find((record) => record.rate === eurMaximum)?.date ?? eurRecords[0]?.date ?? '')} rows={[['12 meses anteriores', '—'], ['Máxima atual', formatMetric(eurMaximum)], ['Variação vs. 12 meses', '—']]} title="Maior cotação · EUR / BRL" value={formatMetric(eurMaximum)} />
        <MetricCard description="Desvio-padrão dos retornos" footnote={eurVolatility === null ? 'Base de 12 meses não informada' : 'Oscilação dos retornos diários'} footer="Oscilação dos retornos diários" rows={[['12 meses anteriores', '—'], ['Volatilidade atual', eurVolatility === null ? '—' : formatPercent(eurVolatility)], ['Variação em p.p. (12 meses)', '—']]} title="Volatilidade diária · EUR" value={eurVolatility === null ? '—' : formatPercent(eurVolatility)} />
      </section>

      <Card className="analysis-comparison-card">
        <div className="analysis-comparison-header">
          <div><h2 aria-label="Performance">Comparar desempenho</h2><p>USD, EUR e GBP frente ao BRL · Todas as séries começam em 0%</p></div>
          <div className="analysis-mode-switch" role="group" aria-label="Modo do gráfico">
            <button aria-pressed={chartMode === 'rate'} className={chartMode === 'rate' ? 'is-selected' : undefined} onClick={() => setChartMode('rate')} type="button">Cotação</button>
            <button aria-pressed={chartMode === 'variation'} className={chartMode === 'variation' ? 'is-selected' : undefined} onClick={() => setChartMode('variation')} type="button">Variação %</button>
          </div>
        </div>
        <div className="analysis-comparison-currencies">
          <div><span>MOEDAS NO GRÁFICO</span><small>{selectedCurrencies.length} selecionadas · Referência: BRL</small></div>
          <div className="analysis-currency-chips">{currencies.map((currency) => <button aria-pressed={selectedCurrencies.includes(currency)} className={'analysis-currency-chip analysis-currency-chip--' + currency + (selectedCurrencies.includes(currency) ? ' is-selected' : '')} key={currency} onClick={() => toggleCurrency(currency)} type="button">{currency}<b>{selectedCurrencies.includes(currency) ? '✓' : '+'}</b></button>)}</div>
        </div>
        <div className="analysis-moving-average">
          <span><i />Média móvel · {movingAverageCurrency}⌄</span>
          <select aria-label="Moeda da média móvel" onChange={(event) => setMovingAverageCurrency(event.target.value as AnalysisCurrency)} value={movingAverageCurrency}>
            {currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
          </select>
        </div>
        <p className="analysis-moving-average-note">20 dias úteis · Média simples</p>
        <div className="analysis-analysis-periods" aria-label="Período do gráfico" role="group">
          {periodOptions.map((option) => <button aria-pressed={period === option} className={period === option ? 'is-selected' : undefined} key={option} onClick={() => changePeriod(option)} type="button">{option}</button>)}
        </div>
        <ComparisonChart data={series} latestValues={latestValues} mode={chartMode} selectedCurrencies={selectedCurrencies} />
        <p className="analysis-comparison-note">Base: {formatDateInput(range.from)} · Média móvel: 20 fechamentos úteis de {movingAverageCurrency}/BRL, na mesma escala percentual.</p>
      </Card>

      <section className="analysis-summary-grid">
        <AnalysisSummary recordsByCurrency={recordsByCurrency} />
        <VariationCard recordsByCurrency={recordsByCurrency} />
      </section>

      <HistoricalQuotesTable filter={tableFilter} onFilterChange={(value) => { setTableFilter(value); setTablePage(1) }} onPageChange={setTablePage} rows={tableRows} tablePage={tablePage} />

      <footer className="analysis-page__note">
        <span>Dados ilustrativos para o protótipo · Não representam cotações reais nem recomendação financeira.</span>
        <span>Referência conceitual de dados: Frankfurter / ECB · Comparação em BRL, sem tarifas ou margens cambiais.</span>
      </footer>
    </div>
  )
}
