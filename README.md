<!-- interactive-readme-standard:start -->

<div align="center">

# rismfp-ui

**Branch-aware technical guide for [`agent/fix-hero-cutouts-and-qa`](https://github.com/Nischhalsubba/rismfp-ui/tree/agent/fix-hero-cutouts-and-qa)**

<p><img alt="branch: agent/fix-hero-cutouts-and-qa" src="https://img.shields.io/static/v1?label=&message=branch%3A%20agent%2Ffix-hero-cutouts-and-qa&color=5965F2&style=flat-square"> <img alt="HTML" src="https://img.shields.io/static/v1?label=&message=HTML&color=24292F&style=flat-square"> <img alt="JavaScript" src="https://img.shields.io/static/v1?label=&message=JavaScript&color=24292F&style=flat-square"> <img alt="CSS" src="https://img.shields.io/static/v1?label=&message=CSS&color=24292F&style=flat-square"> <img alt="license detected" src="https://img.shields.io/static/v1?label=&message=license%20detected&color=2DA44E&style=flat-square"> <img alt="docs: branch-aware" src="https://img.shields.io/static/v1?label=&message=docs%3A%20branch-aware&color=8250DF&style=flat-square"></p>

<p>
  <a href="https://github.com/Nischhalsubba/rismfp-ui/tree/agent/fix-hero-cutouts-and-qa"><strong>Browse source</strong></a> ·
  <a href="https://github.com/Nischhalsubba/rismfp-ui/issues"><strong>Issues</strong></a> ·
  <a href="https://github.com/Nischhalsubba/rismfp-ui/codespaces/new?ref=agent%2Ffix-hero-cutouts-and-qa"><strong>Open in Codespaces</strong></a>
</p>

</div>

> [!IMPORTANT]
> This guide is generated from the files actually present on `agent/fix-hero-cutouts-and-qa`. It links to detected source paths, preserves project-authored notes, and avoids claiming components that were not found.

## At a glance

| Item | Detected value |
|---|---|
| Purpose | Static historical interface for the Raising Incomes of Small and Medium Farmers Project. |
| Branch role | Compared with `master` |
| Stack | HTML, JavaScript, CSS |
| Manifests | package.json |
| Prerequisites | Node.js |
| Delivery | GitHub Actions |
| License | LICENSE |

## Branch scope

This branch differs from the default branch in the following detected paths:

- [`README.md`](https://github.com/Nischhalsubba/rismfp-ui/blob/agent/fix-hero-cutouts-and-qa/README.md)

## Quick start

```bash
npm install
```

### Configuration surface

- No committed environment example file was detected.

> Never commit secrets, private keys, production credentials, customer data, or unredacted infrastructure details.

## Repository map

```mermaid
flowchart TD
    ROOT["rismfp-ui / agent/fix-hero-cutouts-and-qa"]
    ROOT --> P0[".github/"]
    ROOT --> P1["assets/"]
    ROOT --> P2["scripts/"]
    ROOT --> P3[".nojekyll"]
    ROOT --> P4["404.html"]
    ROOT --> P5["contact.html"]
    ROOT --> P6["download.html"]
    ROOT --> P7["index.html"]
    ROOT --> P8["introduction.html"]
    ROOT --> P9["LICENSE"]
    ROOT --> P10["llms.txt"]
    ROOT --> P11["news.html"]
    ROOT --> P12["package.json"]
    ROOT --> P13["robots.txt"]
    ROOT --> P14["site.webmanifest"]
    ROOT --> P15["web-based-mis.html"]
```

| Responsibility | Detected source paths |
|---|---|
| Delivery | [`.github`](https://github.com/Nischhalsubba/rismfp-ui/tree/agent/fix-hero-cutouts-and-qa/.github), [`scripts`](https://github.com/Nischhalsubba/rismfp-ui/tree/agent/fix-hero-cutouts-and-qa/scripts) |

## Website or application map

```mermaid
flowchart TD
    APP["rismfp-ui"]
    APP --> SOURCE["No conventional route directory detected"]
    SOURCE --> GUIDE["Use the repository and architecture maps below"]
```

## Architecture and responsibility flow

```mermaid
flowchart LR
    USER["User / contributor"]
    USER --> A0["Delivery: .github, scripts"]
    A0 --> DELIVERY["Delivery: GitHub Actions"]
```



## Quality, security, and operations

<table>
<tr>
<td width="33%" valign="top">

### Quality

- No conventional test directory was detected automatically.

Detected commands:
- No standard quality command detected.

</td>
<td width="33%" valign="top">

### Security

- No dedicated security policy or automated dependency configuration was detected.

Review authentication, authorization, input validation, dependency updates, secret handling, and failure recovery before release.

</td>
<td width="34%" valign="top">

### Observability

- No dedicated observability integration was detected automatically.

Define useful logs, metrics, traces, alerts, and rollback signals for production-facing branches.

</td>
</tr>
</table>

## Delivery flow

```mermaid
flowchart LR
    CHANGE["Change on agent/fix-hero-cutouts-and-qa"] --> CHECK["Tests and quality checks"]
    CHECK --> REVIEW["Review architecture and documentation impact"]
    REVIEW --> BUILD["Build or package"]
    BUILD --> DEPLOY["Deploy or release"]
    DEPLOY --> VERIFY["Verify health and rollback readiness"]
```

### Automation detected

- [`.github/workflows/quality.yml`](https://github.com/Nischhalsubba/rismfp-ui/blob/agent/fix-hero-cutouts-and-qa/.github/workflows/quality.yml)

## Contribution flow

```mermaid
flowchart LR
    FORK["Create branch"] --> CHANGE["Make focused change"]
    CHANGE --> TEST["Run relevant checks"]
    TEST --> DOCS["Update README and diagrams"]
    DOCS --> PR["Open pull request"]
    PR --> REVIEW["Review and iterate"]
    REVIEW --> MERGE["Merge when ready"]
```

- Keep changes focused and explain architectural consequences.
- Run the checks relevant to the changed area.
- Update diagrams whenever routes, modules, data models, authentication, jobs, or delivery paths change.
- Add screenshots or recordings for visual behavior changes when useful.
- Use issues for reproducible defects and pull requests for reviewable changes.

## Ownership and support

| Topic | Source |
|---|---|
| Repository | [`Nischhalsubba/rismfp-ui`](https://github.com/Nischhalsubba/rismfp-ui) |
| Branch | [`agent/fix-hero-cutouts-and-qa`](https://github.com/Nischhalsubba/rismfp-ui/tree/agent/fix-hero-cutouts-and-qa) |
| Ownership | No CODEOWNERS file detected |
| Contributing | Use the contribution flow above |
| Support | [Open or review issues](https://github.com/Nischhalsubba/rismfp-ui/issues) |
| License | [`LICENSE`](https://github.com/Nischhalsubba/rismfp-ui/blob/agent/fix-hero-cutouts-and-qa/LICENSE) |

<details>
<summary><strong>Documentation maintenance checklist</strong></summary>

- [ ] Purpose and branch scope are accurate.
- [ ] Setup and configuration commands still work.
- [ ] Repository, application, API, data, authentication, job, and deployment diagrams match the code.
- [ ] Tests, security controls, observability, and rollback behavior are documented.
- [ ] Links point to real files on this branch.
- [ ] No secrets or private operational details are exposed.

</details>

<!-- interactive-readme-standard:end -->

<!-- project-authored-notes:start -->
<details>
<summary><strong>Project-authored notes preserved from this branch</strong></summary>

<div align="center">

<img src="./assets/images/logo.svg" width="96" alt="RISMFP logo">

# RISMFP UI

A responsive reconstruction of the historical **Raising Incomes of Small and Medium Farmers Project** website.

[![Live site](https://img.shields.io/badge/Live_site-GitHub_Pages-103f31?style=flat-square)](https://nischhalsubba.github.io/rismfp-ui/)
[![Quality checks](https://img.shields.io/github/actions/workflow/status/Nischhalsubba/rismfp-ui/quality.yml?branch=master&style=flat-square&label=quality)](https://github.com/Nischhalsubba/rismfp-ui/actions/workflows/quality.yml)
[![Runtime dependencies](https://img.shields.io/badge/runtime_dependencies-0-245f4a?style=flat-square)](./package.json)
[![License](https://img.shields.io/badge/code_license-MIT-f2a94a?style=flat-square)](./LICENSE)

[View the site](https://nischhalsubba.github.io/rismfp-ui/) · [Browse the source](./index.html) · [Run locally](#run-locally) · [Review the architecture](#architecture)

</div>

![RISMFP field project preview](./assets/images/banner-farming.jpg)

> [!IMPORTANT]
> This is an independent frontend case study and historical interface archive. It is not an official Government of Nepal, RISMFP, or Asian Development Bank service.

## Contents

- [Overview](#overview)
- [Experience](#experience)
- [Pages](#pages)
- [Architecture](#architecture)
- [Design system](#design-system)
- [Interactions](#interactions)
- [Accessibility](#accessibility)
- [Run locally](#run-locally)
- [Quality checks](#quality-checks)
- [Deployment](#deployment)
- [Historical content](#historical-content)

## Overview

The repository started in 2019 as a frontend exercise built with Bootstrap, jQuery, Gulp, Sass, Owl Carousel, and Scroll-Out. The current implementation preserves the original project identity and selected field photography while replacing the old stack with readable HTML, CSS, and JavaScript that publish directly through GitHub Pages.

The rebuild has three goals:

1. Preserve useful historical project material and original assets.
2. Make programme information, notices, and reports easier to navigate.
3. Keep the implementation understandable without a framework or build pipeline.

## Experience

| Area | Implementation |
|---|---|
| Homepage | Split editorial hero, original field image, historical metric cards, and asymmetric navigation panels |
| Project pages | Image-led page introductions and long-form editorial content layouts |
| Web MIS | Structured process cards, system capabilities, and an information-flow sequence |
| News and reports | Search, category filters, live result counts, empty states, and clear unavailable-file labels |
| Contact | Historical office cards with a prominent verification warning |
| Shared interface | Responsive header and footer rendered with native Web Components |
| Hosting | Repository-relative routes and `.nojekyll` for direct GitHub Pages deployment |

## Pages

| Page | Purpose |
|---|---|
| [`index.html`](./index.html) | Project entry point, historical figures, archive pathways, and original field imagery |
| [`introduction.html`](./introduction.html) | Programme context, farmer constraints, project approach, beneficiaries, and intended outcomes |
| [`web-based-mis.html`](./web-based-mis.html) | Monitoring, evaluation, reporting, and knowledge-management overview |
| [`news.html`](./news.html) | Searchable archive of retained historical notices |
| [`download.html`](./download.html) | Searchable archive of report, form, and manual titles |
| [`contact.html`](./contact.html) | Historical office details with explicit archive warnings |
| [`404.html`](./404.html) | Custom missing-page response and recovery route |

## Architecture

```text
.
├── .github/
│   └── workflows/quality.yml
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── agri-theme.css
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

The header and footer appear on every page. Defining them once in `assets/js/app.js` avoids copying large navigation blocks while preserving direct static hosting. The page content itself remains ordinary semantic HTML.

</details>

<details>
<summary><strong>Why keep the site framework-free?</strong></summary>

The project consists of a focused set of content pages and lightweight interactions. A framework would add installation, bundling, dependency updates, and deployment complexity without improving the visitor experience.

</details>

## Design system

The interface uses a contemporary agricultural editorial system built around original project photography and historical information.

| Token | Role |
|---|---|
| Deep forest green | Navigation state, primary actions, metrics, process flows, and footer |
| Warm cream | Main page canvas and quieter content areas |
| Lime | High-emphasis panels, metrics, and calls to action |
| Soft mint | Supporting cards, tags, and low-emphasis states |
| Amber | Small visual markers and focus treatment |
| Manrope | Headings, navigation, body copy, controls, and statistics |

The typeface is loaded from Google Fonts with a system sans-serif fallback. Layouts use large but controlled headings, generous section spacing, asymmetric card proportions, and rounded image containers. All important content remains readable if the font request fails.

## Interactions

### Responsive navigation

The shared header exposes a menu button on smaller screens. The button updates `aria-expanded`, controls the navigation state, closes after route selection, and supports the Escape key.

### Archive filtering

The news and reports pages include:

- text search;
- category filtering;
- live result counts;
- a dedicated empty state;
- content that remains present when JavaScript is unavailable.

### Reveal motion

Selected homepage sections use Intersection Observer for subtle entrance motion. Visitors using `prefers-reduced-motion` receive the content immediately without animation.

## Accessibility

The implementation includes:

- one page-level `<h1>` per document;
- semantic page landmarks;
- keyboard-accessible navigation and controls;
- a skip link;
- visible focus treatment;
- descriptive image alternative text;
- `aria-current` for active navigation;
- live archive result counts;
- responsive layouts without intentional horizontal scrolling;
- reduced-motion handling.

## Run locally

No package installation is required.

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

Convenience commands are also available:

```bash
npm run serve
npm run check
```

## Quality checks

The repository includes a dependency-free validator and GitHub Actions workflow.

```bash
npm run check
```

The checks cover JavaScript syntax, required metadata, document landmarks, structural comments, local references, image alternative text, placeholder URLs, inline styles, readable source formatting, and JavaScript function documentation.

## Deployment

The site publishes from the repository root and uses relative page and asset paths so it works under the `/rismfp-ui/` GitHub Pages project path.

1. Open repository **Settings**.
2. Choose **Pages**.
3. Select **Deploy from a branch**.
4. Select `master` and `/ (root)`.
5. Save the configuration.

The `.nojekyll` file prevents Jekyll processing.

## Historical content

Names, figures, notices, office details, and project descriptions come from the earlier repository and may be outdated. Missing report files are labelled unavailable rather than linked to placeholder downloads.

The original RISMFP logo and selected project photographs are retained for historical and case-study context. They are not covered by the MIT licence granted to the frontend source code.

## License

The frontend code is available under the [MIT License](./LICENSE). Historical logos, photographs, names, and project material remain attributable to their original owners.

</details>
<!-- project-authored-notes:end -->
