import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Container } from './Container'

describe('Container', () => {
  it('provides a bounded responsive layout region', () => {
    render(<Container aria-label="content">Content</Container>)
    expect(screen.getByLabelText('content')).toHaveClass('hermes-container')
  })
})
