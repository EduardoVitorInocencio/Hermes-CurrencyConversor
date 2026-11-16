import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { HistoryRecord } from '../types/history'
import { formatRate, type AppLocale } from '@/shared/lib/format/number'
import './history.css'

export function ExchangeRateChart({ records }: { records: HistoryRecord[] }) {
  const locale: AppLocale = 'pt-BR'
  const data = records.map((record) => ({ ...record, label: record.date.slice(5) }))
  return (
    <div aria-label="Gráfico da evolução da cotação" className="history-chart" role="img">
      {data.length ? (
        <ResponsiveContainer height={260} width="100%">
          <LineChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="var(--color-border-default)" strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke="var(--color-text-subtle)" />
            <YAxis domain={['auto', 'auto']} stroke="var(--color-text-subtle)" />
            <Tooltip formatter={(value) => formatRate(Number(value), locale)} />
            <Line dataKey="rate" dot={false} stroke="var(--color-status-positive)" strokeWidth={2} type="monotone" />
          </LineChart>
        </ResponsiveContainer>
      ) : <p className="history-chart__empty">Sem pontos para exibir no gráfico.</p>}
    </div>
  )
}
