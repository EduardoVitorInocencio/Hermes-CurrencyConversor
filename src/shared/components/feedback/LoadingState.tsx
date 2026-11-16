import type { ReactNode } from 'react'
import './Feedback.css'

export interface LoadingStateProps {
  message?: ReactNode
  className?: string
}

export function LoadingState({
  className,
  message = 'Carregando…',
}: LoadingStateProps) {
  return (
    <div
      aria-live="polite"
      aria-label={typeof message === 'string' ? message : 'Carregando'}
      aria-busy="true"
      className={['hermes-feedback', 'hermes-feedback--loading', className]
        .filter(Boolean)
        .join(' ')}
      role="status"
    >
      <div className="hermes-feedback__row">
        <span className="hermes-feedback__spinner" aria-hidden="true" />
        <p className="hermes-feedback__message">{message}</p>
      </div>
    </div>
  )
}
