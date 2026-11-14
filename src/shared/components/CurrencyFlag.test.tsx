import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CurrencyFlag } from './CurrencyFlag'

describe('CurrencyFlag', () => {
  it('keeps the currency code visible with a mapped flag', () => {
    const { container } = render(<CurrencyFlag currencyCode="EUR" />)

    expect(screen.getByText('EUR')).toBeInTheDocument()
    expect(container.firstElementChild).toHaveAttribute('data-flag-country', 'EU')
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('keeps the code visible and uses a neutral fallback when unmapped', () => {
    const { container } = render(<CurrencyFlag currencyCode="CAD" />)

    expect(screen.getByText('CAD')).toBeInTheDocument()
    expect(container.firstElementChild).toHaveAttribute(
      'data-flag-country',
      'unknown',
    )
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })
})
