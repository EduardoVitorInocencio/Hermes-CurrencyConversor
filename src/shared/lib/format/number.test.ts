import { describe, expect, it } from 'vitest'
import { formatRate, parseLocalizedNumber } from './number'

describe('localized number formatting', () => {
  it('parses PT-BR and keeps precise small rates visible', () => {
    expect(parseLocalizedNumber('1.234,56', 'pt-BR')).toBe(1234.56)
    expect(formatRate(0.001234, 'pt-BR')).toContain('0,001234')
  })
})
