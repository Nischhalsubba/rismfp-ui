<div align="center">

<img src="./assets/images/logo.svg" width="96" alt="RISMFP logo">

# RISMFP Historical Archive UI

A responsive, independent reconstruction of the historical **Raising Incomes of Small and Medium Farmers Project** website.

[Live site](https://nischhalsubba.github.io/rismfp-ui/) · [Source](./index.html) · [Quality checks](https://github.com/Nischhalsubba/rismfp-ui/actions/workflows/quality.yml)

</div>

> [!IMPORTANT]
> This is an unofficial historical archive and frontend case study. It is not an active Government of Nepal, RISMFP, or Asian Development Bank service.

## What the site contains

- Historical project background and intended farmer market-access approach
- Interactive Web MIS architecture with fit, zoom, pan, keyboard and fullscreen controls
- Searchable notice and document-reference archives
- Historical office records with explicit verification warnings
- Original project logo and selected field photography

## Published pages

| File | Purpose |
|---|---|
| [`index.html`](./index.html) | Archive homepage, project figures and navigation |
| [`introduction.html`](./introduction.html) | Project context, constraints, approach and intended outcomes |
| [`web-based-mis.html`](./web-based-mis.html) | Monitoring-system explanation and interactive architecture |
| [`news.html`](./news.html) | Searchable historical notice titles |
| [`download.html`](./download.html) | Searchable reports, forms, manuals and bulletin references |
| [`contact.html`](./contact.html) | Historical, unverified office details |
| [`404.html`](./404.html) | Missing-page recovery route |

## Architecture

The production site is framework-free and publishes directly from the repository root.

```text
.
├── .github/workflows/quality.yml
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── agri-theme.css
│   │   ├── qa-fixes.css
│   │   ├── seo-contrast.css
│   │   └── flowchart.css
│   ├── images/
│   └── js/
│       ├── qa-fixes.js
│       └── flowchart.js
├── scripts/
│   ├── validate.mjs
│   └── browser-check.mjs
├── package.json
└── seven static HTML routes
```

Headers, navigation, footers, metadata and primary content are present in static HTML. JavaScript progressively enhances the mobile menu, archive filters, project table of contents, record research actions and interactive diagram.

## Design and accessibility

The interface uses a system sans-serif stack, deep forest green, warm cream, lime accents and soft mint surfaces. Important safeguards include:

- one page-level heading per route;
- static landmarks and skip navigation;
- visible keyboard focus;
- WCAG-oriented foreground and background combinations;
- responsive layouts without intentional page overflow;
- Nepali language metadata and Devanagari fallbacks;
- reduced-motion support;
- text alternatives for the Web MIS architecture;
- historical-contact and archive-provenance warnings.

## Run locally

Serving the site requires only Python:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Run quality checks

The complete QA suite uses Node.js and Playwright:

```bash
npm install
npx playwright install chromium
npm run check
```

The checks include:

- JavaScript syntax;
- required metadata and landmarks;
- local asset and route references;
- final static SEO copy;
- contrast-pair calculations;
- protection against the removed legacy controller;
- Chromium tests at desktop, tablet and mobile widths;
- horizontal-overflow detection;
- computed footer and provenance colors;
- mobile navigation bounds;
- flowchart fit and ordinary page scrolling;
- historical-contact safety.

## Deployment

GitHub Pages publishes from `master` and the repository root. Relative page and asset paths preserve support for the `/rismfp-ui/` project path. The `.nojekyll` file prevents Jekyll processing. `vercel.json` also describes the repository as a static project for preview deployments.

## Historical content and licence

Project names, figures, notices, contact details and descriptions may be outdated. Missing files are labelled unavailable rather than linked to invented downloads. Frontend source code is available under the [MIT License](./LICENSE); historical logos, photographs and project material remain attributable to their original owners.
