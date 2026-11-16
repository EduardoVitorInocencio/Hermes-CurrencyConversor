import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('renders landmarks, heading and active navigation', () => {
    render(<AppShell />)
    expect(screen.getByRole('main', { name: 'Conversor' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Conversor', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Seções principais' })).toBeInTheDocument()
  })

  it('changes sections without a page reload', async () => {
    const user = userEvent.setup()
    render(<AppShell />)
    const desktopNavigation = screen.getByRole('navigation', { name: 'Seções principais' })
    await user.click(within(desktopNavigation).getByRole('button', { name: 'Histórico' }))
    expect(screen.getByRole('heading', { name: 'Histórico', level: 1 })).toBeInTheDocument()
    expect(within(desktopNavigation).getByRole('button', { name: 'Histórico' })).toHaveAttribute('aria-current', 'page')
  })
})
