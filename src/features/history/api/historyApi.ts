import { axiosClient } from '@/shared/lib/api/axiosClient'
import { normalizeApiError } from '@/shared/lib/api/errors'
import { isValidIsoDate, normalizeCurrencyCode } from '@/shared/lib/validation/marketData'
import { adaptHistory } from '../adapters/historyAdapter'
import type { HistoryRecord } from '../types/history'

export async function getRateHistory(
  base: string,
  quote: string,
  from: string,
  to: string,
  signal?: AbortSignal,
): Promise<HistoryRecord[]> {
  const normalizedBase = normalizeCurrencyCode(base)
  const normalizedQuote = normalizeCurrencyCode(quote)
  if (!normalizedBase || !normalizedQuote || !isValidIsoDate(from) || !isValidIsoDate(to)) {
    throw new Error('Par ou intervalo inválido.')
  }
  try {
    const response = await axiosClient.get<unknown>('/rates', {
      params: { from, to, base: normalizedBase, quotes: normalizedQuote },
      signal,
    })
    return adaptHistory(response.data)
  } catch (error) {
    if (error instanceof Error && /^(Par|Histórico)/.test(error.message)) throw error
    throw normalizeApiError(error)
  }
}
