import { describe, expect, it } from 'vitest'
import { exchangeViewReducer, initialExchangeViewState } from '@/shared/types/view'

describe('exchangeViewReducer', () => {
  it('swaps the pair and resets incompatible history state', () => {
    const next = exchangeViewReducer(
      { ...initialExchangeViewState, pair: { base: 'USD', quote: 'BRL' }, page: 4 },
      { type: 'swap' },
    )
    expect(next.pair).toEqual({ base: 'BRL', quote: 'USD' })
    expect(next.page).toBe(1)
    expect(next.filters).toEqual(initialExchangeViewState.filters)
  })
})
