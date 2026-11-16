import { calculatePercentageChange } from '../utils/calculatePercentageChange'
import type { HistoryRecord } from '../types/history'
import { formatRate, type AppLocale } from '@/shared/lib/format/number'
import './history.css'

export function RateSummary({ records }: { records: HistoryRecord[] }) {
  const first = records[0]?.rate ?? null
  const last = records.at(-1)?.rate ?? null
  const change = calculatePercentageChange(first, last)
  const locale: AppLocale = 'pt-BR'
  return (
    <div className="history-summary" aria-label="Resumo da cotação">
      <div><span>Inicial</span><strong>{first === null ? '—' : formatRate(first, locale)}</strong></div>
      <div><span>Atual</span><strong>{last === null ? '—' : formatRate(last, locale)}</strong></div>
      <div><span>Variação</span><strong>{change === null ? '—' : `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`}</strong></div>
    </div>
  )
}
