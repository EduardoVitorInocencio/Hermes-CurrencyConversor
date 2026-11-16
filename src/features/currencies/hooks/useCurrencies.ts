import { useCallback, useEffect, useState } from 'react'
import type { RequestState } from '@/shared/types/requests'
import { getCurrencies } from '../api/currenciesApi'
import { getCurrencyCatalog } from '../data/currencyCatalogStorage'
import type { CurrencyOption } from '../types/currency'

export function useCurrencies(enabled = true) {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<RequestState<CurrencyOption[]>>(() => ({
    data: enabled ? getCurrencyCatalog() : null,
    loading: enabled,
    error: null,
    stale: enabled,
  }))
  useEffect(() => {
    if (!enabled) return
    const controller = new AbortController()
    let current = true
    queueMicrotask(() => {
      if (current) setState((previous) => ({ ...previous, data: previous.data ?? getCurrencyCatalog(), loading: true, error: null, stale: true }))
    })
    getCurrencies(controller.signal)
      .then((data) => { if (current) setState({ data, loading: false, error: null, stale: false }) })
      .catch((error: unknown) => {
        if (current && !(error instanceof Error && error.name === 'CanceledError')) {
          setState({ data: getCurrencyCatalog(), loading: false, error: null, stale: true })
        }
      })
    return () => { current = false; controller.abort() }
  }, [attempt, enabled])
  const retry = useCallback(() => setAttempt((value) => value + 1), [])
  return { ...state, retry }
}
