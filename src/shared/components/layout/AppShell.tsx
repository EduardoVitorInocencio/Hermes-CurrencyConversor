import { useState } from 'react'
import { ArrowsLeftRight, ChartLine, Gear } from '@/shared/components/iconography'
import { EmptyState } from '@/shared/components/feedback'
import './AppShell.css'

export type AppSection = 'converter' | 'history' | 'reports'

interface NavigationItem {
  id: AppSection
  label: string
  description: string
}

const navigationItems: NavigationItem[] = [
  { id: 'converter', label: 'Conversor', description: 'Converta valores entre moedas.' },
  { id: 'history', label: 'Histórico', description: 'Acompanhe séries e registros.' },
  { id: 'reports', label: 'Relatórios', description: 'Organize análises e exportações.' },
]

export interface AppShellProps {
  initialSection?: AppSection
}

function SectionIcon({ section }: { section: AppSection }) {
  if (section === 'converter') {
    return <ArrowsLeftRight aria-hidden="true" size={20} weight="regular" />
  }
  if (section === 'history') {
    return <ChartLine aria-hidden="true" size={20} weight="regular" />
  }
  return <Gear aria-hidden="true" size={20} weight="regular" />
}

function Navigation({
  activeSection,
  id,
  onSelect,
}: {
  activeSection: AppSection
  id: string
  onSelect: (section: AppSection) => void
}) {
  return (
    <nav aria-label={id === 'desktop-navigation' ? 'Seções principais' : 'Navegação móvel'} id={id}>
      <ul className="app-shell__nav-list">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <button
              aria-current={activeSection === item.id ? 'page' : undefined}
              aria-pressed={activeSection === item.id}
              className={['app-shell__nav-button', activeSection === item.id ? 'is-active' : undefined]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSelect(item.id)}
              type="button"
            >
              <SectionIcon section={item.id} />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function AppShell({ initialSection = 'converter' }: AppShellProps) {
  const [activeSection, setActiveSection] = useState<AppSection>(initialSection)
  const activeItem = navigationItems.find((item) => item.id === activeSection) ?? navigationItems[0]

  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar" aria-label="Navegação principal">
        <div className="app-shell__brand" aria-label="HERMES Currency Exchange">
          <span className="app-shell__brand-mark" aria-hidden="true">H</span>
          <span>HERMES</span>
        </div>
        <Navigation activeSection={activeSection} id="desktop-navigation" onSelect={setActiveSection} />
        <p className="app-shell__sidebar-note">Currency Exchange</p>
      </aside>

      <div className="app-shell__body">
        <header className="app-shell__topbar">
          <div>
            <p className="app-shell__eyebrow">Workspace</p>
            <p className="app-shell__section-label">{activeItem.label}</p>
          </div>
          <span className="app-shell__status" aria-label="Status da interface: pronta">
            <span aria-hidden="true" />
            Pronta
          </span>
        </header>

        <main aria-labelledby="app-shell-page-title" className="app-shell__main" id="main-content" tabIndex={-1}>
          <div className="app-shell__heading">
            <p className="app-shell__eyebrow">HERMES / {activeItem.label}</p>
            <h1 className="type-h1" id="app-shell-page-title">{activeItem.label}</h1>
            <p className="app-shell__description">{activeItem.description}</p>
          </div>
          <EmptyState
            description="Esta área está pronta para receber dados reais da aplicação."
            title={`${activeItem.label} em preparação`}
          />
        </main>

        <div className="app-shell__mobile-navigation">
          <Navigation activeSection={activeSection} id="mobile-navigation" onSelect={setActiveSection} />
        </div>
      </div>
    </div>
  )
}
