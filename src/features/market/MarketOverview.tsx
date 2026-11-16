import { useState } from 'react'
import { Star } from '@phosphor-icons/react'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import { EmptyState, LoadingState } from '@/shared/components/feedback'
import { formatDate } from '@/shared/lib/format/date'
import { formatRate, type AppLocale } from '@/shared/lib/format/number'
import { useFavorites, type FavoritePair } from '@/features/favorites/hooks/useFavorites'
import { useExchangeRate } from '@/features/exchange/hooks/useExchangeRate'
import { ApiStatus, type ApiStatusValue } from '@/features/preferences/components/ApiStatus'
import './market.css'

const marketPairs: FavoritePair[] = [{ base: 'EUR', quote: 'USD' }, { base: 'USD', quote: 'BRL' }, { base: 'GBP', quote: 'USD' }, { base: 'EUR', quote: 'BRL' }]

function MarketPairCard({ pair, favorite, onOpen, onToggle }: { pair: FavoritePair; favorite: boolean; onOpen: () => void; onToggle: () => void }) {
  const rate = useExchangeRate(pair.base, pair.quote)
  const locale: AppLocale = 'pt-BR'
  const status: ApiStatusValue = rate.loading ? 'unknown' : rate.error && !rate.data ? 'error' : rate.stale ? 'stale' : 'connected'
  return <Card as="article" className="market-card"><div className="market-card__topline"><span>{pair.base} / {pair.quote}</span><Button aria-label={favorite ? 'Remover favorito' : 'Salvar favorito'} icon={<Star size={18} weight={favorite ? 'fill' : 'regular'} />} onClick={onToggle} size="sm" variant="quiet" /></div>{rate.loading && !rate.data ? <LoadingState message="Consultando" /> : rate.data ? <><p className="market-card__rate">{formatRate(rate.data.rate, locale)}</p><p className="market-card__meta">{formatDate(rate.data.date, locale)} · referência</p></> : <p className="market-card__meta">Cotação indisponível para este par.</p>}<div className="market-card__bottom"><ApiStatus value={status} /><Button onClick={onOpen} size="sm" variant="quiet">Abrir no conversor</Button></div></Card>
}

export function MarketOverview({ onOpenPair }: { onOpenPair: (pair: FavoritePair) => void }) {
  const { pairs, storageStatus, toggle } = useFavorites()
  const [showFavorites, setShowFavorites] = useState(false)
  const visiblePairs = showFavorites ? marketPairs.filter((pair) => pairs.some((item) => item.base === pair.base && item.quote === pair.quote)) : marketPairs
  return <div className="market-feature"><div className="market-feature__header"><div><h2>Visão de mercado</h2><p>Taxas de referência observadas na fonte oficial.</p></div><Button onClick={() => setShowFavorites((value) => !value)} variant="secondary">{showFavorites ? 'Todos os pares' : 'Favoritos'}</Button></div>{storageStatus === 'blocked' ? <p className="market-feature__notice">O armazenamento local está bloqueado; favoritos ficam apenas nesta sessão.</p> : null}{visiblePairs.length ? <div className="market-grid">{visiblePairs.map((pair) => <MarketPairCard favorite={pairs.some((item) => item.base === pair.base && item.quote === pair.quote)} key={`${pair.base}-${pair.quote}`} onOpen={() => onOpenPair(pair)} onToggle={() => toggle(pair)} pair={pair} />)}</div> : <EmptyState description="Salve um par para vê-lo nesta lista." title="Nenhum favorito" />}</div>
}
