import type { HistoryRecord } from '../types/history'
import { formatDate } from '@/shared/lib/format/date'
import { formatRate, type AppLocale } from '@/shared/lib/format/number'
import './history.css'

export function HistoryTable({ records }: { records: HistoryRecord[] }) {
  const locale: AppLocale = 'pt-BR'
  return (
    <div className="history-table-wrap">
      <table className="history-table">
        <caption className="visually-hidden">Registros históricos da cotação</caption>
        <thead><tr><th scope="col">Data</th><th scope="col">Origem</th><th scope="col">Destino</th><th scope="col">Cotação</th></tr></thead>
        <tbody>
          {records.map((record) => (
            <tr key={`${record.date}-${record.base}-${record.quote}`}>
              <td>{formatDate(record.date, locale)}</td><td>{record.base}</td><td>{record.quote}</td><td className="tabular-nums">{formatRate(record.rate, locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
