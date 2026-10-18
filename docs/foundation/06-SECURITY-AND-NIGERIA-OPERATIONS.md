# 06 — Security, Privacy, and Nigeria Operations

This is an engineering baseline, not legal advice or a claim of regulatory
compliance. Obtain qualified Nigerian legal/privacy review before launch.

## Minimum controls
- Use least privilege and deny-by-default authorization.
- Review database row-level security and test cross-user access.
- Keep privileged keys server-side and rotate exposed credentials.
- Validate uploads, content types, size limits, and storage access.
- Protect authentication, password recovery, sessions, and administrative
  operations against abuse.
- Apply rate limits and budgets to tutor and other costly endpoints.
- Avoid logging passwords, access tokens, payment secrets, or unnecessary
  learner content.
- Define retention, deletion, export, consent, and incident procedures.
- Back up critical data and test restoration.
- Keep dependency updates and vulnerability remediation in the release process.

## Nigeria-specific decisions requiring validation
- Applicable privacy and data-protection obligations
- Data residency and provider contract requirements
- Payment-provider eligibility, settlement, refunds, and reconciliation
- Tax, consumer disclosures, and certificate representations
- Accessibility and child/young-learner safeguards where applicable

Do not select a payment provider, hosting region, domain, or legal position
without a documented decision and verification.
