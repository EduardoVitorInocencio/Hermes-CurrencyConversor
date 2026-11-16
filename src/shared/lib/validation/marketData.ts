const isoCurrencyPattern = /^[A-Z]{3}$/
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/

export function normalizeCurrencyCode(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const normalized = value.trim().toUpperCase()
  return isoCurrencyPattern.test(normalized) ? normalized : null
}

export function isValidIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !isoDatePattern.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value)
}

export function isFinitePositiveRate(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}
