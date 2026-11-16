import type { ReactNode } from 'react'
import './Feedback.css'

export interface EmptyStateProps {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({
  action,
  className,
  description,
  title,
}: EmptyStateProps) {
  return (
    <section
      aria-labelledby="hermes-empty-title"
      className={['hermes-feedback', 'hermes-feedback--empty', className]
        .filter(Boolean)
        .join(' ')}
    >
      <h2 className="hermes-feedback__title" id="hermes-empty-title">
        {title}
      </h2>
      {description ? <p className="hermes-feedback__message">{description}</p> : null}
      {action}
    </section>
  )
}
