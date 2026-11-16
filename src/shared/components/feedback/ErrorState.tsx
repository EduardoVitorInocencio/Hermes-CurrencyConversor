import type { ReactNode } from 'react'
import { Button } from '@/shared/components/ui/Button'
import './Feedback.css'

export interface ErrorStateProps {
  title?: ReactNode
  message: ReactNode
  onRetry?: () => void
  retryLabel?: string
  retryDisabled?: boolean
  className?: string
}

export function ErrorState({
  className,
  message,
  onRetry,
  retryDisabled = false,
  retryLabel = 'Tentar novamente',
  title = 'Não foi possível concluir a solicitação',
}: ErrorStateProps) {
  return (
    <section
      aria-labelledby="hermes-error-title"
      className={['hermes-feedback', 'hermes-feedback--error', className]
        .filter(Boolean)
        .join(' ')}
      role="alert"
    >
      <h2 className="hermes-feedback__title" id="hermes-error-title">
        {title}
      </h2>
      <p className="hermes-feedback__message">{message}</p>
      {onRetry ? (
        <Button disabled={retryDisabled} onClick={onRetry} variant="secondary">
          {retryLabel}
        </Button>
      ) : null}
    </section>
  )
}
