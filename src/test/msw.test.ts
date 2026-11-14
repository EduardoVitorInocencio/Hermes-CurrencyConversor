import { describe, expect, it } from 'vitest'

describe('MSW test server', () => {
  it('intercepts the example health request without real network access', async () => {
    const response = await fetch('https://api.hermes.test/health')

    expect(response.ok).toBe(true)
    await expect(response.json()).resolves.toEqual({ status: 'ok' })
  })
})
