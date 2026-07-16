# RISMFP UI · 2026 redesign

A dependency-free, accessible static redesign of the historical **Raising Incomes of Small and Medium Farmers Project (RISMFP)** website.

> This repository is an independent portfolio and frontend demonstration. It is not an official Government of Nepal, RISMFP, or Asian Development Bank service.

## What changed

- Replaced Bootstrap 4, jQuery, Gulp, Owl Carousel, Scroll-Out, Font Awesome, and legacy SCSS output.
- Rebuilt every public page with semantic HTML, modern CSS, and a small ES module.
- Added responsive navigation, archive search/filtering, honest unavailable-document states, accessible focus styles, reduced-motion support, and a custom 404 page.
- Preserved historical content while clearly separating it from current or official information.
- Kept deployment fully compatible with GitHub Pages.

## Architecture

```text
.
├── index.html
├── introduction.html
├── web-based-mis.html
├── news.html
├── download.html
├── contact.html
├── 404.html
└── assets
    ├── css/style.css
    └── js/app.js
```

The site uses native Web Components for the shared header and footer. Pages remain readable if JavaScript fails; filtering and mobile navigation are progressive enhancements.

## Local development

No build step is required.

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Deployment

GitHub Pages can publish directly from the repository root. The `.nojekyll` file prevents Jekyll processing.

## Design direction

The interface combines public-service clarity with a contemporary editorial system:

- dark agricultural green, warm neutral surfaces, and a restrained lime accent
- Manrope display typography with DM Sans body copy
- content-first hierarchy and generous spacing
- explicit archive/disclaimer messaging
- WCAG-conscious contrast, focus, semantics, and motion

## License

MIT for the code in this repository. Historical names and content remain attributable to their original organisations and are included only for archival design context.
