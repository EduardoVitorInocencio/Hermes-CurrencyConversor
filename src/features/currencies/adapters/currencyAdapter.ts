import { normalizeCurrencyCode } from '@/shared/lib/validation/marketData'
import type { CurrencyDTO, CurrencyOption } from '../types/currency'

export function adaptCurrencies(payload: unknown): CurrencyOption[] {
  if (!Array.isArray(payload)) throw new Error('Catálogo de moedas inválido.')
  const options = payload.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const dto = item as CurrencyDTO
    const code = normalizeCurrencyCode(dto.iso_code)
    const label = typeof dto.name === 'string' ? dto.name.trim() : ''
    if (!code || !label) return []
    return [{
      value: code,
      code,
      label,
      symbol: typeof dto.symbol === 'string' ? dto.symbol : '',
    }]
  })
  if (options.length !== payload.length) throw new Error('Catálogo de moedas contém registros inválidos.')
  return options.sort((a, b) => a.code.localeCompare(b.code))
}
