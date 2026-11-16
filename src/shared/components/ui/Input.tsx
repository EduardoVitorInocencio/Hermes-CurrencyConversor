import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import './Input.css'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  loading?: boolean
}

export function Input({
  'aria-describedby': ariaDescribedBy,
  className,
  disabled = false,
  error,
  hint,
  id: providedId,
  label,
  loading = false,
  ...inputProps
}: InputProps) {
  const generatedId = useId().replaceAll(':', '')
  const id = providedId ?? `hermes-input-${generatedId}`
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [
    ariaDescribedBy,
    hint ? hintId : undefined,
    error ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="hermes-field">
      {label ? (
        <label className="hermes-field__label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div className="hermes-field__control">
        <input
          {...inputProps}
          aria-busy={loading || undefined}
          aria-describedby={describedBy || undefined}
          aria-invalid={Boolean(error) || undefined}
          className={['hermes-input', className].filter(Boolean).join(' ')}
          disabled={disabled || loading}
          id={id}
        />
        {loading ? (
          <span className="hermes-field__spinner" aria-hidden="true" />
        ) : null}
      </div>
      {hint ? (
        <p className="hermes-field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="hermes-field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
