import { ArrowsLeftRight, Star } from '@/shared/components/iconography'
import type { Dispatch } from 'react'
import { CurrencyAmountField } from './CurrencyAmountField'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import { Typography } from '@/shared/components/ui/Typography'
import { LoadingState, ErrorState } from '@/shared/components/feedback'
import { useCurrencies } from '@/features/currencies/hooks/useCurrencies'
import { useExchangeRate } from '../hooks/useExchangeRate'
import { convertAmount } from '../utils/convertAmount'
import { parseLocalizedNumber, formatCurrency, formatRate, type AppLocale } from '@/shared/lib/format/number'
import { formatDate } from '@/shared/lib/format/date'
import type { ExchangeViewAction, ExchangeViewState } from '@/shared/types/view'
import './CurrencyConverter.css'

export interface CurrencyConverterProps {
  viewState: ExchangeViewState
  dispatch: Dispatch<ExchangeViewAction>
}

const locale: AppLocale = 'pt-BR'

export function CurrencyConverter({ dispatch, viewState }: CurrencyConverterProps) {
  const currencies = useCurrencies()
  const rate = useExchangeRate(viewState.pair.base, viewState.pair.quote, Boolean(currencies.data))
  const parsedAmount = parseLocalizedNumber(viewState.amount, locale)
  const convertedAmount = parsedAmount !== null && rate.data
    ? convertAmount(parsedAmount, rate.data.rate)
    : null

  if (currencies.loading && !currencies.data) return <LoadingState message="Carregando catálogo de moedas" />
  if (currencies.error && !currencies.data) {
    return <ErrorState message="Não foi possível carregar o catálogo de moedas." onRetry={currencies.retry} />
  }
  const options = currencies.data ?? []

  return (
    <div className="converter-feature">
      <Card as="section" variant="raised" aria-labelledby="converter-card-title">
        <div className="converter-feature__card-heading"><div><p className="converter-feature__overline">CONVERSOR</p><Typography variant="h2" id="converter-card-title">Converter moedas</Typography><p className="converter-feature__intro">Calcule valores com a taxa de referência mais recente.</p></div><Button aria-label="Salvar par atual" icon={<Star size={18} />} size="sm" variant="quiet">Par salvo</Button></div>
        <div className="converter-feature__field-row">
          <CurrencyAmountField
            amount={viewState.amount}
            currencies={options}
            currency={viewState.pair.base}
            id="converter-source"
            label="Moeda de origem"
            onAmountChange={(amount) => dispatch({ type: 'setAmount', value: amount })}
            onCurrencyChange={(base) => dispatch({ type: 'setBase', value: base })}
          />
          <Button
            aria-label="Inverter moedas"
            className="converter-feature__swap"
            icon={<ArrowsLeftRight size={20} weight="bold" />}
            onClick={() => dispatch({ type: 'swap' })}
            variant="secondary"
          />
          <CurrencyAmountField
            amount={convertedAmount === null ? '' : String(convertedAmount)}
            currencies={options}
            currency={viewState.pair.quote}
            id="converter-target"
            label="Moeda de destino"
            onCurrencyChange={(quote) => dispatch({ type: 'setQuote', value: quote })}
            readOnly
          />
        </div>
      </Card>

      {rate.loading && !rate.data ? <LoadingState message="Consultando cotação" /> : null}
      {rate.error && !rate.data ? <ErrorState message="Não foi possível consultar a cotação deste par." onRetry={rate.retry} /> : null}
      {rate.data ? (
        <Card as="section" aria-labelledby="converter-rate-title">
          <div className="converter-feature__result-row"><div><p className="converter-feature__label" id="converter-rate-title">RESULTADO DA CONVERSÃO</p><p className="converter-feature__result">{convertedAmount === null ? 'Informe um valor para calcular.' : formatCurrency(convertedAmount, viewState.pair.quote, locale)}</p></div><span className="converter-feature__date">Referência: {formatDate(rate.data.date, locale)}</span></div>
          <div className="converter-feature__rate-line"><span>1 {rate.data.base} = <strong>{formatRate(rate.data.rate, locale)} {rate.data.quote}</strong></span><span>Frankfurter · ECB</span></div>
        </Card>
      ) : null}
    </div>
  )
}
