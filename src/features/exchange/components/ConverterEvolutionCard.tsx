import { useMemo, type Dispatch } from 'react'
import type { ExchangeViewAction, ExchangeViewState } from '@/shared/types/view'
import { Card } from '@/shared/components/ui/Card'
import { EmptyState, ErrorState, LoadingState } from '@/shared/components/feedback'
import { formatRateFixed, type AppLocale } from '@/shared/lib/format/number'
import { useRateHistory } from '@/features/history/hooks/useRateHistory'
import { getPeriodRange } from '@/features/history/utils/getPeriodRange'
import { calculatePercentageChange } from '@/features/history/utils/calculatePercentageChange'
import { PeriodSelector } from '@/features/history/components/PeriodSelector'
import { ExchangeRateChart } from '@/features/history/components/ExchangeRateChart'

export function ConverterEvolutionCard({ dispatch, viewState }: { dispatch: Dispatch<ExchangeViewAction>; viewState: ExchangeViewState }) {
  const locale: AppLocale = 'pt-BR'
  const range = useMemo(() => getPeriodRange(viewState.period), [viewState.period])
  const history = useRateHistory(viewState.pair.base, viewState.pair.quote, range.from, range.to)
  const records = history.data ?? []
  const current = records.at(-1)?.rate ?? null
  const change = calculatePercentageChange(records[0]?.rate ?? null, current)
  if (history.loading && !history.data) return <LoadingState message="Carregando evolução da cotação" />
  if (history.error && !history.data) return <ErrorState message="Não foi possível carregar a evolução deste par." onRetry={history.retry} />
  return (
    <Card as="section" className="converter-evolution-card" aria-labelledby="converter-evolution-title">
      <div className="converter-evolution-card__header"><div><h2 id="converter-evolution-title">Evolução da cotação</h2><p>{viewState.pair.base} / {viewState.pair.quote} <span>·</span> Taxas de referência</p></div><PeriodSelector compact value={viewState.period} onChange={(period) => dispatch({ type: 'setPeriod', value: period })} /></div>
      <div className="converter-evolution-card__divider" />
      {records.length ? <><div className="converter-evolution-card__summary"><div><strong>{current === null ? '—' : formatRateFixed(current, locale)}</strong><span>{viewState.pair.quote} por {viewState.pair.base}</span></div><span className="converter-evolution-card__performance">↗ {change === null ? '—' : `${change >= 0 ? '+' : ''}${change.toFixed(2).replace('.', ',')}% no período`}</span></div><ExchangeRateChart height={190} records={records} /></> : <EmptyState description="A fonte não devolveu pontos para este período." title="Sem dados históricos" />}
    </Card>
  )
}
