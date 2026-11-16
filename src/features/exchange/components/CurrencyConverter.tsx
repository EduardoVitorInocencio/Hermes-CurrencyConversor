import type { Dispatch } from 'react'
import { Card } from '@/shared/components/ui/Card'
import { Button } from '@/shared/components/ui/Button'
import { ArrowsLeftRight } from '@/shared/components/iconography'
import { useCurrencies } from '@/features/currencies/hooks/useCurrencies'
import { useExchangeRate } from '../hooks/useExchangeRate'
import { convertAmount } from '../utils/convertAmount'
import { parseLocalizedNumber, formatRateFixed, type AppLocale } from '@/shared/lib/format/number'
import type { ExchangeViewAction, ExchangeViewState } from '@/shared/types/view'
import './CurrencyConverter.css'

export interface CurrencyConverterProps {
  viewState: ExchangeViewState
  dispatch: Dispatch<ExchangeViewAction>
}

const locale: AppLocale = 'pt-BR'

function formatAmount(value: number) {
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
}

function formatReferenceDate(value: string) {
  if (!value) return '—'
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(date)
}

function CurrencyAmountControl({ amount, currency, currencies, id, onAmountChange, onCurrencyChange, readOnly = false }: { amount: string; currency: string; currencies: Array<{ value: string; code: string; label: string }>; id: string; onAmountChange?: (value: string) => void; onCurrencyChange: (value: string) => void; readOnly?: boolean }) {
  return (
    <div className="converter-card__amount-control">
      {readOnly ? (
        <output aria-label="Valor convertido" className="converter-card__amount-output" htmlFor={id}>{amount}</output>
      ) : (
        <input aria-label="Valor de origem" id={id} inputMode="decimal" onChange={(event) => onAmountChange?.(event.target.value)} value={amount} />
      )}
      <span className="converter-card__control-divider" />
      <select aria-label={`Moeda ${readOnly ? 'de destino' : 'de origem'}`} onChange={(event) => onCurrencyChange(event.target.value)} value={currency}>
        {currencies.map((option) => <option key={option.value} value={option.value}>{option.code}</option>)}
      </select>
    </div>
  )
}

export function CurrencyConverter({ dispatch, viewState }: CurrencyConverterProps) {
  const currencies = useCurrencies()
  const rate = useExchangeRate(viewState.pair.base, viewState.pair.quote)
  const parsedAmount = parseLocalizedNumber(viewState.amount, locale)
  const convertedAmount = parsedAmount !== null && rate.data ? convertAmount(parsedAmount, rate.data.rate) : null

  const options = currencies.data ?? []

  return (
    <Card as="section" className="converter-card" variant="surface" aria-labelledby="converter-card-title">
      <div className="converter-card__header">
        <h2 id="converter-card-title">Converter moedas</h2>
        <div className="converter-card__header-actions"><span>Cotação de referência · {formatReferenceDate(rate.data?.date ?? '')}</span><Button className="converter-card__saved" size="sm" variant="primary">Par salvo</Button></div>
      </div>
      <div className="converter-card__divider" />
      <div className="converter-card__fields">
        <label htmlFor="converter-source-amount">VALOR DE ORIGEM</label>
        <label htmlFor="converter-target-amount">VALOR CONVERTIDO</label>
        <CurrencyAmountControl amount={viewState.amount} currencies={options} currency={viewState.pair.base} id="converter-source-amount" onAmountChange={(amount) => dispatch({ type: 'setAmount', value: amount })} onCurrencyChange={(base) => dispatch({ type: 'setBase', value: base })} />
        <Button aria-label="Inverter moedas" className="converter-card__swap" icon={<ArrowsLeftRight size={24} weight="bold" />} onClick={() => dispatch({ type: 'swap' })} variant="primary" />
        <CurrencyAmountControl amount={convertedAmount === null ? '—' : formatAmount(convertedAmount)} currencies={options} currency={viewState.pair.quote} id="converter-target-amount" onCurrencyChange={(quote) => dispatch({ type: 'setQuote', value: quote })} readOnly />
      </div>
      <div className="converter-card__divider converter-card__divider--footer" />
      <div className="converter-card__footer"><strong>{rate.data ? `1 ${rate.data.base} = ${formatRateFixed(rate.data.rate, locale)} ${rate.data.quote}` : '1 — = —'}</strong><span>Sem tarifas ou margens cambiais</span></div>
    </Card>
  )
}
