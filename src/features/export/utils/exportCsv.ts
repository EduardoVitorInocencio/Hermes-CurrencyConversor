import type { HistoryRecord } from '@/features/history/types/history'

export interface CsvContext { filename?: string }

function safeCell(value: string | number) {
  const text = String(value)
  const safe = /^[=+\-@]/.test(text) ? `'${text}` : text
  return `"${safe.replaceAll('"', '""')}"`
}

export function exportCsv(records: HistoryRecord[], context: CsvContext = {}) {
  void context.filename
  if (!records.length) return null
  const header = ['data', 'moeda_origem', 'moeda_destino', 'cotacao']
  const rows = records.map((record) => [record.date, record.base, record.quote, record.rate])
  return `\uFEFF${[header, ...rows].map((row) => row.map((cell) => safeCell(cell)).join(',')).join('\r\n')}\r\n`
}

export function downloadCsv(records: HistoryRecord[], filename: string) {
  const csv = exportCsv(records, { filename })
  if (!csv) return false
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
  return true
}
