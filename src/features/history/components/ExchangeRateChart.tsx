import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { HistoryRecord } from '../types/history'
import { formatRate, type AppLocale } from '@/shared/lib/format/number'
import './history.css'

export function ExchangeRateChart({ height = 260, records }: { height?: number; records: HistoryRecord[] }) {
  const locale: AppLocale = 'pt-BR'
  const data = records.map((record) => ({ ...record, label: new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' }).format(new Date(`${record.date}T00:00:00Z`)).replace('.', '').toUpperCase() }))
  return (
    <div aria-label="Gráfico da evolução da cotação" className="history-chart" role="img">
      {data.length ? (
        <ResponsiveContainer height={height} width="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
            <defs><linearGradient id="hermes-rate-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--color-status-positive)" stopOpacity={0.22} /><stop offset="100%" stopColor="var(--color-status-positive)" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid horizontal vertical={false} stroke="var(--color-border-default)" />
            <XAxis axisLine={false} dataKey="label" tick={{ fill: 'var(--color-text-subtle)', fontSize: 10 }} tickLine={false} />
            <YAxis axisLine={false} domain={['auto', 'auto']} tick={{ fill: 'var(--color-text-subtle)', fontSize: 10 }} tickLine={false} width={45} />
            <Tooltip formatter={(value) => formatRate(Number(value), locale)} />
            <Area dataKey="rate" dot={false} fill="url(#hermes-rate-area)" stroke="var(--color-status-positive)" strokeWidth={2.5} type="monotone" />
          </AreaChart>
        </ResponsiveContainer>
      ) : <p className="history-chart__empty">Sem pontos para exibir no gráfico.</p>}
    </div>
  )
}
