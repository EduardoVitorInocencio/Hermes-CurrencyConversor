import type { CurrencyCode, SupportedCurrencyCode } from '../types/currency'

export type FlagCountryCode = 'BR' | 'EU' | 'GB' | 'JP' | 'US'

/**
 * Explicit ISO 4217 currency → ISO 3166/user-assigned territory mapping.
 * EUR intentionally uses EU because it represents the euro area, not one country.
 */
export const currencyFlagMap: Readonly<Record<SupportedCurrencyCode, FlagCountryCode>> = {
  EUR: 'EU',
  USD: 'US',
  GBP: 'GB',
  BRL: 'BR',
  JPY: 'JP',
}

export function getFlagCountryForCurrency(
  currencyCode: CurrencyCode,
): FlagCountryCode | null {
  const normalizedCode = currencyCode.trim().toUpperCase()

  if (!Object.hasOwn(currencyFlagMap, normalizedCode)) {
    return null
  }

  return currencyFlagMap[normalizedCode as SupportedCurrencyCode]
}
