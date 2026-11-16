import { useMemo, useState } from 'react'
import { Card } from '@/shared/components/ui/Card'
import { Input } from '@/shared/components/ui/Input'
import { Select } from '@/shared/components/ui/Select'
import { EmptyState, ErrorState, LoadingState } from '@/shared/components/feedback'
import { DownloadSimple } from '@/shared/components/iconography'
import { useRateHistory } from '@/features/history/hooks/useRateHistory'
import { getPeriodRange } from '@/features/history/utils/getPeriodRange'
import { HistoryTable } from '@/features/history/components/HistoryTable'
import { ExportCsvButton } from '@/features/export/components/ExportCsvButton'
import type { ExchangeViewState } from '@/shared/types/view'
import './report-builder.css'

const columns = ['Data', 'Moeda base', 'Moeda de destino', 'Cotação']

export function ReportBuilder({ viewState }: { viewState: ExchangeViewState }) {
  const range = useMemo(() => getPeriodRange(viewState.period), [viewState.period])
  const history = useRateHistory(viewState.pair.base, viewState.pair.quote, range.from, range.to)
  const [name, setName] = useState('Relatório de câmbio')
  const [frequency, setFrequency] = useState('Diária')
  const [selectedColumns, setSelectedColumns] = useState(columns)
  const records = history.data ?? []
  const toggleColumn = (column: string) => setSelectedColumns((current) => current.includes(column) ? current.filter((item) => item !== column) : [...current, column])
  if (history.loading && !history.data) return <LoadingState message="Preparando dados do relatório" />
  if (history.error && !history.data) return <ErrorState message="Não foi possível preparar o relatório." onRetry={history.retry} />
  return (
    <div className="report-builder">
      <Card className="report-source-banner"><div className="report-source-banner__mark">ECB</div><div><strong>Frankfurter · Banco Central Europeu (ECB)</strong><p>Taxas de referência para uso informativo. Consulte a documentação para conhecer a origem dos dados.</p></div><a href="https://frankfurter.dev/pt/" target="_blank" rel="noreferrer">Documentação ↗</a></Card>
      <div className="report-builder__grid"><div className="report-builder__form"><Card><p className="report-step">1. DEFINA OS DADOS</p><h2>Configuração do relatório</h2><div className="report-form-grid"><Input label="Nome do relatório" value={name} onChange={(event) => setName(event.target.value)} /><Select label="Moeda base" options={[{ value: viewState.pair.base, label: viewState.pair.base }]} value={viewState.pair.base} /><Input label="Data inicial" type="date" value={range.from} readOnly /><Input label="Data final" type="date" value={range.to} readOnly /><Select label="Frequência" options={[{ value: 'Diária', label: 'Diária' }, { value: 'Mensal', label: 'Mensal' }]} value={frequency} onValueChange={setFrequency} /><Input label="Fonte" value="Frankfurter / ECB" readOnly /></div><p className="report-step report-step--columns">2. ESCOLHA AS COLUNAS</p><div className="report-columns">{columns.map((column) => <button aria-pressed={selectedColumns.includes(column)} className={selectedColumns.includes(column) ? 'is-selected' : undefined} key={column} onClick={() => toggleColumn(column)} type="button">{selectedColumns.includes(column) ? '✓ ' : '+ '}{column}</button>)}</div></Card></div><Card className="report-export"><p className="report-step">3. EXPORTE O RELATÓRIO</p><h2>Pronto para exportar?</h2><div className="report-summary"><span>Nome</span><strong>{name || 'Relatório sem nome'}</strong><span>Período</span><strong>{range.from} — {range.to}</strong><span>Registros</span><strong>{records.length}</strong></div><div className="report-format"><span>Formato</span><button className="is-selected" type="button">CSV</button><button disabled type="button">Excel</button></div><div className="report-options"><span>Separador: ponto e vírgula</span><span>Decimal: vírgula</span><span>Arquivo: {name.trim().replaceAll(/\s+/g, '-').toLowerCase() || 'hermes-relatorio'}.csv</span></div><ExportCsvButton filename={`${name.trim().replaceAll(/\s+/g, '-').toLowerCase() || 'hermes-relatorio'}.csv`} records={records} /></Card></div>
      <Card><div className="report-preview-heading"><div><p className="report-step">PRÉ-VISUALIZAÇÃO</p><h2>Dados que serão exportados</h2></div><span>{selectedColumns.length} colunas selecionadas</span></div>{records.length ? <HistoryTable records={records.slice(-10).reverse()} /> : <EmptyState description="A API não devolveu registros para o período selecionado." title="Pré-visualização vazia" />}</Card>
      <p className="report-footnote"><DownloadSimple aria-hidden="true" size={14} /> O arquivo exportado contém apenas dados reais retornados pela fonte; quando não houver resposta, a exportação permanece desabilitada.</p>
    </div>
  )
}
