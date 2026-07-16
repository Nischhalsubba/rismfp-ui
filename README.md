# RISMFP UI

A static rebuild of the historical Raising Incomes of Small and Medium Farmers Project website.

The repository began as a 2019 frontend exercise using Bootstrap, jQuery, Gulp, Sass, Owl Carousel, and Scroll-Out. The current version keeps the project material and selected original assets while replacing the old implementation with plain HTML, CSS, and JavaScript that can be hosted directly on GitHub Pages.

> This is an independent frontend case study. It is not an official Government of Nepal, RISMFP, or Asian Development Bank service.

## What is included

- responsive pages for the project overview, web MIS, news, reports, and historical contact details;
- the original RISMFP logo and selected field photographs from the earlier repository;
- shared header and footer Web Components;
- client-side search and category filters for archived notices and reports;
- keyboard navigation, visible focus styles, semantic landmarks, and reduced-motion support;
- no build step and no runtime dependency.

## Project structure

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
    ├── images/
    └── js/app.js
```

## Run locally

The site does not require package installation.

```bash
python -m http.server 8000
```

Open `http://localhost:8000` in a browser.

## Code comments

The HTML files include comments for the document structure and each major content section. The JavaScript file includes documentation for every function, method, and component. The CSS file is divided into labelled sections so future changes can be found without searching through compressed output.

Comments explain intent and behaviour rather than repeating obvious syntax. This keeps the source readable without filling every wrapper element with noise.

## GitHub Pages

The site is designed to publish from the repository root. Relative URLs are used for pages and assets so it works under the `/rismfp-ui/` project path.

## Historical content

Names, figures, notices, office details, and project descriptions come from the earlier repository and may be outdated. Missing report files are labelled unavailable rather than linked to placeholder URLs.

## License

The frontend code is available under the MIT License. Historical logos, photographs, names, and project material remain attributable to their original owners and are included for archival and case-study context.
