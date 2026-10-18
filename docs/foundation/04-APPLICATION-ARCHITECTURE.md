# 04 — Reference Application Architecture

## Architecture principle
Inspect the existing SUPER-AI Kenya repository before selecting implementation
details. Record each candidate item as REUSE, ADAPT, REPLACE, EXCLUDE, or REVIEW,
with a reason and verification evidence.

## Logical layers
- Experience: responsive pages, shared UI primitives, accessibility.
- Localization: UI locale resources and language-selection behavior.
- Learning domain: courses, lessons, objectives, assessments, progress.
- Tutor domain: authenticated requests, context retrieval, provider adapter,
  safety checks, response-language control, error handling.
- Identity and authorization: sessions, roles, entitlements, staff access.
- Persistence: schema, migrations, constraints, indexes, row-level security.
- Integrations: approved media, AI provider, optional payments and messaging.
- Operations: environment configuration, observability, backups, release gates.

These are logical boundaries, not a mandate to adopt a particular framework.

## Candidate domain entities
Users/profiles; roles; subjects/tracks; courses; lessons; lesson resources;
assessments; questions; attempts; progress events; tutor conversations;
entitlements; certificates; audit events.

Finalize entities and relationships after reference-repository inspection.
Do not assume the Kenya schema can be copied unchanged.

## Country isolation
Nigeria must have distinct credentials, environment variables, backend project,
storage, payment configuration, deployment targets, and release controls.
Never reuse Kenya production secrets or copy production learner data.

## Required security properties
- Enforce authorization on the server and in database policies.
- Treat browser-supplied roles, prices, entitlements, and completion claims as
  untrusted.
- Keep service-role keys and AI-provider secrets out of client bundles.
- Validate inputs and limit abuse, cost, and request sizes.
- Use migrations with reviewable, reproducible outcomes.
- Record security-sensitive administrative actions.

## Decisions still open
Frontend/build tooling, backend provider and region, hosting/domain, AI model
and provider, payments, certificate verification, and operational monitoring.
Decide from evidence, not assumptions.
