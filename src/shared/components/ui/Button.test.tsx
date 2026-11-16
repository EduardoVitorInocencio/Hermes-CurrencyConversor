import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders a semantic button and calls its action', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>Export CSV</Button>)

    const button = screen.getByRole('button', { name: 'Export CSV' })
    await user.click(button)

    expect(button).toHaveAttribute('type', 'button')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('supports HERMES variants, compact size and icon-only accessible names', () => {
    const { rerender } = render(
      <Button variant="secondary" size="sm">
        Clear filters
      </Button>,
    )

    expect(screen.getByRole('button')).toHaveClass(
      'hermes-button--secondary',
      'hermes-button--sm',
    )

    rerender(
      <Button aria-label="Swap currencies" icon={<span>↔</span>} />,
    )

    expect(screen.getByRole('button', { name: 'Swap currencies' })).toBeInTheDocument()
  })

  it('disables duplicate action while loading and preserves the label', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button loading onClick={onClick}>
        Export CSV
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Export CSV' })
    await user.click(button)

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toHaveAttribute('data-state', 'loading')
    expect(onClick).not.toHaveBeenCalled()
  })

  it('can receive keyboard focus', () => {
    render(<Button>Focus me</Button>)

    const button = screen.getByRole('button', { name: 'Focus me' })
    button.focus()

    expect(button).toHaveFocus()
  })
})
