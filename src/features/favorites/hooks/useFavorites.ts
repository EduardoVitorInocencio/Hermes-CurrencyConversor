import { useCallback, useState } from 'react'

export interface FavoritePair { base: string; quote: string }
type StorageStatus = 'available' | 'blocked'
const storageKey = 'hermes.favorite-pairs'

function readFavorites(): { pairs: FavoritePair[]; status: StorageStatus } {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return { pairs: [], status: 'available' }
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return { pairs: [], status: 'available' }
    const pairs = parsed.filter((item): item is FavoritePair => Boolean(item && typeof item === 'object' && typeof item.base === 'string' && typeof item.quote === 'string'))
    return { pairs, status: 'available' }
  } catch { return { pairs: [], status: 'blocked' } }
}

export function useFavorites() {
  const [initial] = useState(readFavorites)
  const [pairs, setPairs] = useState(initial.pairs)
  const [storageStatus, setStorageStatus] = useState<StorageStatus>(initial.status)
  const persist = useCallback((next: FavoritePair[]) => {
    setPairs(next)
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setStorageStatus('available') } catch { setStorageStatus('blocked') }
  }, [])
  const toggle = useCallback((pair: FavoritePair) => {
    const exists = pairs.some((item) => item.base === pair.base && item.quote === pair.quote)
    persist(exists ? pairs.filter((item) => item.base !== pair.base || item.quote !== pair.quote) : [...pairs, pair])
  }, [pairs, persist])
  return { pairs, storageStatus, toggle }
}
