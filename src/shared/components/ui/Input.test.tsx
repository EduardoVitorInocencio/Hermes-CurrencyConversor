import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('associates label, hint and error with the control', () => {
    render(<Input label="Amount" hint="Use decimals" error="Amount is required" />)
    const input = screen.getByRole('textbox', { name: 'Amount' })
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Use decimals Amount is required')
  })

  it('keeps zero and empty values as authored strings', async () => {
    const user = userEvent.setup()
    let currentValue = '0'
    render(
      <Input
        aria-label="Amount"
        value={currentValue}
        onChange={(event) => {
          currentValue = event.target.value
        }}
      />,
    )
    const input = screen.getByRole('textbox', { name: 'Amount' })
    expect(input).toHaveValue('0')
    await user.clear(input)
    expect(currentValue).toBe('')
  })
})
