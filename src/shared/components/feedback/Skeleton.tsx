import './Feedback.css'

export type SkeletonVariant = 'default' | 'short' | 'tall'

export interface SkeletonProps {
  variant?: SkeletonVariant
  className?: string
  label?: string
}

export function Skeleton({
  className,
  label = 'Carregando conteúdo',
  variant = 'default',
}: SkeletonProps) {
  return (
    <span
      aria-label={label}
      className={['hermes-skeleton', `hermes-skeleton--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      role="presentation"
    />
  )
}
