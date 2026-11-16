import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Select, type SelectOption } from './Select'

const options: SelectOption[] = [
  { value: 'USD', code: 'USD', label: 'US Dollar' },
  { value: 'EUR', code: 'EUR', label: 'Euro' },
  { value: 'JPY', code: 'JPY', label: 'Japanese Yen' },
]

describe('Select', () => {
  it('filters case-insensitively and selects with keyboard', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Select label="Currency" options={options} onValueChange={onValueChange} />)
    const select = screen.getByRole('combobox', { name: 'Currency' })
    await user.click(select)
    await user.type(select, 'eur')
    expect(screen.getByRole('option', { name: /EUR/ })).toBeVisible()
    await user.keyboard('{Enter}')
    expect(onValueChange).toHaveBeenCalledWith('EUR')
    expect(select).toHaveValue('EUR — Euro')
  })

  it('exposes invalid and loading states', () => {
    render(<Select aria-label="Currency" error="Choose a currency" loading options={options} />)
    const select = screen.getByRole('combobox', { name: 'Currency' })
    expect(select).toBeDisabled()
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select).toHaveAttribute('aria-busy', 'true')
  })
})
