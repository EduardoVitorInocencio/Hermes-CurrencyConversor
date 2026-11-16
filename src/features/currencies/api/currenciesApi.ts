import { axiosClient } from '@/shared/lib/api/axiosClient'
import { normalizeApiError } from '@/shared/lib/api/errors'
import { TtlCache } from '@/shared/lib/cache/ttlCache'
import { adaptCurrencies } from '../adapters/currencyAdapter'
import type { CurrencyOption } from '../types/currency'

const currenciesCache = new TtlCache<CurrencyOption[]>()

export async function getCurrencies(signal?: AbortSignal): Promise<CurrencyOption[]> {
  const cached = currenciesCache.get('active')
  if (cached) return cached
  try {
    const response = await axiosClient.get<unknown>('/currencies', { signal })
    const currencies = adaptCurrencies(response.data)
    currenciesCache.set('active', currencies, 24 * 60 * 60 * 1000)
    return currencies
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Catálogo')) throw error
    throw normalizeApiError(error)
  }
}
