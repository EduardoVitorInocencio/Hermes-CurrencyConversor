import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '@/App'

describe('application smoke test', () => {
  it('renders the application shell heading', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Moedas e câmbio' })).toBeInTheDocument()
  })
})
