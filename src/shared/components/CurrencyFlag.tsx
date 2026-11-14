import { BR, EU, GB, JP, US } from 'country-flag-icons/react/3x2'
import type { FlagCountryCode } from '@/features/currencies/constants/flagMap'
import { getFlagCountryForCurrency } from '@/features/currencies/constants/flagMap'
import './CurrencyFlag.css'

type FlagComponent = typeof BR

const flagComponents: Record<FlagCountryCode, FlagComponent> = {
  BR,
  EU,
  GB,
  JP,
  US,
}

export interface CurrencyFlagProps {
  currencyCode: string
  className?: string
}

export function CurrencyFlag({ currencyCode, className }: CurrencyFlagProps) {
  const normalizedCode = currencyCode.trim().toUpperCase()
  const visibleCode = normalizedCode || '—'
  const countryCode = getFlagCountryForCurrency(normalizedCode)
  const Flag = countryCode ? flagComponents[countryCode] : null
  const rootClassName = ['currency-flag', className].filter(Boolean).join(' ')

  return (
    <span
      className={rootClassName}
      data-flag-country={countryCode ?? 'unknown'}
      data-currency-code={visibleCode}
    >
      <span className="currency-flag__visual" aria-hidden="true">
        {Flag ? (
          <Flag className="currency-flag__icon" focusable="false" />
        ) : (
          <span className="currency-flag__fallback">—</span>
        )}
      </span>
      <span className="currency-flag__code">{visibleCode}</span>
    </span>
  )
}
