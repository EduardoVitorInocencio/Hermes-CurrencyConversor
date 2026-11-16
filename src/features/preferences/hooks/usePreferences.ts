import { useEffect, useState } from 'react'
import type { AppLocale } from '@/shared/lib/format/number'

export type ThemePreference = 'dark'
const localeKey = 'hermes.locale'
const themeKey = 'hermes.theme'

function readStorage(key: string, fallback: string) {
  try { return localStorage.getItem(key) ?? fallback } catch { return fallback }
}

export function usePreferences() {
  const [locale, setLocale] = useState<AppLocale>(() => {
    const value = readStorage(localeKey, 'pt-BR')
    return value === 'en-US' || value === 'es-ES' ? value : 'pt-BR'
  })
  const [theme] = useState<ThemePreference>(() => readStorage(themeKey, 'dark') === 'dark' ? 'dark' : 'dark')
  useEffect(() => {
    document.documentElement.lang = locale
    try { localStorage.setItem(localeKey, locale) } catch { /* storage is optional */ }
  }, [locale])
  return { locale, setLocale, theme }
}
