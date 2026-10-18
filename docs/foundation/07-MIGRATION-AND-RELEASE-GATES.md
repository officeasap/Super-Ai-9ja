# 07 — Migration and Release Gates

## Sequence
1. Approve this documentation baseline.
2. Inspect the Kenya repository: framework, scripts, routes, UI, migrations,
   authorization, tutor, curriculum, localization, environment variables,
   tests, and deployment configuration.
3. Produce a migration manifest with REUSE / ADAPT / REPLACE / EXCLUDE / REVIEW.
4. Initialize or verify the Nigeria Git repository and default branch.
5. Scaffold only after the reference inspection and architecture decisions.
6. Port components and features in small, reviewable groups.
7. Replace Kenya-specific branding, language setup, operational settings,
   integrations, and country-specific copy.
8. Run tests, type checks, lint, production build, security checks, and language
   coverage checks appropriate to the actual stack.
9. Review the diff, secrets, licenses, migrations, and release notes.
10. Push only after explicit release approval; deploy and verify separately.

## Never transfer
- Production secrets or service-role keys
- Production user/learner data
- Unreviewed licensed content or media
- Kenya production URLs or configuration left active by accident

## Release gate checklist
- [ ] Correct repository, branch, and clean/understood working tree
- [ ] No leaked secrets or unintended country-specific configuration
- [ ] Five language paths and documented fallback behavior checked
- [ ] Core Smudge Smoked Powder tokens centrally enforced
- [ ] Contrast, keyboard focus, mobile layout, loading/error states checked
- [ ] Authorization and row-level security reviewed and tested
- [ ] Course access, tutor grounding, and progress rules tested
- [ ] Dependency, license, and source provenance review completed
- [ ] Production build and required tests pass
- [ ] Environment and migration plan reviewed
- [ ] Push and deployment separately authorized and verified

A checklist item may be marked complete only when evidence exists.
