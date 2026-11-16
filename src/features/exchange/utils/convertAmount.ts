export function convertAmount(amount: number, rate: number): number {
  if (!Number.isFinite(amount) || amount < 0) throw new Error('Valor de origem inválido.')
  if (!Number.isFinite(rate) || rate < 0) throw new Error('Taxa inválida.')
  const result = amount * rate
  if (!Number.isFinite(result)) throw new Error('Resultado fora do limite numérico.')
  return result
}
