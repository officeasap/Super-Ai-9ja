import './styles/design-system.css'
import './styles/cathedral-signature.css'
import './styles/ui-repair.css'
import './styles/ui-final.css'
import './styles/ui-header.css'
import './styles/ui-neumorphic.css'
import { useEffect } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'

import { App } from './App'
import { LanguageProvider } from './i18n/LanguageProvider'
const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element #root was not found')
}

function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname, search])

  return null
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
