import { describe, expect, it } from 'vitest'
import { adaptExchangeRate } from './exchangeAdapter'
import { rateFixture } from '../fixtures/rate.fixture'

describe('adaptExchangeRate', () => {
  it('accepts the v2 single-pair contract', () => {
    expect(adaptExchangeRate(rateFixture)).toEqual(rateFixture)
  })
  it('rejects non-finite rates', () => {
    expect(() => adaptExchangeRate({ ...rateFixture, rate: Number.NaN })).toThrow()
  })
})
