# SUPER-AI Nigeria — Kenya-to-Nigeria Migration Manifest

Status: PROPOSED — source review and Nigeria-specific verification required.

## 1. Migration rules

- REUSE: transferable implementation pattern, subject to Nigeria verification.
- ADAPT: retain the pattern but implement Nigeria-specific behavior and identity.
- REPLACE: implement a Nigeria-specific version rather than copying the Kenya implementation.
- EXCLUDE: do not import into the Nigeria product.
- REVIEW: inspect implementation, authorization, dependencies, and evidence before deciding.

Kenya is a reference implementation, not Nigeria's production environment.
Do not copy production secrets, environment files, database contents, project IDs,
deployment credentials, untracked reports, backups, or generated import batches.
Do not overwrite Nigeria documentation or configuration without review.

## 2. Product identity and user experience

| Area | Decision | Nigeria requirement |
|---|---|---|
| Product identity | REPLACE | Independent SUPER-AI Nigeria identity and product copy |
| Global visual system | REPLACE | Smudge Smoked Powder: background #b5d1b9; ink/shadow #082A20; brand green #087A43; premium surface #123B2D; white text on dark premium surfaces |
| Design-system architecture | ADAPT | Reuse token/component architecture only where compatible with Nigeria's visual rules |
| Card and button interactions | ADAPT | Layered ink-derived shadows, contact shadows, pressed inset states, recessed forms |
| Responsive page layouts | REVIEW | Inspect actual mobile behavior before porting |
| Kenya-specific wording and identity | EXCLUDE | No Kenya-specific branding or location assumptions |
| Photographic grass/field backgrounds | EXCLUDE | Not part of the global Nigeria visual system |
| Accessibility and contrast checks | ADAPT | Verify contrast, focus states, keyboard use, and readable controls before release |

## 3. Languages and localization

| Area | Decision | Nigeria requirement |
|---|---|---|
| Language-provider architecture | ADAPT | Reuse only after checking persistence, switching, fallbacks, and React integration |
| English translations | ADAPT | Retain useful source text; review all Nigeria-facing copy |
| Kiswahili locale and translations | REPLACE | Replace with Nigerian Pidgin, Yorùbá, Hausa, and Igbo |
| Nigerian Pidgin locale identifier | REVIEW | Verify the chosen locale tag against libraries and providers before implementation |
| Yorùbá | ADAPT | Preserve correct diacritics and validate fonts, search, input, and rendering |
| Hausa | ADAPT | Validate translations, tutor responses, and text rendering |
| Igbo | ADAPT | Validate translations, tutor responses, and text rendering |
| Translation coverage | REVIEW | Inventory every key; detect missing keys and unintended English fallbacks |
| Tutor language instructions | REPLACE | Explicitly support all five Nigeria languages and handle language selection predictably |
| Language-specific content | ADAPT | Avoid assuming that a translated interface automatically localizes lessons and assessments |

## 4. Frontend and application architecture

| Area | Decision | Nigeria requirement |
|---|---|---|
| React and TypeScript patterns | REVIEW | Confirm compatibility with the selected Nigeria scaffold and dependencies |
| Vite build setup | ADAPT | Establish independently in the Nigeria repository |
| React Router routes | ADAPT | Define Nigeria routes from approved product requirements |
| Home and marketing pages | REPLACE | Build Nigeria-specific content, navigation, and visual identity |
| Course catalogue and course details | ADAPT | Retain useful presentation patterns; validate Nigeria's course data contract |
| Lesson pages | ADAPT | Support verified lesson content, video links, and accessible playback |
| Learner dashboard | ADAPT | Reuse interaction patterns only after defining progress and access requirements |
| Tutor interface | ADAPT | Retain useful chat UX; replace language, backend assumptions, and Nigeria-specific messaging |
| Kenya-only tools and routes | REVIEW | Include only when explicitly approved for Nigeria |
| Shared UI components | REVIEW | Port individually; verify dependencies, accessibility, styling, and unused code |

## 5. Supabase, database, and authorization

| Area | Decision | Nigeria requirement |
|---|---|---|
| Supabase JavaScript client pattern | ADAPT | Use Nigeria-only environment variables and a separately provisioned project |
| Kenya Supabase URL, project reference, or credentials | EXCLUDE | Never reuse Kenya production configuration |
| Foundation schema | REVIEW | Inspect each table, constraint, index, dependency, and migration order |
| Course and lesson schema | ADAPT | Establish the Nigeria curriculum contract before writing migrations |
| Subject/AI-track records | ADAPT | Validate Nigeria's approved course taxonomy and seed data |
| Row-level security | REVIEW | Verify policies for every exposed table and operation |
| Lesson-video table and policies | REVIEW | Confirm read/write policies, grants, and access to unpublished content |
| Entitlements and paid access | REVIEW | Define Nigeria-specific authorization before implementing paid features |
| Tutor Edge Function | ADAPT | Use server-side provider secrets and authenticated, authorized requests |
| AI provider and model | REVIEW | Verify availability, cost, supported languages, quotas, and production behavior |
| Service-role credentials | EXCLUDE | Never expose in browser code or commit to the repository |
| Kenya production data and seed records | EXCLUDE | Do not copy users, payments, progress, or live database records |
| Migration SQL | REVIEW | Re-author or adapt only after schema and security review; do not blindly replay Kenya migrations |

## 6. Curriculum, tutor, and video delivery

| Area | Decision | Nigeria requirement |
|---|---|---|
| Curriculum presentation model | ADAPT | Preserve useful course/lesson hierarchy where appropriate |
| Kenya course catalogue and records | REVIEW | Do not assume the same catalogue is approved for Nigeria |
| Learning objectives and lesson structure | ADAPT | Validate curriculum quality and localization before publication |
| Tutor prompt and grounding rules | REPLACE | Define Nigeria-specific supported languages, curriculum grounding, refusals, and error behavior |
| Tutor access controls | REVIEW | Verify identity, rate limits, abuse protection, and server-side secrets |
| Lesson video component | ADAPT | Reuse only after testing supported providers, mobile playback, and failure states |
| YouTube/Bilibili URLs | REVIEW | Validate every URL and its suitability for the Nigeria audience |
| Video completion tracking | REVIEW | Confirm completion logic and persistence; do not equate a loaded video with completed learning |
| Assessments and learner progress | REVIEW | Define reliable persistence, scoring, and authorization before migration |
| Certificates and paid features | REVIEW | Include only after product, verification, and operational requirements are defined |

## 7. Build, deployment, and repository hygiene

| Area | Decision | Nigeria requirement |
|---|---|---|
| Package manifest and lockfile | ADAPT | Create and verify against the approved Nigeria scaffold |
| TypeScript and lint configuration | ADAPT | Establish reproducible checks for the new repository |
| Vercel configuration | ADAPT | Configure the Nigeria project and domains independently |
| `.env.example` | ADAPT | Document variable names and safe placeholders only |
| `.env` and local secrets | EXCLUDE | Do not copy or commit |
| `.gitignore` | ADAPT | Ignore local environments, build output, secrets, backups, and temporary artifacts |
| Kenya untracked reports and backup files | EXCLUDE | Preserve in Kenya; do not bulk-copy into Nigeria |
| Curriculum source archives and import batches | REVIEW | Track provenance, licenses, attribution, and approval separately |
| Production deployment | REVIEW | Require a passing build, security checks, environment verification, and explicit release approval |

## 8. Release gates

Do not declare Nigeria migration complete until evidence exists for all applicable gates.

1. Repository contains only approved Nigeria source and documentation.
2. Nigeria visual tokens and component states are implemented and contrast-checked.
3. All five language choices work; translation coverage and fallback behavior are measured.
4. Course, lesson, assessment, and progress flows work against Nigeria's own backend.
5. Database migrations are reviewed, ordered, and tested against the intended schema.
6. Row-level security and tutor authorization are verified, including negative-access tests.
7. Tutor responses are tested in Nigerian Pidgin, Yorùbá, Hausa, Igbo, and English.
8. Lesson videos are checked for valid URLs, playable embeds, mobile behavior, and error states.
9. Production secrets are server-side; no Kenya production identifiers or credentials have leaked into the Nigeria build.
10. TypeScript build, lint, and relevant automated tests pass.
11. Preview deployment is verified before any production release.
12. Pushes, production deployment, and database changes receive explicit approval.

## 9. Immediate implementation sequence

1. Finish reviewing the Kenya deep-review report and resolve uncertain source paths.
2. Approve the Nigeria architecture and dependency baseline.
3. Initialize Git in the existing Nigeria folder after confirming the intended repository identity.
4. Scaffold the minimal application and Smudge Smoked Powder design system.
5. Implement the five-language architecture and translation coverage checks.
6. Establish Nigeria-only Supabase configuration and reviewed migrations.
7. Port curriculum, lesson-video, learner-progress, and tutor functionality in controlled stages.
8. Run build, security, localization, and deployment checks.
9. Review the preview before requesting permission for a production release.

## 10. Evidence discipline

This manifest records proposed decisions, not completed implementation.
A source file existing in Kenya is not proof that it works in production.
Update each decision only after inspecting the relevant source and recording verification evidence.
