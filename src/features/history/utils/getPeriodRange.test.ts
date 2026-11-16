import { describe, expect, it } from 'vitest'
import { getPeriodRange } from './getPeriodRange'

describe('getPeriodRange', () => {
  it('uses inclusive civil days', () => {
    expect(getPeriodRange('7D', '2024-03-10')).toEqual({ from: '2024-03-04', to: '2024-03-10' })
  })

  it('clamps calendar subtraction at month ends and leap years', () => {
    expect(getPeriodRange('1A', '2024-02-29')).toEqual({ from: '2023-02-28', to: '2024-02-29' })
    expect(getPeriodRange('3M', '2024-05-31')).toEqual({ from: '2024-02-29', to: '2024-05-31' })
  })
})
