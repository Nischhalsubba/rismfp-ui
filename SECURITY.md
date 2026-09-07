# Security policy

## Project scope

RIS MFP UI is maintained as a static historical interface and public documentation/demo surface. It does not contain a production authentication backend, payment system, or server-side datastore in this repository.

Do not submit real credentials, personal data, private project records, or production secrets through the demo/static interface. Repository examples and screenshots should use public or fictional information only.

## Supported surface

Security fixes are accepted for the currently published static site under `site/`, its GitHub Pages deployment workflow, and repository automation.

High-priority reports include:

- committed credentials or tokens;
- unsafe third-party script/resource loading;
- cross-site scripting or unsafe DOM injection in the published pages;
- deployment/workflow permission escalation;
- redirects or links that enable credential theft or misleading downloads.

Historical Git objects may contain obsolete large assets. Do not rewrite repository history as part of an ordinary security fix unless a confirmed secret or legally sensitive artifact requires coordinated removal.

## Reporting

Please use GitHub's private security-advisory/reporting path when available. Avoid opening a public issue that contains exploit details, credentials, private data, or other sensitive evidence.
