import { describe, expect, it } from 'vitest'
import { filterHistory, paginateHistory, sortHistory } from './historyPipeline'

const records = [
  { date: '2024-01-02', base: 'EUR', quote: 'USD', rate: 1.1 },
  { date: '2024-01-03', base: 'EUR', quote: 'USD', rate: 1.2 },
  { date: '2024-01-04', base: 'EUR', quote: 'USD', rate: 1.15 },
]

describe('history pipeline', () => {
  it('combines inclusive filters without mutating records', () => {
    const filtered = filterHistory(records, { from: '2024-01-03', to: '2024-01-04', minRate: '1.15', maxRate: '1.2' })
    expect(filtered.records.map((record) => record.date)).toEqual(['2024-01-03', '2024-01-04'])
    expect(records[0].date).toBe('2024-01-02')
  })

  it('sorts deterministically and paginates after sorting', () => {
    const sorted = sortHistory(records, 'rate', 'desc')
    expect(sorted[0].rate).toBe(1.2)
    expect(paginateHistory(sorted, 2, 2).records).toHaveLength(1)
  })
})
