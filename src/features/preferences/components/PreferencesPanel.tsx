import { Select } from '@/shared/components/ui/Select'
import type { AppLocale } from '@/shared/lib/format/number'
import type { ThemePreference } from '../hooks/usePreferences'

const localeOptions = [
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en-US', label: 'English (United States)' },
  { value: 'es-ES', label: 'Español (España)' },
]

export function PreferencesPanel({ locale, setLocale, theme }: { locale: AppLocale; setLocale: (locale: AppLocale) => void; theme: ThemePreference }) {
  return <section aria-labelledby="preferences-title" className="preferences-panel"><h3 id="preferences-title">Preferências</h3><Select label="Idioma" options={localeOptions} value={locale} onValueChange={(value) => setLocale(value as AppLocale)} /><p>Tema: <strong>{theme === 'dark' ? 'Dark HERMES' : theme}</strong>. O tema claro ainda não foi aprovado.</p></section>
}
