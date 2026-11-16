import { isFinitePositiveRate, isValidIsoDate, normalizeCurrencyCode } from '@/shared/lib/validation/marketData'
import type { HistoryRecord } from '../types/history'

export function adaptHistory(payload: unknown): HistoryRecord[] {
  if (!Array.isArray(payload)) throw new Error('Histórico inválido.')
  const records = payload.map((item) => {
    if (!item || typeof item !== 'object') throw new Error('Histórico contém registro inválido.')
    const row = item as Record<string, unknown>
    const date = isValidIsoDate(row.date) ? row.date : null
    const base = normalizeCurrencyCode(row.base)
    const quote = normalizeCurrencyCode(row.quote)
    if (!date || !base || !quote || !isFinitePositiveRate(row.rate)) {
      throw new Error('Histórico contém registro inválido.')
    }
    return { date, base, quote, rate: row.rate }
  })
  return records.sort((a, b) => a.date.localeCompare(b.date))
}
