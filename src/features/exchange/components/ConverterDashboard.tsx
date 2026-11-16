import type { Dispatch } from 'react'
import { MarketOverview } from '@/features/market/MarketOverview'
import { HistoryPage } from '@/features/history/components/HistoryPage'
import type { ExchangeViewAction, ExchangeViewState } from '@/shared/types/view'
import { CurrencyConverter } from './CurrencyConverter'
import './converter-dashboard.css'

export function ConverterDashboard({ dispatch, onOpenPair, viewState }: { dispatch: Dispatch<ExchangeViewAction>; onOpenPair: (pair: { base: string; quote: string }) => void; viewState: ExchangeViewState }) {
  return (
    <div className="converter-dashboard">
      <MarketOverview onOpenPair={onOpenPair} />
      <CurrencyConverter dispatch={dispatch} viewState={viewState} />
      <HistoryPage dispatch={dispatch} viewState={viewState} />
    </div>
  )
}
