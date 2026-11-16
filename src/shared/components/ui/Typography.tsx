import type { HTMLAttributes, ReactNode } from 'react'
import './Typography.css'

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body-lg'
  | 'body-md'
  | 'caption-sm'

export type TypographyElement = 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: TypographyElement
  children: ReactNode
}

const defaultElements: Record<TypographyVariant, TypographyElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  'body-lg': 'p',
  'body-md': 'p',
  'caption-sm': 'span',
}

export function Typography({
  as,
  children,
  className,
  variant = 'body-md',
  ...typographyProps
}: TypographyProps) {
  const Component = as ?? defaultElements[variant]
  return (
    <Component
      {...typographyProps}
      className={[
        'hermes-typography',
        `hermes-typography--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Component>
  )
}
