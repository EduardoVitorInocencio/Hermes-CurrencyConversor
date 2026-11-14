import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.hermes.test/health', () => {
    return HttpResponse.json({ status: 'ok' })
  }),
]
