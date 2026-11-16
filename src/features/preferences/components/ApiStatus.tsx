import { Badge, type BadgeVariant } from '@/shared/components/ui/Badge'

export type ApiStatusValue = 'unknown' | 'connected' | 'error' | 'stale'
const labels: Record<ApiStatusValue, { label: string; variant: BadgeVariant }> = {
  unknown: { label: 'API não consultada', variant: 'neutral' },
  connected: { label: 'API conectada', variant: 'positive' },
  error: { label: 'API indisponível', variant: 'negative' },
  stale: { label: 'Dados anteriores', variant: 'info' },
}

export function ApiStatus({ value }: { value: ApiStatusValue }) {
  const status = labels[value]
  return <Badge aria-label={status.label} variant={status.variant}>{status.label}</Badge>
}
