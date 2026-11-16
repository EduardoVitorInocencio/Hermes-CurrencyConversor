import type { HistoryFiltersState, HistoryRecord, HistorySortField, SortDirection } from '../types/history'

export interface HistoryFilterResult {
  records: HistoryRecord[]
  error: string | null
}

function optionalNumber(value: string) {
  if (!value.trim()) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function filterHistory(records: HistoryRecord[], filters: HistoryFiltersState): HistoryFilterResult {
  const minRate = optionalNumber(filters.minRate)
  const maxRate = optionalNumber(filters.maxRate)
  if (filters.minRate.trim() && minRate === null) return { records: [], error: 'Mínimo de cotação inválido.' }
  if (filters.maxRate.trim() && maxRate === null) return { records: [], error: 'Máximo de cotação inválido.' }
  if (minRate !== null && maxRate !== null && minRate > maxRate) return { records: [], error: 'O mínimo não pode ser maior que o máximo.' }
  if (filters.from && filters.to && filters.from > filters.to) return { records: [], error: 'A data inicial não pode ser posterior à final.' }
  return {
    error: null,
    records: records.filter((record) =>
      (!filters.from || record.date >= filters.from) &&
      (!filters.to || record.date <= filters.to) &&
      (minRate === null || record.rate >= minRate) &&
      (maxRate === null || record.rate <= maxRate),
    ),
  }
}

export function sortHistory(records: HistoryRecord[], field: HistorySortField = 'date', direction: SortDirection = 'asc') {
  const factor = direction === 'asc' ? 1 : -1
  return [...records].sort((a, b) => {
    const primary = field === 'date' ? a.date.localeCompare(b.date) : a.rate - b.rate
    if (primary !== 0) return primary * factor
    return a.date.localeCompare(b.date) * factor
  })
}

export function paginateHistory(records: HistoryRecord[], page: number, pageSize: number) {
  const safePage = Math.max(1, page)
  const safePageSize = Math.max(1, pageSize)
  const totalPages = Math.max(1, Math.ceil(records.length / safePageSize))
  const currentPage = Math.min(safePage, totalPages)
  return {
    records: records.slice((currentPage - 1) * safePageSize, currentPage * safePageSize),
    currentPage,
    totalPages,
    total: records.length,
  }
}
