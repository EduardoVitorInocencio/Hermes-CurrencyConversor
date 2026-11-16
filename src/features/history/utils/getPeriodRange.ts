import type { HistoryPeriod } from '../types/history'

export interface PeriodRange {
  from: string
  to: string
}

function asUtcDate(value: Date | string) {
  if (typeof value === 'string') return new Date(`${value.slice(0, 10)}T00:00:00Z`)
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()))
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10)
}

function subtractCalendar(date: Date, amount: number, unit: 'month' | 'year') {
  const targetMonth = date.getUTCMonth() - (unit === 'month' ? amount : amount * 12)
  const result = new Date(Date.UTC(date.getUTCFullYear(), targetMonth, 1))
  const lastDay = new Date(Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)).getUTCDate()
  result.setUTCDate(Math.min(date.getUTCDate(), lastDay))
  return result
}

export function getPeriodRange(period: HistoryPeriod, referenceDate: Date | string = new Date()): PeriodRange {
  const to = asUtcDate(referenceDate)
  if (Number.isNaN(to.getTime())) throw new Error('Data de referência inválida.')
  const from = period === '7D'
    ? new Date(to.getTime() - 6 * 86_400_000)
    : period === '15D'
      ? new Date(to.getTime() - 14 * 86_400_000)
      : period === '30D'
        ? new Date(to.getTime() - 29 * 86_400_000)
        : period === '3M'
          ? subtractCalendar(to, 3, 'month')
          : period === '6M'
            ? subtractCalendar(to, 6, 'month')
            : period === '1A'
              ? subtractCalendar(to, 1, 'year')
              : period === '5A'
                ? subtractCalendar(to, 5, 'year')
                : subtractCalendar(to, 10, 'year')
  return { from: formatDate(from), to: formatDate(to) }
}
