import { useReducer } from 'react'
import { exchangeViewReducer, initialExchangeViewState } from '@/shared/types/view'

export function useExchangeViewState() {
  return useReducer(exchangeViewReducer, initialExchangeViewState)
}
