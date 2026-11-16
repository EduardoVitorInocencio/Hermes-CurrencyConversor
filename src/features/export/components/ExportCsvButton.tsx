import { DownloadSimple } from '@/shared/components/iconography'
import { Button } from '@/shared/components/ui/Button'
import type { HistoryRecord } from '@/features/history/types/history'
import { downloadCsv } from '../utils/exportCsv'

export function ExportCsvButton({ records, filename = 'hermes-historico.csv' }: { records: HistoryRecord[]; filename?: string }) {
  return (
    <Button disabled={!records.length} icon={<DownloadSimple size={18} />} onClick={() => downloadCsv(records, filename)} variant="secondary">
      Exportar CSV
    </Button>
  )
}
