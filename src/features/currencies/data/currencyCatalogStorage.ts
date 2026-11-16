import { CURRENCY_CATALOG_VERSION, getStaticCurrencyOptions } from './currencies'
import type { CurrencyOption } from '../types/currency'

export const CURRENCY_CATALOG_STORAGE_KEY = 'hermes.currency.catalog.v1'

interface StoredCurrencyCatalog {
  version: number
  savedAt: string
  currencies: unknown
}

function getStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

function isCurrencyOption(value: unknown): value is CurrencyOption {
  if (!value || typeof value !== 'object') return false
  const option = value as Partial<CurrencyOption>
  return [option.value, option.code, option.label, option.symbol].every((field) => typeof field === 'string')
}

export function readStoredCurrencyCatalog(): CurrencyOption[] | null {
  const storage = getStorage()
  if (!storage) return null

  try {
    const raw = storage.getItem(CURRENCY_CATALOG_STORAGE_KEY)
    if (!raw) return null
    const stored = JSON.parse(raw) as Partial<StoredCurrencyCatalog>
    if (stored.version !== CURRENCY_CATALOG_VERSION || !Array.isArray(stored.currencies)) return null

    const currencies = stored.currencies.filter(isCurrencyOption)
    const expectedCodes = getStaticCurrencyOptions().map((option) => option.code)
    const storedCodes = new Set(currencies.map((option) => option.code))
    if (currencies.length !== expectedCodes.length || expectedCodes.some((code) => !storedCodes.has(code))) return null

    return expectedCodes.map((code) => currencies.find((option) => option.code === code) as CurrencyOption)
  } catch {
    return null
  }
}

export function writeStoredCurrencyCatalog(currencies: readonly CurrencyOption[]): void {
  const storage = getStorage()
  if (!storage) return

  try {
    const payload: StoredCurrencyCatalog = {
      version: CURRENCY_CATALOG_VERSION,
      savedAt: new Date().toISOString(),
      currencies,
    }
    storage.setItem(CURRENCY_CATALOG_STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // A quota or privacy restriction must not prevent the static catalog from rendering.
  }
}

export function getCurrencyCatalog(): CurrencyOption[] {
  const stored = readStoredCurrencyCatalog()
  if (stored) return stored

  const staticCatalog = getStaticCurrencyOptions()
  writeStoredCurrencyCatalog(staticCatalog)
  return staticCatalog
}
