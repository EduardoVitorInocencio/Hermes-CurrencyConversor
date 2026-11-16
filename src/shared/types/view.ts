import type { HistoryFiltersState, HistoryPeriod } from '@/features/history/types/history'

export interface CurrencyPair {
  base: string
  quote: string
}

export interface ExchangeViewState {
  pair: CurrencyPair
  amount: string
  period: HistoryPeriod
  filters: HistoryFiltersState
  page: number
}

export type ExchangeViewAction =
  | { type: 'setBase'; value: string }
  | { type: 'setQuote'; value: string }
  | { type: 'setAmount'; value: string }
  | { type: 'swap' }
  | { type: 'setPeriod'; value: HistoryPeriod }
  | { type: 'setFilters'; value: HistoryFiltersState }
  | { type: 'clearFilters' }
  | { type: 'setPage'; value: number }

export const initialExchangeViewState: ExchangeViewState = {
  pair: { base: 'EUR', quote: 'USD' },
  amount: '',
  period: '30D',
  filters: { from: '', to: '', minRate: '', maxRate: '' },
  page: 1,
}

export function exchangeViewReducer(
  state: ExchangeViewState,
  action: ExchangeViewAction,
): ExchangeViewState {
  switch (action.type) {
    case 'setBase':
      return { ...state, pair: { ...state.pair, base: action.value }, filters: initialExchangeViewState.filters, page: 1 }
    case 'setQuote':
      return { ...state, pair: { ...state.pair, quote: action.value }, filters: initialExchangeViewState.filters, page: 1 }
    case 'setAmount':
      return { ...state, amount: action.value }
    case 'swap':
      return { ...state, pair: { base: state.pair.quote, quote: state.pair.base }, filters: initialExchangeViewState.filters, page: 1 }
    case 'setPeriod':
      return { ...state, period: action.value, filters: initialExchangeViewState.filters, page: 1 }
    case 'setFilters':
      return { ...state, filters: action.value, page: 1 }
    case 'clearFilters':
      return { ...state, filters: initialExchangeViewState.filters, page: 1 }
    case 'setPage':
      return { ...state, page: Math.max(1, action.value) }
  }
}
