export const SUPPORTED_LANGUAGES = [
  'en',
  'pcm',
  'yo',
  'ha',
  'ig',
] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export interface LanguageDefinition {
  readonly code: SupportedLanguage
  readonly name: string
  readonly nativeName: string
}

export const LANGUAGE_REGISTRY: readonly LanguageDefinition[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'pcm', name: 'Nigerian Pidgin', nativeName: 'Naija Pidgin' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo' },
]

export const LANGUAGE_STORAGE_KEY = 'super-ai-nigeria-language'
