import { describe, expect, it } from 'vitest'
import {
  currencyFlagMap,
  getFlagCountryForCurrency,
} from './flagMap'

describe('currency flag map', () => {
  it.each([
    ['EUR', 'EU'],
    ['USD', 'US'],
    ['GBP', 'GB'],
    ['BRL', 'BR'],
    ['JPY', 'JP'],
  ] as const)('maps %s to %s explicitly', (currencyCode, countryCode) => {
    expect(currencyFlagMap[currencyCode]).toBe(countryCode)
    expect(getFlagCountryForCurrency(currencyCode)).toBe(countryCode)
  })

  it('returns null for a currency without a supported mapping', () => {
    expect(getFlagCountryForCurrency('CAD')).toBeNull()
  })
})
