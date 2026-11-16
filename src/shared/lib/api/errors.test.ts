import { describe, expect, it } from 'vitest'
import { ApiError, normalizeApiError } from './errors'

describe('API errors', () => {
  it('keeps cancellation out of user error states', () => {
    const error = normalizeApiError(new DOMException('Aborted', 'AbortError'))
    expect(error).toBeInstanceOf(ApiError)
    expect(error.kind).toBe('cancelled')
  })
})
