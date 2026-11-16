import { useCallback, useEffect, useState } from 'react'
import { normalizeApiError } from '@/shared/lib/api/errors'
import type { RequestState } from '@/shared/types/requests'
import { getRateHistory } from '../api/historyApi'
import type { HistoryRecord } from '../types/history'

export function useRateHistory(base: string, quote: string, from: string, to: string, enabled = true) {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<RequestState<HistoryRecord[]>>({ data: null, loading: enabled, error: null, stale: false })
  useEffect(() => {
    if (!enabled || !base || !quote || !from || !to) return
    const controller = new AbortController()
    let current = true
    queueMicrotask(() => {
      if (current) setState((previous) => ({ ...previous, loading: true, error: null, stale: Boolean(previous.data) }))
    })
    getRateHistory(base, quote, from, to, controller.signal)
      .then((data) => { if (current) setState({ data, loading: false, error: null, stale: false }) })
      .catch((error: unknown) => {
        if (current && !(error instanceof Error && error.name === 'CanceledError')) {
          setState((previous) => ({ ...previous, loading: false, error: normalizeApiError(error), stale: Boolean(previous.data) }))
        }
      })
    return () => { current = false; controller.abort() }
  }, [attempt, base, enabled, from, quote, to])
  const retry = useCallback(() => setAttempt((value) => value + 1), [])
  return { ...state, retry }
}
