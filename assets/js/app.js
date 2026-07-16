/**
 * Shared navigation items used by the header component.
 * Each item contains the file path, visible label, and page identifier.
 */
const navigationItems = [
  { href: 'index.html', label: 'Home', page: 'home' },
  { href: 'introduction.html', label: 'Project', page: 'project' },
  { href: 'web-based-mis.html', label: 'Web MIS', page: 'mis' },
  { href: 'news.html', label: 'News', page: 'news' },
  { href: 'download.html', label: 'Reports', page: 'reports' },
  { href: 'contact.html', label: 'Contact', page: 'contact' },
];

/**
 * Returns the current page identifier from the body element.
 * @returns {string} Current page identifier or an empty string.
 */
function getCurrentPage() {
  return document.body.dataset.page || '';
}

/**
 * Builds the primary navigation list and marks the active route.
 * @returns {string} Navigation list markup.
 */
function createNavigationMarkup() {
  const currentPage = getCurrentPage();

  return navigationItems
    .map(({ href, label, page }) => {
      const currentAttribute = currentPage === page ? ' aria-current="page"' : '';
      return `<li><a href="./${href}"${currentAttribute}>${label}</a></li>`;
    })
    .join('');
}

/**
 * Creates the shared archive notice and responsive site header.
 * @returns {string} Header component markup.
 */
function createHeaderMarkup() {
  return `
    <div class="archive-notice" role="note">
      <div class="shell archive-notice__inner">
        <strong>Historical interface archive</strong>
        <span>This independent frontend project is not an official or active RISMFP service.</span>
      </div>
    </div>

    <header class="site-header">
      <div class="shell site-header__inner">
        <a class="site-brand" href="./index.html" aria-label="RISMFP archive home">
          <img src="./assets/images/logo.svg" width="72" height="61" alt="RISMFP project logo">
          <span class="site-brand__text">
            <strong>RISMFP</strong>
            <small>Project information archive</small>
          </span>
        </a>

        <div class="header-tools">
          <nav id="primary-navigation" class="primary-navigation" aria-label="Primary navigation">
            <ul>${createNavigationMarkup()}</ul>
          </nav>

          <a class="header-cta" href="./download.html">View documents</a>

          <button class="menu-button" type="button" aria-expanded="false" aria-controls="primary-navigation">
            <span class="menu-button__label">Menu</span>
            <span class="menu-button__icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </header>
  `;
}

/**
 * Creates the shared footer call-to-action, navigation, and attribution.
 * @returns {string} Footer component markup.
 */
function createFooterMarkup() {
  return `
    <footer class="site-footer">
      <div class="shell footer-cta">
        <div>
          <p class="eyebrow">Continue exploring</p>
          <h2>Read the project record from context to implementation.</h2>
        </div>
        <div class="footer-cta__actions">
          <a class="button button--primary" href="./introduction.html">Open project overview</a>
        </div>
      </div>

      <div class="site-footer__body">
        <div class="shell site-footer__grid">
          <div class="site-footer__about">
            <a class="site-brand site-brand--footer" href="./index.html">
              <img src="./assets/images/logo.svg" width="72" height="61" alt="">
              <span class="site-brand__text">
                <strong>RISMFP</strong>
                <small>Historical project interface</small>
              </span>
            </a>
            <p>This repository preserves and reorganises material from the former RISMFP website as an independent frontend case study.</p>
          </div>

          <div class="site-footer__links">
            <h2>Explore</h2>
            <a href="./introduction.html">Project overview</a>
            <a href="./web-based-mis.html">Web MIS</a>
            <a href="./news.html">News archive</a>
            <a href="./download.html">Reports archive</a>
          </div>

          <div class="site-footer__links">
            <h2>Repository</h2>
            <a href="https://github.com/Nischhalsubba/rismfp-ui">Source code</a>
            <a href="./llms.txt">Archive notice</a>
          </div>
        </div>

        <div class="shell site-footer__bottom">
          <span>© <span data-current-year></span> Nischhal Raj Subba</span>
          <span>Static site hosted with GitHub Pages</span>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Opens or closes the mobile navigation and updates accessible state.
 * @param {HTMLButtonElement} button Menu trigger button.
 * @param {HTMLElement} navigation Controlled navigation element.
 * @param {boolean} shouldOpen Whether the menu should be open.
 */
function setMenuState(button, navigation, shouldOpen) {
  button.setAttribute('aria-expanded', String(shouldOpen));
  navigation.toggleAttribute('data-open', shouldOpen);
  const label = button.querySelector('.menu-button__label');
  if (label) label.textContent = shouldOpen ? 'Close' : 'Menu';
}

/**
 * Adds mobile navigation behaviour to the shared header.
 * @param {HTMLElement} root Rendered header component.
 */
function initialiseMobileNavigation(root) {
  const button = root.querySelector('.menu-button');
  const navigation = root.querySelector('.primary-navigation');

  if (!(button instanceof HTMLButtonElement) || !(navigation instanceof HTMLElement)) return;

  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    setMenuState(button, navigation, !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) {
      setMenuState(button, navigation, false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setMenuState(button, navigation, false);
      button.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 960) setMenuState(button, navigation, false);
  });
}

/** Shared custom element that renders the archive notice and site header. */
class SiteHeader extends HTMLElement {
  /** Renders the component when connected to the document. */
  connectedCallback() {
    this.innerHTML = createHeaderMarkup();
    initialiseMobileNavigation(this);
  }
}

/** Shared custom element that renders the site footer. */
class SiteFooter extends HTMLElement {
  /** Renders the component when connected to the document. */
  connectedCallback() {
    this.innerHTML = createFooterMarkup();
  }
}

/** Registers shared custom elements once. */
function registerSharedComponents() {
  if (!customElements.get('site-header')) customElements.define('site-header', SiteHeader);
  if (!customElements.get('site-footer')) customElements.define('site-footer', SiteFooter);
}

/** Updates every current-year placeholder after the footer is rendered. */
function updateCurrentYear() {
  const currentYear = String(new Date().getFullYear());
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = currentYear;
  });
}

/**
 * Reveals decorative sections as they enter the viewport.
 * Visitors requesting reduced motion see all content immediately.
 */
function initialiseRevealMotion() {
  const elements = [...document.querySelectorAll('.reveal')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 },
  );

  elements.forEach((element) => observer.observe(element));
}

/**
 * Filters one archive list by its search term and selected category.
 * @param {HTMLElement} root Archive section owning controls and items.
 */
function initialiseArchiveFilter(root) {
  const input = root.querySelector('[data-filter-input]');
  const buttons = [...root.querySelectorAll('[data-filter-button]')];
  const items = [...root.querySelectorAll('[data-filter-item]')];
  const resultCount = root.querySelector('[data-result-count]');
  const emptyState = root.querySelector('[data-filter-empty]');
  let selectedCategory = 'all';

  /** Applies the current search term and category to every archive item. */
  function updateResults() {
    const searchTerm = input instanceof HTMLInputElement ? input.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    items.forEach((item) => {
      if (!(item instanceof HTMLElement)) return;
      const searchableText = `${item.dataset.search || ''} ${item.textContent || ''}`.toLowerCase();
      const matchesCategory = selectedCategory === 'all' || item.dataset.category === selectedCategory;
      const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
      item.hidden = !(matchesCategory && matchesSearch);
      if (!item.hidden) visibleCount += 1;
    });

    if (resultCount) resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'item' : 'items'}`;
    if (emptyState instanceof HTMLElement) emptyState.hidden = visibleCount > 0;
  }

  input?.addEventListener('input', updateResults);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!(button instanceof HTMLElement)) return;
      selectedCategory = button.dataset.filterButton || 'all';
      buttons.forEach((candidate) => {
        candidate.setAttribute('aria-pressed', String(candidate === button));
      });
      updateResults();
    });
  });

  updateResults();
}

/** Initialises every archive filter found on the current page. */
function initialiseArchiveFilters() {
  document.querySelectorAll('[data-filter-root]').forEach((root) => {
    if (root instanceof HTMLElement) initialiseArchiveFilter(root);
  });
}

/** Starts all shared site behaviour after the module loads. */
function initialiseSite() {
  registerSharedComponents();
  updateCurrentYear();
  initialiseRevealMotion();
  initialiseArchiveFilters();
}

initialiseSite();
