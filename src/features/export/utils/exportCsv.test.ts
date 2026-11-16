import { describe, expect, it } from 'vitest'
import { exportCsv } from './exportCsv'

describe('exportCsv', () => {
  it('writes BOM, RFC-compatible cells and all filtered records', () => {
    const csv = exportCsv([{ date: '2024-01-01', base: 'EUR', quote: 'USD', rate: 1.1 }])
    expect(csv).toContain('\uFEFF"data","moeda_origem","moeda_destino","cotacao"')
    expect(csv).toContain('"2024-01-01","EUR","USD","1.1"')
    expect(exportCsv([])).toBeNull()
  })
})
