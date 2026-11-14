import type { PropsWithChildren } from 'react'

/**
 * Stable composition point for application-wide providers.
 * Feature-specific providers will be introduced with their owning features.
 */
export function AppProviders({ children }: PropsWithChildren) {
  return <>{children}</>
}
