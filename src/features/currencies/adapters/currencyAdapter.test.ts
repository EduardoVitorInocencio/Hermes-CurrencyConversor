import { describe, expect, it } from 'vitest'
import { adaptCurrencies } from './currencyAdapter'
import { currenciesFixture } from '../fixtures/currencies.fixture'

describe('adaptCurrencies', () => {
  it('normalizes and sorts valid v2 currency objects', () => {
    expect(adaptCurrencies(currenciesFixture).map((item) => item.code)).toEqual(['BRL', 'EUR', 'USD'])
  })
  it('rejects invalid records instead of silently rendering them', () => {
    expect(() => adaptCurrencies([{ iso_code: 'BAD', name: '' }])).toThrow()
  })
})
