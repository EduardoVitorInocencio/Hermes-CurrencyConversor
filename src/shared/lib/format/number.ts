export type AppLocale = 'pt-BR' | 'en-US' | 'es-ES'

const localeSeparators: Record<AppLocale, { decimal: string; grouping: string }> = {
  'pt-BR': { decimal: ',', grouping: '.' },
  'en-US': { decimal: '.', grouping: ',' },
  'es-ES': { decimal: ',', grouping: '.' },
}

export function parseLocalizedNumber(value: string, locale: AppLocale): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const { decimal, grouping } = localeSeparators[locale]
  const normalized = trimmed.replaceAll(grouping, '').replace(decimal, '.')
  if (!/^(?:\d+|\d*\.\d+)$/.test(normalized)) return null
  const result = Number(normalized)
  return Number.isFinite(result) ? result : null
}

export function formatNumber(value: number, locale: AppLocale, maximumFractionDigits = 2) {
  return new Intl.NumberFormat(locale, { maximumFractionDigits, minimumFractionDigits: 0 }).format(value)
}

export function formatCurrency(value: number, code: string, locale: AppLocale) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: code, maximumFractionDigits: 2 }).format(value)
}

export function formatRate(value: number, locale: AppLocale) {
  const digits = Math.abs(value) > 0 && Math.abs(value) < 0.01 ? 6 : 4
  return formatNumber(value, locale, digits)
}

export function formatRateFixed(value: number, locale: AppLocale) {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 4, minimumFractionDigits: 4 }).format(value)
}
