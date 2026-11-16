import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from './Badge'
import { Card } from './Card'
import { Typography } from './Typography'

describe('Card, Badge and Typography', () => {
  it('renders card variants and a semantic heading hierarchy', () => {
    render(
      <Card as="article" variant="raised">
        <Typography variant="h2">Market overview</Typography>
      </Card>,
    )
    expect(screen.getByRole('article')).toHaveClass('hermes-card--raised')
    expect(screen.getByRole('heading', { level: 2, name: 'Market overview' })).toBeInTheDocument()
  })

  it('keeps status badges explicit beyond color alone', () => {
    render(<Badge variant="negative">Unavailable</Badge>)
    const badge = screen.getByText('Unavailable').parentElement
    expect(badge).toHaveAttribute('data-status', 'negative')
    expect(badge).toHaveTextContent('Unavailable')
  })
})
