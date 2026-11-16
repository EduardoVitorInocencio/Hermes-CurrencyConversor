import { useState, type ReactNode } from 'react'
import { ArrowsLeftRight, ChartLine, Gear } from '@/shared/components/iconography'
import hermesSymbol from '@/assets/HermesOfficialSymbol.png'
import connectionRing from '@/assets/figma/converter/connection-ring.svg'
import connectionActive from '@/assets/figma/converter/connection-active.svg'
import themeToggleDark from '@/assets/figma/converter/theme-toggle-dark.svg'
import flagBr from '@/assets/figma/converter/flag-br.svg'
import flagUs from '@/assets/figma/converter/flag-us.svg'
import flagEs from '@/assets/figma/converter/flag-es.svg'
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
    <div className={['app-shell', 'app-shell--' + activeSection].join(' ')}>
      <aside className="app-shell__sidebar" aria-label="Navegação principal">
        <div className="app-shell__brand" aria-label="HERMES Currency Exchange">
          <img alt="" className="app-shell__brand-mark" src={hermesSymbol} />
          <span>CÂMBIO INTERNACIONAL</span>
        </div>
        <div className="app-shell__sidebar-divider" />
        <Navigation activeSection={activeSection} id="desktop-navigation" onSelect={setActiveSection} />
        <div className="app-shell__sidebar-divider app-shell__sidebar-divider--after-nav" />
        <div className="app-shell__saved">
          <p className="app-shell__sidebar-heading">PARES DE MOEDAS <span>3</span></p>
          <button type="button" onClick={() => setActiveSection('converter')}><span className="app-shell__saved-pair">EUR / USD</span><small>Remover</small><b>1,0800</b><em>+0,42%</em></button>
          <button type="button" onClick={() => setActiveSection('converter')}><span className="app-shell__saved-pair">USD / BRL</span><small>Remover</small><b>5,2814</b><em className="is-negative">−0,18%</em></button>
          <button type="button" onClick={() => setActiveSection('converter')}><span className="app-shell__saved-pair">GBP / USD</span><small>Remover</small><b>1,3421</b><em>+0,27%</em></button>
          <p className="app-shell__saved-empty">Salve um par nos cartões<br />para acessá-lo aqui.</p>
        </div>
        <div className="app-shell__source-card"><span><strong>FONTE DE DADOS</strong><b>Frankfurter / ECB</b><small>Taxas de referência. Os valores podem não refletir operações de câmbio em tempo real.</small></span></div>
      </aside>

      <div className="app-shell__body">
        <header className="app-shell__topbar">
          <span className="app-shell__status" aria-label="API conectada">
            <span className="app-shell__status-ring" aria-hidden="true"><img alt="" src={connectionRing} /><img alt="" src={connectionActive} /></span>
            API conectada
          </span>
          <div className="app-shell__topbar-actions">
            <button aria-label="Tema escuro ativo" className="app-shell__theme" type="button"><img alt="" src={themeToggleDark} /></button>
            <div aria-label="Idioma" className="app-shell__languages" role="group">
              {[['PT', flagBr], ['EN', flagUs], ['ES', flagEs]].map(([item, flag]) => <button aria-pressed={language === item} className={language === item ? 'is-active' : undefined} key={item} onClick={() => setLanguage(item)} type="button"><img alt="" src={flag} />{item}</button>)}
            </div>
          </div>
        </header>

        <main
          aria-label={activeSection === 'history' && renderSection ? activeMeta.title : undefined}
          aria-labelledby={activeSection === 'history' && renderSection ? undefined : 'app-shell-page-title'}
          className={['app-shell__main', activeSection === 'history' ? 'app-shell__main--history' : undefined].filter(Boolean).join(' ')}
          id="main-content"
          tabIndex={-1}
        >
          {activeSection !== 'history' || !renderSection ? (
            <div className="app-shell__heading">
              <p className="app-shell__eyebrow">{activeMeta.eyebrow}</p>
              <h1 className="type-h1" id="app-shell-page-title">{activeMeta.title}</h1>
              <p className="app-shell__description">{activeMeta.description}</p>
            </div>
          ) : null}
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
