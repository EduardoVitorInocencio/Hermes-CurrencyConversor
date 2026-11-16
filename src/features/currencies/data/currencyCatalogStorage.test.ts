import { beforeEach, describe, expect, it } from 'vitest'
import { CURRENCY_CATALOG_VERSION, STATIC_CURRENCY_OPTIONS } from './currencies'
import {
  CURRENCY_CATALOG_STORAGE_KEY,
  getCurrencyCatalog,
  readStoredCurrencyCatalog,
} from './currencyCatalogStorage'

describe('currency catalog fallback', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('contains a unique static mapping for the complete provider catalog', () => {
    const codes = STATIC_CURRENCY_OPTIONS.map((option) => option.code)

    expect(codes.length).toBeGreaterThanOrEqual(200)
    expect(new Set(codes).size).toBe(codes.length)
    expect(codes).toEqual([...codes].sort())
    expect(codes).toEqual(expect.arrayContaining(['BRL', 'EUR', 'GBP', 'JPY', 'USD', 'BTC', 'XAU']))
  })

  it('persists the static catalog and rehydrates it from localStorage', () => {
    const catalog = getCurrencyCatalog()
    const stored = JSON.parse(localStorage.getItem(CURRENCY_CATALOG_STORAGE_KEY) ?? '{}') as { version?: number; currencies?: unknown[] }

    expect(catalog).toHaveLength(STATIC_CURRENCY_OPTIONS.length)
    expect(stored.version).toBe(CURRENCY_CATALOG_VERSION)
    expect(stored.currencies).toHaveLength(STATIC_CURRENCY_OPTIONS.length)
    expect(readStoredCurrencyCatalog()).toEqual(catalog)
  })

  it('ignores an incomplete cache and returns the static fallback', () => {
    localStorage.setItem(CURRENCY_CATALOG_STORAGE_KEY, JSON.stringify({ version: CURRENCY_CATALOG_VERSION, currencies: [{ value: 'EUR', code: 'EUR', label: 'Euro', symbol: '€' }] }))

    const catalog = getCurrencyCatalog()

    expect(catalog).toHaveLength(STATIC_CURRENCY_OPTIONS.length)
    expect(catalog.find((option) => option.code === 'BRL')?.label).toBe('Brazilian Real')
  })
})
