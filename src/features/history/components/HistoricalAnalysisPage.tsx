import { useMemo, useState, type Dispatch } from 'react'
import { Card } from '@/shared/components/ui/Card'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { Select } from '@/shared/components/ui/Select'
import { EmptyState, ErrorState, LoadingState } from '@/shared/components/feedback'
import { useRateHistory } from '../hooks/useRateHistory'
import { getPeriodRange } from '../utils/getPeriodRange'
import { calculatePercentageChange } from '../utils/calculatePercentageChange'
import { formatRate, type AppLocale } from '@/shared/lib/format/number'
import { formatDate } from '@/shared/lib/format/date'
import type { ExchangeViewAction, ExchangeViewState } from '@/shared/types/view'
import { ExchangeRateChart } from './ExchangeRateChart'
import { HistoryTable } from './HistoryTable'
import { PeriodSelector } from './PeriodSelector'
import { ExportCsvButton } from '@/features/export/components/ExportCsvButton'
import './analysis.css'

const locale: AppLocale = 'pt-BR'

export function HistoricalAnalysisPage({ dispatch, viewState }: { dispatch: Dispatch<ExchangeViewAction>; viewState: ExchangeViewState }) {
  const range = useMemo(() => getPeriodRange(viewState.period), [viewState.period])
  const history = useRateHistory(viewState.pair.base, viewState.pair.quote, range.from, range.to)
  const [compare, setCompare] = useState('USD')
  const records = history.data ?? []
  const first = records[0]?.rate ?? null
  const last = records.at(-1)?.rate ?? null
  const change = calculatePercentageChange(first, last)
  const stats = [
    ['Cotação atual', last === null ? '—' : formatRate(last, locale), last === null ? '' : `1 ${viewState.pair.base} em ${viewState.pair.quote}`],
    ['Variação no período', change === null ? '—' : `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`, `${viewState.period} selecionado`],
    ['Maior cotação', records.length ? formatRate(Math.max(...records.map((item) => item.rate)), locale) : '—', 'no período'],
    ['Menor cotação', records.length ? formatRate(Math.min(...records.map((item) => item.rate)), locale) : '—', 'no período'],
  ]
  if (history.loading && !history.data) return <LoadingState message="Carregando análise histórica" />
  if (history.error && !history.data) return <ErrorState message="Não foi possível carregar a análise deste par." onRetry={history.retry} />
  return (
    <div className="analysis-page">
      <div className="analysis-page__toolbar"><div><p className="analysis-page__section-label">PARÂMETROS DA ANÁLISE</p><p className="analysis-page__muted">Escolha um período e um par para atualizar todos os painéis.</p></div><ExportCsvButton filename={`hermes-analise-${viewState.pair.base}-${viewState.pair.quote}.csv`} records={records} /></div>
      <Card className="analysis-filters" aria-label="Filtros do histórico"><Select label="Moeda base" options={[{ value: viewState.pair.base, label: viewState.pair.base }]} value={viewState.pair.base} /><Input label="Data inicial" type="date" value={range.from} readOnly /><Input label="Data final" type="date" value={range.to} readOnly /><Select label="Comparar com" options={[{ value: 'USD', label: 'USD — Dólar americano' }, { value: 'EUR', label: 'EUR — Euro' }, { value: 'BRL', label: 'BRL — Real brasileiro' }]} value={compare} onValueChange={setCompare} /><Button onClick={() => dispatch({ type: 'setPeriod', value: viewState.period })} variant="primary">Aplicar filtros</Button></Card>
      <div className="analysis-page__period"><PeriodSelector value={viewState.period} onChange={(period) => dispatch({ type: 'setPeriod', value: period })} /></div>
      <div className="analysis-metrics">{stats.map(([label, value, hint]) => <Card as="article" key={label}><span>{label}</span><strong>{value}</strong><small>{hint}</small></Card>)}</div>
      <Card className="analysis-chart-card"><div className="analysis-card-heading"><div><p className="analysis-page__section-label">PERFORMANCE</p><h2>Performance</h2><p className="analysis-page__muted">{viewState.pair.base}/{viewState.pair.quote} no período</p></div><span className="analysis-badge">{change === null ? 'Sem variação' : `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`}</span></div><ExchangeRateChart records={records} /></Card>
      <div className="analysis-columns"><Card><div className="analysis-card-heading"><div><p className="analysis-page__section-label">RESUMO POR MOEDA</p><h2>Desempenho observado</h2></div></div>{records.length ? <div className="analysis-pair-row"><strong>{viewState.pair.base}/{viewState.pair.quote}</strong><span>{formatDate(records[0].date, locale)} — {formatDate(records.at(-1)?.date ?? records[0].date, locale)}</span><b>{change === null ? '—' : `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`}</b></div> : <EmptyState description="A API não devolveu registros para este período." title="Sem dados comparáveis" />}</Card><Card><div className="analysis-card-heading"><div><p className="analysis-page__section-label">VARIAÇÃO</p><h2>Leitura rápida</h2></div></div><p className="analysis-page__muted">{records.length ? `O maior valor observado foi ${formatRate(Math.max(...records.map((item) => item.rate)), locale)} e o menor foi ${formatRate(Math.min(...records.map((item) => item.rate)), locale)}.` : 'A variação será exibida quando houver registros reais.'}</p></Card></div>
      <Card><div className="analysis-card-heading"><div><p className="analysis-page__section-label">REGISTROS HISTÓRICOS</p><h2>Dados consultados</h2></div><span className="analysis-page__muted">{records.length} pontos</span></div>{records.length ? <HistoryTable records={records.slice(-10).reverse()} /> : <EmptyState description="Sem registros reais para exibir." title="Histórico vazio" />}</Card>
    </div>
  )
}
