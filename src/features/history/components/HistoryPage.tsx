import { useMemo } from 'react'
import type { Dispatch } from 'react'
import { Card } from '@/shared/components/ui/Card'
import { Typography } from '@/shared/components/ui/Typography'
import { LoadingState, ErrorState, EmptyState } from '@/shared/components/feedback'
import { useRateHistory } from '../hooks/useRateHistory'
import { getPeriodRange } from '../utils/getPeriodRange'
import { filterHistory, paginateHistory, sortHistory } from '../utils/historyPipeline'
import type { ExchangeViewAction, ExchangeViewState } from '@/shared/types/view'
import { HistoryFilters } from './HistoryFilters'
import { HistoryTable } from './HistoryTable'
import { RecordCount } from './RecordCount'
import { Pagination } from './Pagination'
import { ExportCsvButton } from '@/features/export/components/ExportCsvButton'
import './history.css'

export function HistoryPage({ dispatch, viewState }: { viewState: ExchangeViewState; dispatch: Dispatch<ExchangeViewAction> }) {
  const range = useMemo(() => getPeriodRange(viewState.period), [viewState.period])
  const history = useRateHistory(viewState.pair.base, viewState.pair.quote, range.from, range.to)
  const sourceRecords = history.data ?? []
  const filterResult = filterHistory(sourceRecords, viewState.filters)
  const sortedRecords = sortHistory(filterResult.records, 'date', 'desc')
  const pagedRecords = paginateHistory(sortedRecords, viewState.page, 2)

  if (history.loading && !history.data) return <LoadingState message="Carregando histórico" />
  if (history.error && !history.data) return <ErrorState message="Não foi possível carregar o histórico deste par." onRetry={history.retry} />

  return (
    <div className="history-feature">
      <Card as="section" className="converter-history-card" aria-labelledby="history-table-title">
        <div className="history-feature__header"><div><Typography variant="h2" id="history-table-title">Histórico detalhado</Typography><p className="history-feature__pair">Filtre os registros antes de exportar.</p></div><ExportCsvButton filename={`hermes-${viewState.pair.base}-${viewState.pair.quote}-${viewState.period}.csv`} records={sortedRecords} variant="primary" /></div>
        <HistoryFilters error={filterResult.error} filters={viewState.filters} onChange={(filters) => dispatch({ type: 'setFilters', value: filters })} onClear={() => dispatch({ type: 'clearFilters' })} />
        <RecordCount count={sortedRecords.length} />
        {filterResult.error ? null : pagedRecords.records.length ? <HistoryTable records={pagedRecords.records} /> : <EmptyState description="Não há registros reais para o par e filtros selecionados." title="Histórico vazio" />}
        <Pagination currentPage={pagedRecords.currentPage} onChange={(page) => dispatch({ type: 'setPage', value: page })} pageSize={2} totalItems={sortedRecords.length} totalPages={pagedRecords.totalPages} />
      </Card>
    </div>
  )
}
