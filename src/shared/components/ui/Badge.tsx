import type { HTMLAttributes, ReactNode } from 'react'
import './Badge.css'

export type BadgeVariant = 'neutral' | 'positive' | 'negative' | 'info'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

export function Badge({
  children,
  className,
  variant = 'neutral',
  ...badgeProps
}: BadgeProps) {
  return (
    <span
      {...badgeProps}
      className={['hermes-badge', `hermes-badge--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      data-status={variant}
    >
      <span className="hermes-badge__marker" aria-hidden="true" />
      <span className="hermes-badge__label">{children}</span>
    </span>
  )
}
