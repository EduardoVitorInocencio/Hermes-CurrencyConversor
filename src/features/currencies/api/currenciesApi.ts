import { axiosClient } from '@/shared/lib/api/axiosClient'
import { TtlCache } from '@/shared/lib/cache/ttlCache'
import { adaptCurrencies } from '../adapters/currencyAdapter'
import { getCurrencyCatalog, writeStoredCurrencyCatalog } from '../data/currencyCatalogStorage'
import type { CurrencyOption } from '../types/currency'

const currenciesCache = new TtlCache<CurrencyOption[]>()

export async function getCurrencies(signal?: AbortSignal): Promise<CurrencyOption[]> {
  const cached = currenciesCache.get('active')
  if (cached) return cached

  const fallback = getCurrencyCatalog()
  try {
    const response = await axiosClient.get<unknown>('/currencies', { signal })
    // The remote response is still validated, but the UI uses the versioned
    // local catalog so a provider outage cannot remove the currency options.
    adaptCurrencies(response.data)
    writeStoredCurrencyCatalog(fallback)
    currenciesCache.set('active', fallback, 24 * 60 * 60 * 1000)
    return fallback
  } catch (error) {
    if (signal?.aborted || (error instanceof Error && error.name === 'CanceledError')) throw error
    currenciesCache.set('active', fallback, 24 * 60 * 60 * 1000)
    return fallback
  }
}
