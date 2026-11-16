import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import type { HistoryFiltersState } from '../types/history'
import './history.css'

export interface HistoryFiltersProps {
  filters: HistoryFiltersState
  error: string | null
  onChange: (filters: HistoryFiltersState) => void
  onClear: () => void
}

export function HistoryFilters({ error, filters, onChange, onClear }: HistoryFiltersProps) {
  return (
    <div className="history-filters">
      <Input label="De" type="date" value={filters.from} onChange={(event) => onChange({ ...filters, from: event.target.value })} />
      <Input label="Até" type="date" value={filters.to} onChange={(event) => onChange({ ...filters, to: event.target.value })} />
      <Input inputMode="decimal" label="Cotação mínima" value={filters.minRate} onChange={(event) => onChange({ ...filters, minRate: event.target.value })} />
      <Input inputMode="decimal" label="Cotação máxima" value={filters.maxRate} onChange={(event) => onChange({ ...filters, maxRate: event.target.value })} />
      <div className="history-filters__actions"><Button onClick={onClear} variant="quiet">Limpar filtros</Button></div>
      {error ? <p className="history-filters__error" role="alert">{error}</p> : null}
    </div>
  )
}
