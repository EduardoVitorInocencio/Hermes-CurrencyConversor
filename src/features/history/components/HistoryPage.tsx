import { useMemo, useState } from 'react'
import type { Dispatch } from 'react'
import { Card } from '@/shared/components/ui/Card'
import { Typography } from '@/shared/components/ui/Typography'
import { LoadingState, ErrorState, EmptyState } from '@/shared/components/feedback'
import { useRateHistory } from '../hooks/useRateHistory'
import { getPeriodRange } from '../utils/getPeriodRange'
import { filterHistory, paginateHistory, sortHistory } from '../utils/historyPipeline'
import type { HistorySortField, SortDirection } from '../types/history'
import type { ExchangeViewAction, ExchangeViewState } from '@/shared/types/view'
import { PeriodSelector } from './PeriodSelector'
import { RateSummary } from './RateSummary'
import { ExchangeRateChart } from './ExchangeRateChart'
import { HistoryFilters } from './HistoryFilters'
import { HistoryTable } from './HistoryTable'
import { RecordCount } from './RecordCount'
import { Pagination } from './Pagination'
import { SortButton } from './SortButton'
import { ExportCsvButton } from '@/features/export/components/ExportCsvButton'
import './history.css'

export function HistoryPage({ dispatch, viewState }: { viewState: ExchangeViewState; dispatch: Dispatch<ExchangeViewAction> }) {
  const [sortField, setSortField] = useState<HistorySortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const range = useMemo(() => getPeriodRange(viewState.period), [viewState.period])
  const history = useRateHistory(viewState.pair.base, viewState.pair.quote, range.from, range.to)
  const sourceRecords = history.data ?? []
  const filterResult = filterHistory(sourceRecords, viewState.filters)
  const sortedRecords = sortHistory(filterResult.records, sortField, sortDirection)
  const pagedRecords = paginateHistory(sortedRecords, viewState.page, 10)

  function handleSort(field: HistorySortField) {
    if (field === sortField) setSortDirection((direction) => direction === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDirection('asc') }
  }

  if (history.loading && !history.data) return <LoadingState message="Carregando histórico" />
  if (history.error && !history.data) return <ErrorState message="Não foi possível carregar o histórico deste par." onRetry={history.retry} />

  return (
    <div className="history-feature">
      <div className="history-feature__header">
        <div><Typography variant="h2">Evolução da cotação</Typography><p className="history-feature__pair">{viewState.pair.base} → {viewState.pair.quote}</p></div>
        <ExportCsvButton filename={`hermes-${viewState.pair.base}-${viewState.pair.quote}-${viewState.period}.csv`} records={sortedRecords} />
      </div>
      <PeriodSelector value={viewState.period} onChange={(period) => dispatch({ type: 'setPeriod', value: period })} />
      {history.stale ? <p className="history-feature__pair">Exibindo o último histórico disponível enquanto a nova consulta é concluída.</p> : null}
      <RateSummary records={sourceRecords} />
      <ExchangeRateChart records={filterResult.records} />
      <Card as="section" aria-labelledby="history-table-title">
        <div className="history-feature__header"><Typography variant="h3" id="history-table-title">Histórico detalhado</Typography><RecordCount count={sortedRecords.length} /></div>
        <HistoryFilters error={filterResult.error} filters={viewState.filters} onChange={(filters) => dispatch({ type: 'setFilters', value: filters })} onClear={() => dispatch({ type: 'clearFilters' })} />
        <div className="history-table__sort"><SortButton direction={sortDirection} field="date" label="Data" onChange={handleSort} /><SortButton direction={sortDirection} field="rate" label="Cotação" onChange={handleSort} /></div>
        {filterResult.error ? null : pagedRecords.records.length ? <HistoryTable records={pagedRecords.records} /> : <EmptyState description="Não há registros reais para o par e filtros selecionados." title="Histórico vazio" />}
        <Pagination currentPage={pagedRecords.currentPage} onChange={(page) => dispatch({ type: 'setPage', value: page })} totalPages={pagedRecords.totalPages} />
      </Card>
    </div>
  )
}
