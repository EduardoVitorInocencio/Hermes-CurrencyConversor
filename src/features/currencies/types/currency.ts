export type SupportedCurrencyCode = 'EUR' | 'USD' | 'GBP' | 'BRL' | 'JPY'

export type CurrencyCode = string

export interface CurrencyDTO {
  iso_code: unknown
  name: unknown
  symbol?: unknown
}

export interface CurrencyOption {
  value: string
  code: string
  label: string
  symbol: string
}
