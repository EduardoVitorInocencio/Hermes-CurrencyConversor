import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CurrencyAmountField } from './CurrencyAmountField'

describe('CurrencyAmountField', () => {
  it('keeps ISO code visible and amount as text', () => {
    render(
      <CurrencyAmountField
        amount="0"
        currencies={[{ value: 'USD', code: 'USD', label: 'US Dollar' }]}
        currency="USD"
        onAmountChange={vi.fn()}
      />,
    )
    expect(screen.getByRole('combobox', { name: 'Moeda' })).toHaveValue('USD — US Dollar')
    expect(screen.getByRole('textbox', { name: 'Valor' })).toHaveValue('0')
  })
})
