/** Loads the sitewide contrast stylesheet once on every published route. */
function loadContrastStyles() {
  if (document.querySelector('link[data-seo-contrast]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './assets/css/seo-contrast.css';
  link.dataset.seoContrast = '';
  document.head.append(link);
}

/** Replaces remaining Web MIS labels with descriptive, search-friendly copy. */
function applyWebMisMicrocopy() {
  if (document.body.dataset.page !== 'mis') return;

  document.title = 'RISMFP Web MIS Architecture | Nepal Agriculture Project Monitoring';
  const description = 'Explore the historical RISMFP Web MIS architecture for Nepal agriculture project monitoring, field reporting, management review and knowledge management.';
  const descriptionMeta = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (descriptionMeta) descriptionMeta.setAttribute('content', description);
  if (ogTitle) ogTitle.setAttribute('content', 'RISMFP Web MIS Architecture | Nepal Agriculture Project Monitoring');
  if (ogDescription) ogDescription.setAttribute('content', description);

  const eyebrow = document.querySelector('.page-hero--mis .eyebrow');
  const titleBase = document.querySelector('.page-hero--mis .page-hero__title-base');
  const titleCutout = document.querySelector('.page-hero--mis .page-hero__title-cutout');
  const lede = document.querySelector('.page-hero--mis .lede');
  if (eyebrow) eyebrow.textContent = 'RISMFP project monitoring system';
  if (titleBase) titleBase.textContent = 'Web MIS architecture for';
  if (titleCutout) titleCutout.textContent = 'field reporting and management review.';
  if (lede) lede.textContent = 'Explore how the historical RISMFP Web MIS was intended to organise field activities, financial records, monitoring indicators, management decisions and project knowledge.';

  const nextEyebrow = document.querySelector('.footer-next .eyebrow');
  const nextHeading = document.querySelector('.footer-next h2');
  const nextLink = document.querySelector('.footer-next a');
  if (nextEyebrow) nextEyebrow.textContent = 'Next: historical project records';
  if (nextHeading) nextHeading.textContent = 'Search RISMFP grant notices, progress updates and retained Nepali document titles.';
  if (nextLink) nextLink.textContent = 'Search the RISMFP notices archive';
}

/** Returns the current static navigation and its trigger. */
function getMenuElements() {
  return {
    button: document.querySelector('.menu-button'),
    navigation: document.querySelector('.primary-navigation'),
  };
}

/** Closes the mobile menu and restores page scrolling. */
function closeMenu() {
  const { button, navigation } = getMenuElements();
  if (!(button instanceof HTMLButtonElement) || !(navigation instanceof HTMLElement)) return;
  button.setAttribute('aria-expanded', 'false');
  navigation.removeAttribute('data-open');
  document.body.classList.remove('menu-open');
  const label = button.querySelector('.menu-button__label');
  if (label) label.textContent = 'Menu';
}

/** Adds reliable mobile-menu behavior to the static header. */
function initialiseStaticMenu() {
  const { button, navigation } = getMenuElements();
  if (!(button instanceof HTMLButtonElement) || !(navigation instanceof HTMLElement)) return;

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    navigation.toggleAttribute('data-open', open);
    document.body.classList.toggle('menu-open', open);
    const label = button.querySelector('.menu-button__label');
    if (label) label.textContent = open ? 'Close' : 'Menu';
  });

  navigation.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) closeMenu();
  });

  document.addEventListener('pointerdown', (event) => {
    if (button.getAttribute('aria-expanded') !== 'true') return;
    if (event.target instanceof Node && !navigation.contains(event.target) && !button.contains(event.target)) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      button.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 960) closeMenu();
  });
}

/** Updates static current-year placeholders. */
function updateStaticYear() {
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
}

/** Expands the project table of contents on desktop and collapses it on mobile. */
function initialiseResponsiveToc() {
  const toc = document.querySelector('[data-responsive-toc]');
  if (!(toc instanceof HTMLDetailsElement)) return;
  const media = window.matchMedia('(min-width: 961px)');
  const update = () => { toc.open = media.matches; };
  update();
  media.addEventListener('change', update);
}

/** Marks the currently visible project section in the table of contents. */
function initialiseTocTracking() {
  const links = [...document.querySelectorAll('.table-of-contents a[href^="#"]')];
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${visible.target.id}`;
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -65% 0px', threshold: [0.05, 0.25, 0.5] });

  sections.forEach((section) => observer.observe(section));
}

/** Reads archive search and category state from the current URL. */
function readArchiveState() {
  const params = new URLSearchParams(window.location.search);
  return { query: params.get('q') || '', category: params.get('type') || 'all', sort: params.get('sort') || 'newest' };
}

/** Stores archive controls in the URL without reloading the page. */
function writeArchiveState(query, category, sort) {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (category !== 'all') params.set('type', category);
  if (sort !== 'newest') params.set('sort', sort);
  const url = `${window.location.pathname}${params.size ? `?${params}` : ''}`;
  window.history.replaceState(null, '', url);
}

/** Returns a sorting comparator for archive records. */
function getRecordComparator(sort) {
  if (sort === 'oldest') return (a, b) => (a.dataset.date || '').localeCompare(b.dataset.date || '');
  if (sort === 'title') return (a, b) => (a.dataset.title || '').localeCompare(b.dataset.title || '', undefined, { sensitivity: 'base' });
  if (sort === 'category') return (a, b) => (a.dataset.category || '').localeCompare(b.dataset.category || '');
  return (a, b) => (b.dataset.date || '').localeCompare(a.dataset.date || '');
}

/** Applies search, category, sorting, result count, and URL persistence to one archive. */
function initialiseArchive(root) {
  const input = root.querySelector('[data-filter-input]');
  const clear = root.querySelector('[data-filter-clear]');
  const sortControl = root.querySelector('[data-filter-sort]');
  const buttons = [...root.querySelectorAll('[data-filter-button]')];
  const list = root.querySelector('[data-filter-list]');
  const items = [...root.querySelectorAll('[data-filter-item]')];
  const count = root.querySelector('[data-result-count]');
  const empty = root.querySelector('[data-filter-empty]');
  if (!(input instanceof HTMLInputElement) || !(list instanceof HTMLElement)) return;

  const initial = readArchiveState();
  let category = buttons.some((button) => button.dataset.filterButton === initial.category) ? initial.category : 'all';
  let sort = sortControl instanceof HTMLSelectElement ? initial.sort : 'newest';
  input.value = initial.query;
  if (sortControl instanceof HTMLSelectElement && [...sortControl.options].some((option) => option.value === sort)) sortControl.value = sort;

  /** Updates visible records from the active controls. */
  function update() {
    const query = input.value.trim().toLowerCase();
    let visible = 0;
    items.sort(getRecordComparator(sort)).forEach((item) => {
      const text = `${item.dataset.title || ''} ${item.textContent || ''}`.toLowerCase();
      const show = (!query || text.includes(query)) && (category === 'all' || item.dataset.category === category);
      item.hidden = !show;
      list.append(item);
      if (show) visible += 1;
    });
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filterButton === category)));
    if (count) count.textContent = `${visible} ${visible === 1 ? 'record' : 'records'}`;
    if (empty instanceof HTMLElement) empty.hidden = visible > 0;
    if (clear instanceof HTMLButtonElement) clear.hidden = !query;
    writeArchiveState(query, category, sort);
  }

  input.addEventListener('input', update);
  clear?.addEventListener('click', () => { input.value = ''; input.focus(); update(); });
  buttons.forEach((button) => button.addEventListener('click', () => { category = button.dataset.filterButton || 'all'; update(); }));
  sortControl?.addEventListener('change', () => { if (sortControl instanceof HTMLSelectElement) sort = sortControl.value; update(); });
  update();
}

/** Adds copy and research actions to unavailable archive records. */
function initialiseRecordActions() {
  document.querySelectorAll('[data-record-title]').forEach((record) => {
    if (!(record instanceof HTMLElement)) return;
    const title = record.dataset.recordTitle || record.querySelector('h2')?.textContent?.trim() || '';
    const copy = record.querySelector('[data-copy-title]');
    const official = record.querySelector('[data-search-official]');
    const archive = record.querySelector('[data-search-archive]');

    if (copy instanceof HTMLButtonElement && navigator.clipboard) {
      copy.hidden = false;
      copy.addEventListener('click', async () => {
        await navigator.clipboard.writeText(title);
        copy.textContent = 'Title copied';
        window.setTimeout(() => { copy.textContent = 'Copy document title'; }, 1400);
      });
    }
    if (official instanceof HTMLAnchorElement) official.href = `https://www.google.com/search?q=${encodeURIComponent(`site:gov.np RISMFP ${title}`)}`;
    if (archive instanceof HTMLAnchorElement) archive.href = 'https://web.archive.org/web/*/http://rismfp.gov.np/*';
  });
}

/** Starts all production QA enhancements after static HTML is available. */
function initialiseQaFixes() {
  loadContrastStyles();
  applyWebMisMicrocopy();
  initialiseStaticMenu();
  updateStaticYear();
  initialiseResponsiveToc();
  initialiseTocTracking();
  document.querySelectorAll('[data-filter-root]').forEach((root) => { if (root instanceof HTMLElement) initialiseArchive(root); });
  initialiseRecordActions();
}

initialiseQaFixes();
