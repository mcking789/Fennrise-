# Fennrise Data Breach Response Plan

> Internal operational plan. Review it after major product/provider changes and have qualified counsel confirm notification obligations before a material paid or international launch.

## Purpose

This plan covers the Fennrise company website and current website providers. STAR and Fenn require their own product-specific incident procedures before launch because they may process more sensitive permissions or personal information.

## Current website data/providers

- Waitlist: name, email, selected role and consent record.
- Optional survey responses.
- General email communications.
- Website/security logs from hosting infrastructure.
- Optional Google Analytics usage data only when a visitor allows analytics.
- Vercel: website hosting/delivery.
- Formspree: waitlist and survey submissions.
- Google Analytics: optional analytics.

## Incident owner

Until a dedicated security/legal team exists, Fennrise should appoint one named incident owner and one backup.

**Primary incident owner:** [Name / role]  
**Backup:** [Name / role]  
**Privacy contact:** privacy@fennrise.com  
**Legal contact:** legal@fennrise.com  
**Support contact:** support@fennrise.com

## Severity levels

### SEV-1 — Critical

Confirmed or strongly suspected unauthorised access to personal data, credentials, administrator accounts, production systems, domain/DNS control, email control or a third-party provider account that can expose/alter Fennrise data.

### SEV-2 — High

Security event with plausible exposure but no confirmed personal-data access; compromised low-privilege credential; suspicious provider activity; exploitable production vulnerability.

### SEV-3 — Routine

Spam, unsuccessful login attempts, low-risk vulnerability reports, isolated availability issues with no evidence of data compromise.

## First response

1. **Do not delete evidence.** Preserve timestamps, provider alerts, logs, suspicious messages, request IDs and screenshots.
2. **Contain access.** Revoke compromised sessions/tokens, rotate affected passwords/API keys, disable exposed endpoints or accounts where necessary.
3. **Protect the domain and email first.** If DNS/domain/email control is involved, secure registrar/hosting/email administrator accounts and confirm MFA immediately.
4. **Identify the affected system.** Website, Vercel, Formspree, Google Analytics, domain/DNS, mailbox or another provider.
5. **Record who is coordinating the incident.** Use one owner to avoid conflicting actions.
6. **Do not make public claims before facts are checked.** Communicate only verified information.

## Assessment checklist

Determine and record:

- When the incident started and when it was discovered.
- Whether access is ongoing.
- Systems/accounts affected.
- Data categories potentially affected.
- Approximate number of people affected.
- Whether data was only accessed, or also altered/deleted/exported.
- Whether passwords, tokens, payment data or identity information are involved.
- Whether minors may be affected.
- Whether a provider is responsible and what its incident notice says.
- Whether backups or recovery are needed.
- Countries/jurisdictions of affected users if known.

## Provider actions

### Vercel

- Revoke suspicious sessions/tokens.
- Review deployment/project access and recent changes.
- Rotate exposed environment variables/secrets.
- Preserve relevant logs and deployment information.

### Formspree

- Secure the administrator account.
- Review submissions and account activity.
- Ask the provider for incident details/retention information if relevant.
- Export/preserve evidence only where needed for the investigation.

### Domain / DNS / email

- Secure registrar/hosting/Zoho administrator accounts.
- Confirm nameservers, MX, SPF, DKIM and DMARC records were not altered.
- Reset compromised mailbox credentials and revoke sessions/app passwords.
- Check forwarding rules and aliases for unauthorised changes.

## Legal/privacy assessment

The incident owner should promptly determine, with legal advice where appropriate, whether notification is required under applicable Indian data-protection law, contractual commitments, provider terms or laws applying to affected people in other jurisdictions.

Do not rely on this internal plan for an exact statutory notification deadline. Requirements can change and may depend on the type of incident and users affected. Confirm the current rule at the time of the incident.

If notification is required, prepare accurate information covering:

- what happened;
- what data/categories are affected;
- likely consequences or risks;
- actions already taken;
- actions users should take, if any;
- Fennrise contact information; and
- any follow-up information required by the relevant authority.

## Communication rules

- Use **privacy@fennrise.com** for affected-user privacy communications.
- Use **legal@fennrise.com** for formal legal/authority correspondence.
- Use **support@fennrise.com** for customer assistance.
- Do not include unnecessary personal data in incident emails/tickets.
- Keep one internal incident timeline and one approved external message version.

## Recovery

Before declaring the incident resolved:

- confirm compromised access is revoked;
- rotate affected secrets;
- patch the root cause;
- verify production deployment and DNS/email settings;
- test forms and critical pages;
- restore data only from trusted backups where necessary;
- increase monitoring for recurrence; and
- document any remaining risk.

## Post-incident review

Within a reasonable period after containment:

1. Write a short root-cause summary.
2. Record what detection failed or worked.
3. List permanent fixes and an owner for each.
4. Update this plan, privacy documentation and provider inventory if needed.
5. Review whether MFA, least privilege, retention or logging should change.
6. Preserve required incident records without retaining unnecessary personal data.
