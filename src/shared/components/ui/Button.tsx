import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'quiet'
export type ButtonSize = 'md' | 'sm'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  loading?: boolean
}

export function Button({
  children,
  className,
  disabled = false,
  icon,
  loading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...buttonProps
}: ButtonProps) {
  const state = loading ? 'loading' : disabled ? 'disabled' : 'default'
  const classes = [
    'hermes-button',
    `hermes-button--${variant}`,
    `hermes-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      {...buttonProps}
      className={classes}
      data-state={state}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      type={type}
    >
      {loading ? (
        <span className="hermes-button__spinner" aria-hidden="true" />
      ) : icon ? (
        <span className="hermes-button__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="hermes-button__label">{children}</span>
    </button>
  )
}
