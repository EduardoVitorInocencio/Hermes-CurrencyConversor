import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { LoadingState } from './LoadingState'
import { Skeleton } from './Skeleton'

describe('feedback states', () => {
  it('announces loading and exposes a non-content skeleton', () => {
    render(
      <>
        <LoadingState message="Consultando moedas" />
        <Skeleton variant="short" />
      </>,
    )
    expect(screen.getByRole('status', { name: 'Consultando moedas' })).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('presentation', { name: 'Carregando conteúdo' })).toBeInTheDocument()
  })

  it('offers retry only when a real action is provided', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<ErrorState message="A conexão falhou." onRetry={onRetry} />)
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('keeps empty state distinct from an error state', () => {
    render(<EmptyState title="Nenhum registro" description="Ajuste os filtros para continuar." />)
    expect(screen.getByRole('heading', { name: 'Nenhum registro' })).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
