import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  LANGUAGE_REGISTRY,
  LANGUAGE_STORAGE_KEY,
  type SupportedLanguage,
} from './languages'
import { translations, type TranslationSet } from './translations'

interface LanguageContextValue {
  readonly language: SupportedLanguage
  readonly setLanguage: (language: SupportedLanguage) => void
  readonly t: TranslationSet
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isSupportedLanguage(value: string): value is SupportedLanguage {
  return LANGUAGE_REGISTRY.some((item) => item.code === value)
}

function getInitialLanguage(): SupportedLanguage {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return stored && isSupportedLanguage(stored) ? stored : 'en'
  } catch {
    return 'en'
  }
}

export function LanguageProvider({ children }: { readonly children: ReactNode }) {
  const [language, setLanguageState] =
    useState<SupportedLanguage>(getInitialLanguage)

  const setLanguage = useCallback((next: SupportedLanguage) => {
    setLanguageState(next)
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next)
    } catch {
      // Language switching still works if browser storage is unavailable.
    }
  }, [])

  const value = useMemo(
    () => ({ language, setLanguage, t: translations[language] }),
    [language, setLanguage],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
