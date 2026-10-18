# SUPER-AI Kenya — Reference Inventory

Read-only inspection for SUPER-AI-9JA adaptation.

## Repository identity

Path: `/c/Users/LENOVO/Desktop/SUPER-AI-KENYA`

Repository root: C:/Users/LENOVO/Desktop/SUPER-AI-KENYA

Branch: main

Latest commit: bfbe4d0 Load approved draft courses from public catalogue


## Working-tree status

```text
?? SUPER-AI-KENYA-CHECKPOINT.txt
?? SUPER-AI-KENYA-CURRICULUM-DATA-FLOW-REPORT.txt
?? SUPER-AI-KENYA-FRONTEND-GITHUB-LINK-CLEANUP.txt
?? SUPER-AI-KENYA-MASTER-VIDEO-INVENTORY.txt
?? SUPER-AI-KENYA-NAVIGATION-IMPLEMENTATION.txt
?? SUPER-AI-KENYA-NAVIGATION-REPORT.txt
?? SUPER-AI-KENYA-NEUROMATCH-LESSON-RECONCILIATION.txt
?? SUPER-AI-KENYA-NEUROMATCH-VIDEO-RECONCILIATION.txt
?? SUPER-AI-KENYA-PUSH-REPORT.txt
?? SUPER-AI-KENYA-VIDEO-IMPLEMENTATION-REPORT.txt
?? SUPER-AI-KENYA-VIDEO-RECONCILIATION.txt
?? SUPER-AI-KENYA-VIDEO-SOURCE-EXTRACT.txt
?? SUPER-AI-KENYA-VIDEO-VERIFICATION.txt
?? curriculum/import-review/alternative-import-manifest.json.before-order-fix
?? curriculum/import-review/neuromatch-curriculum-import.sql
?? curriculum/import-review/neuromatch-lesson-videos-import.sql
?? curriculum/import-review/neuromatch-sql-chunks/
?? curriculum/import-review/neuromatch-video-ids-extracted.csv
?? curriculum/import-review/sql-batches/previous-batches-backup/
?? scripts/build-curriculum-import.mjs.pre-path-fix.bak
?? scripts/build-curriculum-import.mjs.pre-source-rules.bak
?? src/App.tsx.before-lazy-css-cleanup
?? src/App.tsx.before-tutor-lazy-load
?? src/components/curriculum/LessonVideo.tsx.before-video-wiring-20261014-104649
?? src/components/navigation/Header.tsx.before-duplicate-render-fix
?? src/components/navigation/Header.tsx.before-mobile-menu-fix
?? src/pages/CourseDetailPage.tsx.before-video-wiring-20261014-104649
?? src/pages/CoursesPage.tsx.before-course-images
?? src/pages/CoursesPage.tsx.before-nine-course-fix
?? src/pages/HomePage.tsx.before-si-school-card-20261014-112656
?? src/pages/LessonPage.tsx.before-video-wiring-20261014-104649
?? src/pages/learner/DashboardPage.tsx.before-tutor-lazy-load
?? src/pages/tutor/TutorPage.css.before-lazy-css-cleanup
?? src/styles/design-system.css.before-mobile-neumorphism
?? subscriber-video-access-audit.txt
?? subscriber-video-access-fix-result.txt
?? subscriber-video-access-fix.sql
?? video-audit.txt
?? video-status-summary.txt
```

## Tracked root and project files

```text
.env.example
.gitignore
.oxlintrc.json
README.md
SUPER-AI-KENYA-CODEBASE-REVIEW.txt
curriculum/import-audit/alternative-curriculum-audit.json
curriculum/import-audit/alternative-curriculum-audit.md
curriculum/import-audit/application-schema-references.txt
curriculum/import-audit/existing-migrations.txt
curriculum/import-audit/licensing-manifests.txt
curriculum/import-audit/source-files.tsv
curriculum/import-review/alternative-import-manifest.json
curriculum/import-review/alternative-import-plan.sql
curriculum/import-review/import-manifest.json
curriculum/import-review/import-plan.sql
index.html
package-lock.json
package.json
public/apple-touch-icon.png
public/favicon-96x96.png
public/favicon.ico
public/favicon.svg
public/site.webmanifest
public/superAikenyaLogo.png
public/web-app-manifest-192x192.png
public/web-app-manifest-512x512.png
scripts/build-alternative-curriculum-import.mjs
scripts/build-curriculum-import.mjs
scripts/run-alternative-curriculum-import.mjs
scripts/split-alternative-curriculum-import.mjs
src/App.css
src/App.tsx
src/assets/AI-Agents-and-Workflow-Automation.png
src/assets/AI-Video-Editing-and-Content-Creation.png
src/assets/Python-Programming.png
src/assets/ai-literacy-kenya.png
src/assets/applied-mlops.png
src/assets/cybersecurity-ai-safety.png
src/assets/deep-learning.png
src/assets/findRightWords.png
src/assets/freeImageEnhancer.png
src/assets/generative-ai-llm-applications.png
src/assets/llms-generative-ai.png
src/assets/suspeciouSms.png
src/assets/understandYourMoney.png
src/data/courses.ts
src/data/curriculum.ts
src/data/studentContent.ts
src/i18n/LanguageContext.ts
src/i18n/LanguageProvider.tsx
src/i18n/index.ts
src/i18n/languages.ts
src/i18n/translations.ts
src/i18n/useLanguage.ts
src/index.css
src/lib/supabase.ts
src/main.tsx
src/pages/CourseDetailPage.tsx
src/pages/CoursesPage.tsx
src/pages/HomePage.tsx
src/pages/HowItWorksPage.tsx
src/pages/LessonPage.tsx
src/pages/MentorshipPage.tsx
src/pages/StudentOutcomesPage.tsx
src/pages/WhatIsSiPage.tsx
src/styles/design-system.css
src/styles/everyday-tools-cathedral.css
supabase/.gitignore
supabase/config.toml
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql
supabase/migrations/20261013000100_replace_legacy_subjects_with_ai_tracks.sql
supabase/migrations/20261013000200_add_video_urls_to_lessons.sql
supabase/migrations/20261014000100_add_lesson_videos.sql
supabase/seed.sql
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vercel.json
vite.config.ts
```

## Package scripts and dependencies

Package: super-ai-kenya
Scripts:
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "oxlint",
  "preview": "vite preview"
}
Dependencies:
{
  "@supabase/supabase-js": "^2.117.3",
  "@tailwindcss/vite": "^4.3.3",
  "pg": "^8.23.1",
  "react": "^19.2.8",
  "react-dom": "^19.2.8",
  "react-router-dom": "^7.18.4",
  "tailwindcss": "^4.3.3"
}
Dev dependencies:
{
  "@types/node": "^24.13.3",
  "@types/react": "^19.2.18",
  "@types/react-dom": "^19.2.7",
  "@vitejs/plugin-react": "^6.1.1",
  "oxlint": "^1.81.0",
  "typescript": "~6.0.2",
  "vite": "^8.3.0"
}

## Application, database, and deployment paths

```text
.oxlintrc.json
package-lock.json
src/App.css
src/App.tsx
src/assets/AI-Agents-and-Workflow-Automation.png
src/assets/AI-Video-Editing-and-Content-Creation.png
src/assets/Python-Programming.png
src/assets/ai-literacy-kenya.png
src/assets/applied-mlops.png
src/assets/cybersecurity-ai-safety.png
src/assets/deep-learning.png
src/assets/findRightWords.png
src/assets/freeImageEnhancer.png
src/assets/generative-ai-llm-applications.png
src/assets/llms-generative-ai.png
src/assets/suspeciouSms.png
src/assets/understandYourMoney.png
src/components/curriculum/LessonVideo.tsx
src/components/home/About.tsx
src/components/home/Community.tsx
src/components/home/Footer.tsx
src/components/home/Hero.tsx
src/components/home/LearningJourney.tsx
src/components/home/Outcomes.tsx
src/components/home/SkillPack.tsx
src/components/navigation/Header.tsx
src/components/ui/Badge.tsx
src/components/ui/Button.tsx
src/components/ui/Card.tsx
src/components/ui/Surface.tsx
src/data/courses.ts
src/data/curriculum.ts
src/data/studentContent.ts
src/i18n/LanguageContext.ts
src/i18n/LanguageProvider.tsx
src/i18n/index.ts
src/i18n/languages.ts
src/i18n/translations.ts
src/i18n/useLanguage.ts
src/index.css
src/lib/supabase.ts
src/main.tsx
src/pages/CourseDetailPage.tsx
src/pages/CoursesPage.tsx
src/pages/HomePage.tsx
src/pages/HowItWorksPage.tsx
src/pages/LessonPage.tsx
src/pages/MentorshipPage.tsx
src/pages/StudentOutcomesPage.tsx
src/pages/WhatIsSiPage.tsx
src/pages/about/AboutPage.tsx
src/pages/about/OurStoryPage.tsx
src/pages/contact/ContactPage.tsx
src/pages/learner/AuthPage.tsx
src/pages/learner/DashboardPage.tsx
src/pages/learner/learner.css
src/pages/tools/EverydayToolsPage.tsx
src/pages/tools/ImageEnhancerPage.tsx
src/pages/tools/MessageCheckerPage.tsx
src/pages/tutor/TutorPage.css
src/pages/tutor/TutorPage.tsx
src/pages/why-choose-us/WhyChooseUsPage.tsx
src/styles/design-system.css
src/styles/everyday-tools-cathedral.css
supabase/.gitignore
supabase/config.toml
supabase/functions/tutor-chat/index.ts
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql
supabase/migrations/20261013000100_replace_legacy_subjects_with_ai_tracks.sql
supabase/migrations/20261013000200_add_video_urls_to_lessons.sql
supabase/migrations/20261014000100_add_lesson_videos.sql
supabase/seed.sql
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vercel.json
vite.config.ts
```

## Environment variable names only

Values and secrets are intentionally excluded.

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
GEMINI_API_KEY
ALLOWED_ORIGINS```

## Localization and design candidates

```text
src/i18n/LanguageContext.ts
src/i18n/LanguageProvider.tsx
src/i18n/index.ts
src/i18n/languages.ts
src/i18n/translations.ts
src/i18n/useLanguage.ts
src/index.css
src/pages/HomePage.tsx
src/pages/LessonPage.tsx
src/pages/learner/DashboardPage.tsx
src/pages/tutor/TutorPage.css
src/pages/tutor/TutorPage.tsx
src/styles/design-system.css
supabase/functions/tutor-chat/index.ts
```

## Supabase configuration identifiers

5:project_id = "SUPER-AI-KENYA"
416:[functions.tutor-chat]
417:verify_jwt = true

## Recent commit history

```text
bfbe4d0 Load approved draft courses from public catalogue
470ffac Show all nine Kenya courses with draft safeguards
500a300 Add Kenya AI courses and repair curriculum migrations
216e164 Refresh SUPER-AI Kenya homepage identity
f697b53 Add lesson video support and update learning homepage
cea6aa4 Polish mobile navigation and add course imagery
0c27f8c Improve mobile navigation and lazy-load tutor
672867f Show six pillar course cards with image placeholders
```

## Inspection limitations

- This inventory does not establish that the application builds or deploys.
- Environment values, credentials, and production data are not copied.
- Source files, database policies, migrations, and tutor implementation require targeted review before porting.
