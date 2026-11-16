import { DownloadSimple } from '@/shared/components/iconography'
import { Button, type ButtonVariant } from '@/shared/components/ui/Button'
import type { HistoryRecord } from '@/features/history/types/history'
import { downloadCsv } from '../utils/exportCsv'

export function ExportCsvButton({ records, filename = 'hermes-historico.csv', variant = 'secondary' }: { records: HistoryRecord[]; filename?: string; variant?: ButtonVariant }) {
  return (
    <Button disabled={!records.length} icon={<DownloadSimple size={18} />} onClick={() => downloadCsv(records, filename)} variant={variant}>
      Exportar CSV
    </Button>
  )
}
