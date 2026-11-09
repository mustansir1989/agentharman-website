# Agent Harman — Real Estate Website

A responsive real estate website developed for Agent Harman, featuring property information, client inquiries, and email newsletter subscriptions.

**Live Website:** [agentharman.com](https://agentharman.com/)

## Project Overview

This project demonstrates the development and deployment of a static business website, along with the integration of email marketing services and domain email authentication.

### Features

- Responsive website design for desktop and mobile devices
- Property and real estate information
- Client contact and inquiry forms
- Mailchimp newsletter subscription integration
- Static website hosting through Netlify
- Custom domain configuration

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Hosting | Netlify |
| Email Marketing | Mailchimp |
| Domain Authentication | SPF, DKIM, DMARC |
| Version Control | GitHub |

## Email Marketing & Security

The website integrates with Mailchimp to support newsletter subscriptions and email marketing campaigns.

Email authentication technologies used in the project's domain configuration include:

- **SPF (Sender Policy Framework):** Identifies authorized email sending infrastructure.
- **DKIM (DomainKeys Identified Mail):** Provides cryptographic verification of email authenticity.
- **DMARC (Domain-based Message Authentication, Reporting & Conformance):** Defines how receiving mail servers should handle messages that fail authentication checks.

These technologies help protect domain reputation and reduce email spoofing risks.

## Repository Structure

```text
HarmanNov2026/
├── index.html
├── css/
├── js/
└── assets/
```

The website's deployed files are preserved in the `HarmanNov2026` directory.

## Deployment

The website is deployed using Netlify and is accessible through its custom domain.

This repository serves as a version-controlled copy of the deployed website files. It does not automatically imply that GitHub is connected to the live Netlify deployment.

## Future Improvements

- Improve accessibility and SEO
- Enhance form validation and submission monitoring
- Document email authentication configuration and testing
- Establish a Git-based deployment workflow

## Security Considerations

API credentials, authentication secrets, and private subscriber information should never be committed to this public repository.

## Project Purpose

This project demonstrates practical experience in frontend development, website deployment, DNS configuration, email marketing integration, and email authentication.

---

**Maintained by:** Mustansir Lokhandwala
