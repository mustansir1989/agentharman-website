
# Email Security & Authentication — Agent Harman

## Overview

This document describes the email authentication configuration for `agentharman.com`, used for business communications and Mailchimp marketing newsletters.

The objective is to authenticate legitimate outbound email, support domain reputation, and reduce the risk of email spoofing.

## Technology Stack

- **Domain:** agentharman.com
- **DNS Management:** Namecheap
- **Email Marketing:** Mailchimp
- **Email Authentication:** SPF, DKIM, DMARC
- **Validation:** Gmail message authentication headers

## Authentication Configuration

### SPF — Sender Policy Framework

The root domain's SPF record was independently verified using PowerShell:

```text
v=spf1 include:spf.privateemail.com ~all
```

This record authorizes Namecheap Private Email infrastructure to send email for `agentharman.com`. The `~all` mechanism specifies a softfail for senders not otherwise authorized.

Mailchimp newsletters use a separate envelope-sender domain for SPF authentication.

A delivered newsletter passed SPF using Mailchimp's envelope-sender domain, while aligned DKIM for `agentharman.com` satisfied DMARC.

**Validation method:**

```powershell
Resolve-DnsName agentharman.com -Type TXT
```

**Result:** Root-domain SPF record confirmed. Mailchimp newsletter SPF authentication separately validated.

### DKIM — DomainKeys Identified Mail

Mailchimp DKIM records were configured in Namecheap:

| Host | CNAME Target |
|---|---|
| k2._domainkey | dkim2.mcsv.net |
| k3._domainkey | dkim3.mcsv.net |

A delivered newsletter passed DKIM authentication for:

- `agentharman.com`
- `gmail.mcsv.net`

The DKIM signature associated with `agentharman.com` used selector `k3`.

### DMARC — Domain-based Message Authentication

The observed DMARC DNS policy was:

`v=DMARC1; p=none;`

This is a monitoring-only policy that does not request quarantine or rejection of messages failing DMARC.

The tested newsletter passed DMARC authentication through aligned DKIM.

## Validation Results

**Test:** Mailchimp newsletter delivered to Gmail, November 2026.

| Control | Result | Notes |
|---|---|---|
| SPF | PASS | Mailchimp envelope-sender domain |
| DKIM | PASS | agentharman.com |
| DMARC | PASS | Aligned DKIM |
| Mailchimp Domain Authentication | Authenticated | Confirmed in Mailchimp dashboard |

These results validate the tested newsletter, not every possible sending service or message.

## Security Findings

1. Mailchimp domain authentication is configured and functioning for the tested newsletter.
2. DKIM alignment satisfies DMARC requirements.
3. SPF authentication succeeds for Mailchimp's envelope-sender domain.
4. DMARC currently uses a monitoring-only policy.
5. Root-domain SPF and authentication for other business email services require further verification.

## Recommended Next Steps

- Verify the root-domain SPF configuration using public DNS queries.
- Identify and validate all authorized business email sending services.
- Configure DMARC aggregate reporting where appropriate.
- Review authentication results before considering `p=quarantine` or `p=reject`.
- Periodically validate SPF, DKIM, and DMARC after changes to email providers.

## Security & Privacy

This repository intentionally excludes full message headers, subscriber information, recipient addresses, Mailchimp account identifiers, and personalized tracking or unsubscribe URLs.

Only sanitized technical findings are documented.

---

**Project:** Agent Harman Real Estate Website  
**Assessment Date:** November 2026  
**Status:** Newsletter authentication validated; additional DNS hardening review pending.
