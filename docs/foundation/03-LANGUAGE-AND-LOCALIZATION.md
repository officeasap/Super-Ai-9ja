# 03 — Language and Localization Architecture

## Required languages
| Language | Locale candidate | Status |
|---|---|---|
| English | `en` | Required |
| Nigerian Pidgin | `pcm` | Provisional; verify tooling support |
| Yorùbá | `yo` | Required |
| Hausa | `ha` | Required |
| Igbo | `ig` | Required |

Verify language tags against the selected i18n library, AI provider, analytics,
search, speech, and any external service before integration.

## Separate language dimensions
1. UI locale: navigation, labels, validation, account and system messages.
2. Content locale: the language in which a course or lesson is authored.
3. Tutor language: the language requested for an individual tutor response.
4. Learner preference: the saved default, which the learner can change.

These values may differ. Do not force the whole product to one language because
a particular lesson or tutor answer uses another.

## Engineering rules
- Store and transport text as UTF-8.
- Preserve Yorùbá diacritics and correct spelling in persistence, search,
  rendering, exports, and user input.
- Avoid hard-coded user-facing strings in components.
- Use stable translation keys, pluralization, and locale-aware formatting.
- Define explicit fallback behavior; never silently label English as a
  completed translation in another language.
- Mark translations as draft, reviewed, or approved.
- Maintain a glossary and human-review process for educational terminology.
- Allow a learner to report a poor or misleading translation.
- Test long labels, text expansion, keyboard input, screen readers, and mobile
  wrapping for every required language.

## AI tutor language evaluation
Evaluate factual accuracy, instruction following, safety, clarity, cultural
appropriateness, and language naturalness separately for all five languages.
A language option is not proof of reliable language performance.
