export function calculatePercentageChange(first: number | null | undefined, last: number | null | undefined): number | null {
  if (first == null || last == null || !Number.isFinite(first) || !Number.isFinite(last) || first <= 0) return null
  return ((last - first) / first) * 100
}
