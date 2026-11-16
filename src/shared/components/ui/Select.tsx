import {
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
  code?: string
  disabled?: boolean
}
export interface SelectProps {
  id?: string
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  className?: string
  'aria-label'?: string
}

function getOptionText(option: SelectOption) {
  return option.code ? `${option.code} — ${option.label}` : option.label
}

export function Select({
  'aria-label': ariaLabel,
  className,
  defaultValue = '',
  disabled = false,
  error,
  hint,
  id: providedId,
  label,
  loading = false,
  onValueChange,
  options,
  placeholder = 'Selecione uma opção',
  value,
}: SelectProps) {
  const generatedId = useId().replaceAll(':', '')
  const id = providedId ?? `hermes-select-${generatedId}`
  const listboxId = `${id}-listbox`
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const selectedValue = value ?? internalValue
  const selectedOption = options.find((option) => option.value === selectedValue)
  const enabledOptions = useMemo(
    () => options.filter((option) => !option.disabled),
    [options],
  )
  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) return enabledOptions
    return enabledOptions.filter((option) =>
      `${option.value} ${option.code ?? ''} ${option.label}`
        .toLocaleLowerCase()
        .includes(normalizedQuery),
    )
  }, [enabledOptions, query])
  const activeOption = filteredOptions[highlightedIndex]
  const describedBy = [hint ? hintId : undefined, error ? errorId : undefined]
    .filter(Boolean)
    .join(' ')

  function openSelect() {
    if (disabled || loading) return
    setIsOpen(true)
    setQuery('')
    setHighlightedIndex(0)
  }

  function selectOption(option: SelectOption) {
    if (option.disabled) return
    setInternalValue(option.value)
    onValueChange?.(option.value)
    setQuery('')
    setIsOpen(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!isOpen) {
        openSelect()
        return
      }
      setHighlightedIndex((index) =>
        filteredOptions.length ? (index + 1) % filteredOptions.length : 0,
      )
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!isOpen) {
        openSelect()
        return
      }
      setHighlightedIndex((index) =>
        filteredOptions.length
          ? (index - 1 + filteredOptions.length) % filteredOptions.length
          : 0,
      )
    }
    if (event.key === 'Enter' && isOpen && activeOption) {
      event.preventDefault()
      selectOption(activeOption)
    }
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      setQuery('')
      setIsOpen(false)
    }
  }

  return (
    <div className={['hermes-field', 'hermes-select', className].filter(Boolean).join(' ')}>
      {label ? (
        <label className="hermes-field__label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div className="hermes-field__control">
        <input
          aria-activedescendant={isOpen && activeOption ? `${id}-option-${activeOption.value}` : undefined}
          aria-autocomplete="list"
          aria-busy={loading || undefined}
          aria-controls={listboxId}
          aria-describedby={describedBy || undefined}
          aria-expanded={isOpen}
          aria-invalid={Boolean(error) || undefined}
          aria-label={ariaLabel}
          className="hermes-input hermes-select__input"
          disabled={disabled || loading}
          id={id}
          onChange={(event) => {
            setQuery(event.target.value)
            setIsOpen(true)
            setHighlightedIndex(0)
          }}
          onFocus={openSelect}
          onKeyDown={handleKeyDown}
          placeholder={selectedOption ? getOptionText(selectedOption) : placeholder}
          role="combobox"
          value={isOpen ? query : selectedOption ? getOptionText(selectedOption) : ''}
        />
        {loading ? <span className="hermes-field__spinner" aria-hidden="true" /> : null}
      </div>
      {isOpen ? (
        <div className="hermes-select__menu" id={listboxId} role="listbox">
          {filteredOptions.length ? (
            filteredOptions.map((option, index) => (
              <div
                aria-selected={option.value === selectedValue}
                className={[
                  'hermes-select__option',
                  index === highlightedIndex ? 'is-highlighted' : undefined,
                ]
                  .filter(Boolean)
                  .join(' ')}
                id={`${id}-option-${option.value}`}
                key={option.value}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectOption(option)}
                role="option"
              >
                <span>{getOptionText(option)}</span>
                {option.value === selectedValue ? (
                  <span className="hermes-select__selected" aria-hidden="true">✓</span>
                ) : null}
              </div>
            ))
          ) : (
            <p className="hermes-select__empty">Nenhuma opção encontrada.</p>
          )}
        </div>
      ) : null}
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

