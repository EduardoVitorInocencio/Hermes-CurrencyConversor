import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AppProviders } from './providers/AppProviders'
import '../index.css'

function getRootElement(): HTMLElement {
  const rootElement = document.getElementById('root')

  if (!rootElement) {
    throw new Error('Application root element was not found.')
  }

  return rootElement
}

export function mountApp(rootElement: HTMLElement = getRootElement()) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  )
}
