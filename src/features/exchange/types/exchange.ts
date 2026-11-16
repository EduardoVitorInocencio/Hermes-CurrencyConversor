export interface ExchangeRateDTO {
  date: unknown
  base: unknown
  quote: unknown
  rate: unknown
}

export interface ExchangeRate {
  date: string | null
  base: string
  quote: string
  rate: number
}
