import { useState, type ReactNode } from 'react'
import { ArrowsLeftRight, ChartLine, Gear, Moon } from '@/shared/components/iconography'
import hermesSymbol from '@/assets/HermesOfficialSymbol.png'
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
  renderSection?: (section: AppSection, onNavigate: (section: AppSection) => void) => ReactNode
}

const pageMeta: Record<AppSection, { eyebrow: string; title: string; description: string }> = {
  converter: { eyebrow: 'VISÃO DO MERCADO', title: 'Moedas e câmbio', description: 'Converta valores, acompanhe tendências e prepare seus relatórios.' },
  history: { eyebrow: 'ANÁLISE CAMBIAL', title: 'Histórico de moedas', description: 'Explore séries históricas e compare o desempenho das principais moedas.' },
  reports: { eyebrow: 'RELATÓRIOS', title: 'Monte seu relatório', description: 'Selecione dados, personalize as colunas e exporte uma visão pronta para compartilhar.' },
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

export function AppShell({ initialSection = 'converter', renderSection }: AppShellProps) {
  const [activeSection, setActiveSection] = useState<AppSection>(initialSection)
  const [language, setLanguage] = useState('PT')
  const activeItem = navigationItems.find((item) => item.id === activeSection) ?? navigationItems[0]
  const activeMeta = pageMeta[activeSection]

  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar" aria-label="Navegação principal">
        <div className="app-shell__brand" aria-label="HERMES Currency Exchange">
          <img alt="" className="app-shell__brand-mark" src={hermesSymbol} />
          <span><strong>HERMES</strong><small>CÂMBIO INTERNACIONAL</small></span>
        </div>
        <Navigation activeSection={activeSection} id="desktop-navigation" onSelect={setActiveSection} />
        <div className="app-shell__saved">
          <p className="app-shell__sidebar-heading">PARES SALVOS <span>3</span></p>
          <button type="button" onClick={() => setActiveSection('converter')}><span>EUR</span><b>/</b><span>USD</span><small>EUR/USD</small></button>
          <button type="button" onClick={() => setActiveSection('converter')}><span>USD</span><b>/</b><span>BRL</span><small>USD/BRL</small></button>
          <button type="button" onClick={() => setActiveSection('converter')}><span>GBP</span><b>/</b><span>USD</span><small>GBP/USD</small></button>
        </div>
        <div className="app-shell__source-card"><span className="app-shell__source-dot" /> <span><strong>Fonte de dados</strong><small>Frankfurter · ECB</small></span></div>
        <p className="app-shell__sidebar-note">Currency Exchange · v1.0</p>
      </aside>

      <div className="app-shell__body">
        <header className="app-shell__topbar">
          <span className="app-shell__status" aria-label="API conectada">
            <span aria-hidden="true" />
            API conectada
          </span>
          <div className="app-shell__topbar-actions">
            <button aria-label="Tema escuro ativo" className="app-shell__theme" type="button"><Moon aria-hidden="true" size={16} weight="fill" /></button>
            <div aria-label="Idioma" className="app-shell__languages" role="group">
              {['PT', 'EN', 'ES'].map((item) => <button aria-pressed={language === item} className={language === item ? 'is-active' : undefined} key={item} onClick={() => setLanguage(item)} type="button"><span aria-hidden="true">{item === 'PT' ? '🇧🇷' : item === 'EN' ? '🇺🇸' : '🇪🇸'}</span>{item}</button>)}
            </div>
          </div>
        </header>

        <main aria-labelledby="app-shell-page-title" className="app-shell__main" id="main-content" tabIndex={-1}>
          <div className="app-shell__heading">
            <p className="app-shell__eyebrow">{activeMeta.eyebrow}</p>
            <h1 className="type-h1" id="app-shell-page-title">{activeMeta.title}</h1>
            <p className="app-shell__description">{activeMeta.description}</p>
          </div>
          {renderSection ? renderSection(activeSection, setActiveSection) : (
            <EmptyState
              description="Esta área está pronta para receber dados reais da aplicação."
              title={`${activeItem.label} em preparação`}
            />
          )}
        </main>

        <div className="app-shell__mobile-navigation">
          <Navigation activeSection={activeSection} id="mobile-navigation" onSelect={setActiveSection} />
        </div>
      </div>
    </div>
  )
}
