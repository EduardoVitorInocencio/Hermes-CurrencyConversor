import type { HistoryPeriod } from '../types/history'
import './history.css'

const periodOptions: Array<{ value: HistoryPeriod; label: string }> = [
  { value: '7D', label: '7 dias' },
  { value: '15D', label: '15 dias' },
  { value: '30D', label: '30 dias' },
  { value: '3M', label: '3 meses' },
  { value: '6M', label: '6 meses' },
  { value: '1A', label: '1 ano' },
  { value: '5A', label: '5 anos' },
  { value: '10A', label: '10 anos' },
]

export interface PeriodSelectorProps {
  value: HistoryPeriod
  onChange: (value: HistoryPeriod) => void
}

export function PeriodSelector({ onChange, value }: PeriodSelectorProps) {
  return (
    <div aria-label="Período histórico" className="history-period-selector" role="group">
      {periodOptions.map((period) => (
        <button
          aria-pressed={value === period.value}
          className={value === period.value ? 'is-selected' : undefined}
          key={period.value}
          onClick={() => onChange(period.value)}
          type="button"
        >
          {period.label}
        </button>
      ))}
    </div>
  )
}
