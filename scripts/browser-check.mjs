import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const origin = 'http://127.0.0.1:4173';
const pages = ['index.html', 'introduction.html', 'web-based-mis.html', 'news.html', 'download.html', 'contact.html', '404.html'];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'mobile', width: 390, height: 844 },
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${origin}/index.html`);
      if (response.ok) return;
    } catch {
      // The server may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Static test server did not start.');
}

async function checkPage(browser, path, viewport) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto(`${origin}/${path}`, { waitUntil: 'networkidle' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert(overflow <= 1, `${path} overflows horizontally by ${overflow}px at ${viewport.width}px.`);
  assert(errors.length === 0, `${path} emitted browser errors: ${errors.join(' | ')}`);
  await page.close();
}

async function checkComputedStyles(browser) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${origin}/index.html`, { waitUntil: 'networkidle' });
  const styles = await page.evaluate(() => ({
    source: getComputedStyle(document.querySelector('.source-note > span')).color,
    footerHeading: getComputedStyle(document.querySelector('.site-footer__links h2')).color,
    footerText: getComputedStyle(document.querySelector('.site-footer__about p')).color,
  }));
  assert(styles.source === 'rgb(51, 66, 59)', `Unexpected provenance color: ${styles.source}`);
  assert(styles.footerHeading === 'rgb(13, 59, 46)', `Unexpected footer heading color: ${styles.footerHeading}`);
  assert(styles.footerText === 'rgb(67, 81, 73)', `Unexpected footer text color: ${styles.footerText}`);
  await page.close();
}

async function checkMobileMenu(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 640 } });
  await page.goto(`${origin}/index.html`, { waitUntil: 'networkidle' });
  await page.locator('.menu-button').click();
  const bounds = await page.locator('.primary-navigation').boundingBox();
  assert(bounds && bounds.y + bounds.height <= 641, 'Mobile navigation extends below the viewport.');
  await page.keyboard.press('Escape');
  assert(await page.locator('.menu-button').getAttribute('aria-expanded') === 'false', 'Escape did not close the mobile menu.');
  await page.close();
}

async function checkFlowchart(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${origin}/web-based-mis.html`, { waitUntil: 'networkidle' });
  assert(await page.title() === 'RISMFP Web MIS Architecture | Nepal Agriculture Project Monitoring', 'Web MIS title is not static and final.');
  assert(await page.locator('[role="application"]').count() === 0, 'Flowchart still uses role="application".');
  assert(await page.getByRole('button', { name: 'Fit diagram' }).count() === 1, 'Fit diagram control is missing.');
  const transform = await page.locator('[data-flowchart-scene]').getAttribute('transform');
  const scale = Number(transform?.match(/scale\(([^)]+)\)/)?.[1]);
  assert(Number.isFinite(scale) && scale < 1, `Mobile flowchart is not fitted: ${transform}`);
  const before = await page.evaluate(() => window.scrollY);
  await page.locator('[data-flowchart-viewport]').hover();
  await page.mouse.wheel(0, 420);
  const after = await page.evaluate(() => window.scrollY);
  assert(after > before, 'Ordinary wheel scrolling is trapped by the flowchart.');
  await page.close();
}

async function checkContactSafety(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${origin}/contact.html`, { waitUntil: 'networkidle' });
  assert(await page.locator('a[href^="tel:"], a[href^="mailto:"]').count() === 0, 'Historical contact channels remain directly actionable.');
  await page.close();
}

const server = spawn('python3', ['-m', 'http.server', '4173', '--bind', '127.0.0.1'], { stdio: 'ignore' });
let browser;

try {
  await waitForServer();
  browser = await chromium.launch({ headless: true });
  for (const viewport of viewports) {
    for (const path of pages) await checkPage(browser, path, viewport);
  }
  await checkComputedStyles(browser);
  await checkMobileMenu(browser);
  await checkFlowchart(browser);
  await checkContactSafety(browser);
  console.log(`Browser QA passed for ${pages.length} pages across ${viewports.length} viewports.`);
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}