import { describe, expect, it } from 'vitest'
import { adaptHistory } from './historyAdapter'
import { historyFixture } from '../fixtures/history.fixture'

describe('adaptHistory', () => {
  it('preserves validated rows and canonical order', () => {
    expect(adaptHistory([...historyFixture].reverse())).toEqual(historyFixture)
  })
  it('rejects an invalid row', () => {
    expect(() => adaptHistory([{ date: '2024-01-01', base: 'EUR', quote: 'USD', rate: null }])).toThrow()
  })
})
