import { ArrowDown, ArrowUp } from '@/shared/components/iconography'
import { Button } from '@/shared/components/ui/Button'
import type { HistorySortField, SortDirection } from '../types/history'

export function SortButton({ field, direction, onChange, label }: { field: HistorySortField; direction: SortDirection; onChange: (field: HistorySortField) => void; label: string }) {
  const Icon = direction === 'asc' ? ArrowUp : ArrowDown
  return <Button aria-label={`Ordenar por ${label}`} icon={<Icon size={16} />} onClick={() => onChange(field)} size="sm" variant="quiet">{label}</Button>
}
