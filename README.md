<div align="center">

<img src="./assets/images/logo.svg" width="96" alt="RISMFP logo">

# RISMFP UI

A dependency-free reconstruction of the historical **Raising Incomes of Small and Medium Farmers Project** website.

[![Live site](https://img.shields.io/badge/Live_site-GitHub_Pages-123f32?style=flat-square)](https://nischhalsubba.github.io/rismfp-ui/)
[![Quality checks](https://img.shields.io/github/actions/workflow/status/Nischhalsubba/rismfp-ui/quality.yml?branch=master&style=flat-square&label=quality)](https://github.com/Nischhalsubba/rismfp-ui/actions/workflows/quality.yml)
[![No dependencies](https://img.shields.io/badge/runtime_dependencies-0-1f654d?style=flat-square)](./package.json)
[![License](https://img.shields.io/badge/code_license-MIT-c38a33?style=flat-square)](./LICENSE)

[View the site](https://nischhalsubba.github.io/rismfp-ui/) · [Browse the source](./index.html) · [Run locally](#run-locally) · [Review the architecture](#architecture)

</div>

![RISMFP interface preview](./assets/images/banner-farming.jpg)

> [!IMPORTANT]
> This is an independent frontend case study and historical interface archive. It is not an official Government of Nepal, RISMFP, or Asian Development Bank service.

## Contents

- [Overview](#overview)
- [What the site includes](#what-the-site-includes)
- [Pages](#pages)
- [Architecture](#architecture)
- [Design system](#design-system)
- [Interactions](#interactions)
- [Accessibility](#accessibility)
- [Run locally](#run-locally)
- [Quality checks](#quality-checks)
- [GitHub Pages deployment](#github-pages-deployment)
- [Historical content and asset use](#historical-content-and-asset-use)
- [License](#license)

## Overview

The repository started in 2019 as a static frontend exercise built with Bootstrap, jQuery, Gulp, Sass, Owl Carousel, and Scroll-Out. The current version keeps the strongest project material and selected original assets while replacing the old implementation with readable HTML, CSS, and JavaScript that publish directly to GitHub Pages.

The rebuild focuses on three practical goals:

1. Preserve the original RISMFP identity and documentary material.
2. Make the project information easier to read and navigate.
3. Keep the source small enough to understand without a framework or build tool.

## What the site includes

| Area | Implementation |
|---|---|
| Shared interface | Header and footer built as native Web Components |
| Project content | Overview, programme context, beneficiaries, interventions, and historical figures |
| Web MIS | Explanation of the monitoring, evaluation, and knowledge-management concept |
| News and reports | Client-side search and category filters with clear unavailable-file states |
| Responsive behaviour | Desktop navigation, mobile menu, flexible content grids, and readable archive layouts |
| Accessibility | Semantic landmarks, keyboard navigation, focus styles, reduced-motion support, and image alternative text |
| Hosting | Repository-relative URLs and `.nojekyll` for direct GitHub Pages publishing |
| Runtime | Plain HTML, CSS, and JavaScript with no external runtime dependency |

## Pages

| Page | Purpose |
|---|---|
| [`index.html`](./index.html) | Project entry point, historical figures, navigation, and original field imagery |
| [`introduction.html`](./introduction.html) | Programme context, approach, beneficiaries, and intended outcomes |
| [`web-based-mis.html`](./web-based-mis.html) | Monitoring, evaluation, reporting, and knowledge-management overview |
| [`news.html`](./news.html) | Searchable archive of retained notice titles |
| [`download.html`](./download.html) | Searchable reports and forms archive |
| [`contact.html`](./contact.html) | Historical office details with archive warnings |
| [`404.html`](./404.html) | Custom missing-page response |

## Architecture

```text
.
├── .github/
│   └── workflows/
│       └── quality.yml
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   ├── logo.svg
│   │   └── selected original project photographs
│   └── js/
│       └── app.js
├── scripts/
│   └── validate.mjs
├── 404.html
├── contact.html
├── download.html
├── index.html
├── introduction.html
├── news.html
├── web-based-mis.html
├── package.json
└── README.md
```

<details>
<summary><strong>Why native Web Components?</strong></summary>

The header and footer appear on every page. Defining them once in `assets/js/app.js` avoids copying large navigation and footer blocks while keeping the site compatible with static hosting.

The custom elements are progressive enhancements. Page content remains ordinary semantic HTML, and the JavaScript layer is limited to shared chrome, mobile navigation, reveal behaviour, and archive filtering.

</details>

<details>
<summary><strong>Why no framework or build step?</strong></summary>

The site contains a small set of static pages and interactions. A framework would add installation, bundling, dependency maintenance, and deployment complexity without solving a problem the platform actually has.

The source can be opened directly, served with any basic HTTP server, and deployed from the repository root.

</details>

## Design system

The visual system is intentionally restrained so the original project photography and information carry the page.

| Token | Role |
|---|---|
| Deep agricultural green | Header notices, primary actions, system cards, and footer |
| Warm neutral canvas | Supporting sections and unavailable-file states |
| Muted green-grey | Secondary information and metadata |
| Gold accent | Focus rings, section markers, and archive details |
| Unified sans-serif type | Navigation, headings, body copy, statistics, and controls |

Typography uses a system-first sans-serif stack. This keeps the interface visually consistent, avoids an external font request, and prevents the headings from feeling disconnected from the rest of the content.

## Interactions

### Responsive navigation

The shared header exposes a menu button on smaller screens. The button updates `aria-expanded`, controls the navigation state, and closes after a navigation item is selected.

### Archive filters

The news and reports pages support:

- text search;
- category filters;
- live result counts;
- an empty state when no records match;
- content that remains visible when JavaScript is unavailable.

### Motion

Reveal effects are deliberately subtle and are disabled for visitors who use `prefers-reduced-motion`.

## Accessibility

The implementation includes:

- one page-level `<h1>` per document;
- semantic `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` landmarks;
- a skip link for keyboard users;
- visible `:focus-visible` treatment;
- descriptive image alternative text;
- active-page navigation through `aria-current="page"`;
- properly labelled archive controls;
- responsive layouts that do not require horizontal scrolling;
- reduced-motion handling.

## Run locally

No package installation is required.

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser.

The npm scripts are convenience aliases rather than a dependency requirement:

```bash
npm run serve
npm run check
```

## Quality checks

The repository includes a dependency-free validation script and a GitHub Actions workflow.

```bash
npm run check
```

The checks cover:

- JavaScript syntax;
- required page metadata and document landmarks;
- one page-level heading and structural comments;
- local page and asset references;
- image alternative text;
- placeholder URLs and inline styles;
- readable, non-compressed CSS and JavaScript;
- documentation for JavaScript functions;
- phrases intentionally excluded from public-facing copy.

The workflow runs automatically for pushes and pull requests.

## GitHub Pages deployment

The site publishes from the repository root and uses relative page and asset paths so it works under the `/rismfp-ui/` project URL.

1. Open the repository settings.
2. Go to **Pages**.
3. Choose **Deploy from a branch**.
4. Select the `master` branch and `/ (root)` folder.
5. Save the configuration.

The `.nojekyll` file prevents GitHub Pages from applying Jekyll processing.

## Historical content and asset use

Names, figures, notices, office details, and project descriptions come from the earlier repository and may be outdated. Missing report files are labelled unavailable instead of being connected to placeholder download links.

The original RISMFP logo and selected project photographs are retained for historical and case-study context. They are not covered by the MIT license granted to the frontend source code.

## License

The frontend code is available under the [MIT License](./LICENSE).

Historical logos, photographs, names, and project material remain attributable to their original owners.
