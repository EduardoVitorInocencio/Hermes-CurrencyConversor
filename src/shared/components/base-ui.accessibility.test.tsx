import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { EmptyState } from './feedback/EmptyState'
import { ErrorState } from './feedback/ErrorState'
import { LoadingState } from './feedback/LoadingState'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Select } from './ui/Select'

describe('base UI accessibility contracts', () => {
  it('keeps labels, descriptions and invalid state connected', () => {
    render(
      <Input
        error="Valor inválido"
        hint="Use apenas números"
        label="Valor"
      />,
    )
    const input = screen.getByRole('textbox', { name: 'Valor' })
    expect(input).toHaveAccessibleDescription('Use apenas números Valor inválido')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('supports keyboard focus and selection for the custom combobox', async () => {
    const user = userEvent.setup()
    render(
      <Select
        aria-label="Moeda"
        options={[
          { value: 'USD', code: 'USD', label: 'Dólar americano' },
          { value: 'EUR', code: 'EUR', label: 'Euro' },
        ]}
      />,
    )
    const select = screen.getByRole('combobox', { name: 'Moeda' })
    await user.tab()
    expect(select).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(select).toHaveValue('USD — Dólar americano')
  })

  it('announces feedback states with distinct semantics', () => {
    render(
      <>
        <LoadingState />
        <ErrorState message="Falha de conexão" />
        <EmptyState title="Sem resultados" />
        <Button loading>Salvar</Button>
      </>,
    )
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('Falha de conexão')
    expect(screen.getByRole('heading', { name: 'Sem resultados' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled()
  })
})
