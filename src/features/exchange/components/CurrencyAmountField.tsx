import type { ReactNode } from 'react'
import { Input } from '@/shared/components/ui/Input'
import { Select, type SelectOption } from '@/shared/components/ui/Select'
import './CurrencyAmountField.css'

export interface CurrencyAmountFieldProps {
  id?: string
  label?: ReactNode
  currency: string
  currencies: SelectOption[]
  onCurrencyChange?: (value: string) => void
  amount: string
  onAmountChange?: (value: string) => void
  currencyLabel?: ReactNode
  amountLabel?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  disabled?: boolean
  loading?: boolean
  readOnly?: boolean
}

export function CurrencyAmountField({
  amount,
  amountLabel = 'Valor',
  currency,
  currencyLabel = 'Moeda',
  currencies,
  disabled = false,
  error,
  hint,
  id = 'currency-amount',
  label = 'Conversão',
  loading = false,
  onAmountChange,
  onCurrencyChange,
  readOnly = false,
}: CurrencyAmountFieldProps) {
  return (
    <fieldset className="currency-amount-field" disabled={disabled || loading}>
      <legend className="currency-amount-field__legend">{label}</legend>
      <div className="currency-amount-field__controls">
        <Select
          id={`${id}-currency`}
          label={currencyLabel}
          loading={loading}
          onValueChange={onCurrencyChange}
          options={currencies}
          value={currency}
        />
        <Input
          id={`${id}-amount`}
          inputMode="decimal"
          label={amountLabel}
          loading={loading}
          onChange={(event) => onAmountChange?.(event.target.value)}
          readOnly={readOnly}
          value={amount}
          error={error}
          hint={hint}
        />
      </div>
    </fieldset>
  )
}
