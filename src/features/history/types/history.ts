export interface HistoryRecord {
  date: string
  base: string
  quote: string
  rate: number
}

export type HistoryPeriod = '7D' | '15D' | '30D' | '3M' | '6M' | '1A' | '5A' | '10A'

export interface HistoryFiltersState {
  from: string
  to: string
  minRate: string
  maxRate: string
}

export type HistorySortField = 'date' | 'rate'
export type SortDirection = 'asc' | 'desc'
