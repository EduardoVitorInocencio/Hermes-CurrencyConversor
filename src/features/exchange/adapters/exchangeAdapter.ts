import { isFinitePositiveRate, isValidIsoDate, normalizeCurrencyCode } from '@/shared/lib/validation/marketData'
import type { ExchangeRate, ExchangeRateDTO } from '../types/exchange'

export function adaptExchangeRate(payload: unknown): ExchangeRate {
  if (!payload || typeof payload !== 'object') throw new Error('Cotação inválida.')
  const dto = payload as ExchangeRateDTO
  const base = normalizeCurrencyCode(dto.base)
  const quote = normalizeCurrencyCode(dto.quote)
  if (!base || !quote || !isFinitePositiveRate(dto.rate)) throw new Error('Cotação inválida.')
  if (dto.date !== null && !isValidIsoDate(dto.date)) throw new Error('Data da cotação inválida.')
  return { base, quote, rate: dto.rate, date: dto.date === null ? null : dto.date }
}
