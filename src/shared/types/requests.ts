import type { ApiError } from '@/shared/lib/api/errors'

export interface RequestState<T> {
  data: T | null
  loading: boolean
  error: ApiError | Error | null
  stale: boolean
}
