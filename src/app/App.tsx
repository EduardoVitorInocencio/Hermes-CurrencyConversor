import { useExchangeViewState } from '@/features/exchange/hooks/useExchangeViewState'
import { ConverterDashboard } from '@/features/exchange/components/ConverterDashboard'
import { HistoricalAnalysisPage } from '@/features/history/components/HistoricalAnalysisPage'
import { ReportBuilder } from '@/features/reports/ReportBuilder'
import { AppShell } from '@/shared/components/layout'

function App() {
  const [viewState, dispatch] = useExchangeViewState()
  return (
    <AppShell
      renderSection={(section, onNavigate) => {
        const onOpenPair = (pair: { base: string; quote: string }) => { dispatch({ type: 'setBase', value: pair.base }); dispatch({ type: 'setQuote', value: pair.quote }); onNavigate('converter') }
        if (section === 'converter') return <ConverterDashboard dispatch={dispatch} onOpenPair={onOpenPair} viewState={viewState} />
        if (section === 'history') return <HistoricalAnalysisPage dispatch={dispatch} viewState={viewState} />
        return <ReportBuilder viewState={viewState} />
      }}
    />
  )
}

export default App
