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
 * The identifier is used to mark the active navigation link.
 *
 * @returns {string} The current page identifier, or an empty string.
 */
function getCurrentPage() {
  return document.body.dataset.page || '';
}

/**
 * Builds the primary navigation list from the shared navigation data.
 *
 * @returns {string} HTML for the navigation list.
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
 * Creates the complete shared header markup.
 * The original RISMFP logo is reused as the visual identity.
 *
 * @returns {string} HTML for the archive notice and site header.
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

        <button class="menu-button" type="button" aria-expanded="false" aria-controls="primary-navigation">
          <span class="menu-button__label">Menu</span>
          <span class="menu-button__icon" aria-hidden="true"></span>
        </button>

        <nav id="primary-navigation" class="primary-navigation" aria-label="Primary navigation">
          <ul>${createNavigationMarkup()}</ul>
        </nav>
      </div>
    </header>
  `;
}

/**
 * Creates the shared footer markup for every page.
 *
 * @returns {string} HTML for the site footer.
 */
function createFooterMarkup() {
  return `
    <footer class="site-footer">
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
    </footer>
  `;
}

/**
 * Opens or closes the mobile navigation and updates its accessible state.
 *
 * @param {HTMLButtonElement} button The menu trigger button.
 * @param {HTMLElement} navigation The navigation element being controlled.
 * @param {boolean} shouldOpen Whether the menu should be open.
 */
function setMenuState(button, navigation, shouldOpen) {
  button.setAttribute('aria-expanded', String(shouldOpen));
  navigation.toggleAttribute('data-open', shouldOpen);
  button.querySelector('.menu-button__label').textContent = shouldOpen ? 'Close' : 'Menu';
}

/**
 * Adds mobile navigation behaviour to the shared header.
 *
 * @param {HTMLElement} root The rendered header component.
 */
function initialiseMobileNavigation(root) {
  const button = root.querySelector('.menu-button');
  const navigation = root.querySelector('.primary-navigation');

  if (!button || !navigation) return;

  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    setMenuState(button, navigation, !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      setMenuState(button, navigation, false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuState(button, navigation, false);
      button.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 960) {
      setMenuState(button, navigation, false);
    }
  });
}

/**
 * Shared custom element that renders the archive notice and site header.
 */
class SiteHeader extends HTMLElement {
  /**
   * Renders the component when it is connected to the document.
   */
  connectedCallback() {
    this.innerHTML = createHeaderMarkup();
    initialiseMobileNavigation(this);
  }
}

/**
 * Shared custom element that renders the site footer.
 */
class SiteFooter extends HTMLElement {
  /**
   * Renders the component when it is connected to the document.
   */
  connectedCallback() {
    this.innerHTML = createFooterMarkup();
  }
}

/**
 * Registers the shared header and footer elements once.
 */
function registerSharedComponents() {
  if (!customElements.get('site-header')) {
    customElements.define('site-header', SiteHeader);
  }

  if (!customElements.get('site-footer')) {
    customElements.define('site-footer', SiteFooter);
  }
}

/**
 * Updates every current-year placeholder after the footer is rendered.
 */
function updateCurrentYear() {
  const currentYear = String(new Date().getFullYear());

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = currentYear;
  });
}

/**
 * Filters one archive list by its search term and selected category.
 *
 * @param {HTMLElement} root The archive section that owns the controls and items.
 */
function initialiseArchiveFilter(root) {
  const input = root.querySelector('[data-filter-input]');
  const buttons = [...root.querySelectorAll('[data-filter-button]')];
  const items = [...root.querySelectorAll('[data-filter-item]')];
  const resultCount = root.querySelector('[data-result-count]');
  const emptyState = root.querySelector('[data-filter-empty]');
  let selectedCategory = 'all';

  /**
   * Applies the current search term and category to every archive item.
   */
  function updateResults() {
    const searchTerm = (input?.value || '').trim().toLowerCase();
    let visibleCount = 0;

    items.forEach((item) => {
      const searchableText = `${item.dataset.search || ''} ${item.textContent}`.toLowerCase();
      const matchesCategory = selectedCategory === 'all' || item.dataset.category === selectedCategory;
      const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
      const shouldShow = matchesCategory && matchesSearch;

      item.hidden = !shouldShow;
      if (shouldShow) visibleCount += 1;
    });

    if (resultCount) {
      resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'item' : 'items'}`;
    }

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  }

  input?.addEventListener('input', updateResults);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedCategory = button.dataset.filterButton || 'all';

      buttons.forEach((candidate) => {
        candidate.setAttribute('aria-pressed', String(candidate === button));
      });

      updateResults();
    });
  });

  updateResults();
}

/**
 * Initialises every archive filter found on the current page.
 */
function initialiseArchiveFilters() {
  document.querySelectorAll('[data-filter-root]').forEach(initialiseArchiveFilter);
}

/**
 * Starts all shared site behaviour after the document has loaded.
 */
function initialiseSite() {
  registerSharedComponents();
  updateCurrentYear();
  initialiseArchiveFilters();
}

initialiseSite();
