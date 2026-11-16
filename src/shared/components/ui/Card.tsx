import type { HTMLAttributes, ReactNode } from 'react'
import './Card.css'

export type CardVariant = 'surface' | 'raised' | 'status'
export type CardElement = 'article' | 'div' | 'section'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: CardElement
  variant?: CardVariant
  children?: ReactNode
}

export function Card({
  as = 'section',
  children,
  className,
  variant = 'surface',
  ...cardProps
}: CardProps) {
  const Component = as
  return (
    <Component
      {...cardProps}
      className={['hermes-card', `hermes-card--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      data-variant={variant}
    >
      {children}
    </Component>
  )
}
