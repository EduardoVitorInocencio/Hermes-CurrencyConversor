import { axiosClient } from '@/shared/lib/api/axiosClient'
import { normalizeApiError } from '@/shared/lib/api/errors'
import { normalizeCurrencyCode } from '@/shared/lib/validation/marketData'
import { adaptExchangeRate } from '../adapters/exchangeAdapter'
import type { ExchangeRate } from '../types/exchange'

export async function getExchangeRate(base: string, quote: string, signal?: AbortSignal): Promise<ExchangeRate> {
  const normalizedBase = normalizeCurrencyCode(base)
  const normalizedQuote = normalizeCurrencyCode(quote)
  if (!normalizedBase || !normalizedQuote) throw new Error('Par de moedas inválido.')
  try {
    const response = await axiosClient.get<unknown>(`/rate/${normalizedBase.toLowerCase()}/${normalizedQuote.toLowerCase()}`, { signal })
    return adaptExchangeRate(response.data)
  } catch (error) {
    if (error instanceof Error && /^(Par|Cotação|Data)/.test(error.message)) throw error
    throw normalizeApiError(error)
  }
}
