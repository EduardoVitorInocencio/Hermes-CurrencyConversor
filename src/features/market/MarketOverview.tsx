import { useMemo } from 'react'
import { Card } from '@/shared/components/ui/Card'
import { formatRateFixed, type AppLocale } from '@/shared/lib/format/number'
import { useExchangeRate } from '@/features/exchange/hooks/useExchangeRate'
import { useRateHistory } from '@/features/history/hooks/useRateHistory'
import { getPeriodRange } from '@/features/history/utils/getPeriodRange'
import { calculatePercentageChange } from '@/features/history/utils/calculatePercentageChange'
import type { FavoritePair } from '@/features/favorites/hooks/useFavorites'
import miniChartEurUsd from '@/assets/figma/converter/mini-chart-eur-usd.svg'
import miniChartUsdBrl from '@/assets/figma/converter/mini-chart-usd-brl.svg'
import './market.css'

interface MarketPair extends FavoritePair {
  currencies: string
  chart: string
}

const marketPairs: MarketPair[] = [
  { base: 'EUR', quote: 'USD', currencies: 'Euro · Dólar americano', chart: miniChartEurUsd },
  { base: 'USD', quote: 'BRL', currencies: 'Dólar americano · Real', chart: miniChartUsdBrl },
  { base: 'GBP', quote: 'USD', currencies: 'Libra · Dólar americano', chart: miniChartEurUsd },
  { base: 'EUR', quote: 'BRL', currencies: 'Euro · Real', chart: miniChartEurUsd },
]

function MarketPairCard({ onOpen, pair }: { onOpen: () => void; pair: MarketPair }) {
  const locale: AppLocale = 'pt-BR'
  const rate = useExchangeRate(pair.base, pair.quote)
  const range = useMemo(() => getPeriodRange('30D'), [])
  const history = useRateHistory(pair.base, pair.quote, range.from, range.to, Boolean(rate.data))
  const records = history.data ?? []
  const change = calculatePercentageChange(records[0]?.rate ?? null, records.at(-1)?.rate ?? null)
  const changeLabel = change === null ? '—' : `${change >= 0 ? '+' : '−'}${Math.abs(change).toFixed(2).replace('.', ',')}%`
  const changeClass = change !== null && change < 0 ? 'is-negative' : undefined
  return (
    <Card as="article" className="market-card">
      <button aria-label={`Abrir ${pair.base} / ${pair.quote} no conversor`} className="market-card__hitarea" onClick={onOpen} type="button">
        <span className="market-card__pair">{pair.base} / {pair.quote}</span>
        <span className="market-card__currencies">{pair.currencies}</span>
        <span className="market-card__rate">{rate.data ? formatRateFixed(rate.data.rate, locale) : '—'}</span>
        <span className={['market-card__change', changeClass].filter(Boolean).join(' ')}>{changeLabel}</span>
        <img alt="" className="market-card__chart" src={pair.chart} />
      </button>
    </Card>
  )
}

export function MarketOverview({ onOpenPair }: { onOpenPair: (pair: FavoritePair) => void }) {
  return <div className="market-feature"><div className="market-grid">{marketPairs.map((pair) => <MarketPairCard key={`${pair.base}-${pair.quote}`} onOpen={() => onOpenPair(pair)} pair={pair} />)}</div></div>
}
