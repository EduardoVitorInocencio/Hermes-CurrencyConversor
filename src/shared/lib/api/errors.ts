import axios from 'axios'

export type ApiErrorKind = 'cancelled' | 'http' | 'network' | 'timeout' | 'validation' | 'unknown'

export class ApiError extends Error {
  readonly kind: ApiErrorKind
  readonly status?: number
  readonly retryable: boolean

  constructor(message: string, options: { kind: ApiErrorKind; status?: number; retryable?: boolean }) {
    super(message)
    this.name = 'ApiError'
    this.kind = options.kind
    this.status = options.status
    this.retryable = options.retryable ?? false
  }
}

export function normalizeApiError(error: unknown): ApiError {
  if (axios.isCancel(error) || (error instanceof DOMException && error.name === 'AbortError')) {
    return new ApiError('Requisição cancelada.', { kind: 'cancelled' })
  }
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return new ApiError('A consulta excedeu o tempo limite.', { kind: 'timeout', retryable: true })
    }
    if (!error.response) {
      return new ApiError('Não foi possível conectar à fonte de dados.', { kind: 'network', retryable: true })
    }
    const status = error.response.status
    const message = typeof error.response.data?.message === 'string'
      ? error.response.data.message
      : 'A fonte de dados não aceitou a consulta.'
    return new ApiError(message, {
      kind: status >= 500 ? 'network' : 'http',
      status,
      retryable: status >= 500 || status === 408,
    })
  }
  return new ApiError('Ocorreu um erro inesperado.', { kind: 'unknown' })
}
