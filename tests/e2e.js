const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  let browser, page;
  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    await page.setViewport({ width: 1280, height: 800 });

    const delay = ms => new Promise(res => setTimeout(res, ms));

    // TEST A
    console.log('TEST A: Load Landing');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    const titleText = await page.$eval('h1', el => el.innerText);
    if (!titleText.includes('Know Before')) throw new Error('Hero not found');
    await page.screenshot({ path: 'testA_landing.png' });
    console.log('TEST A PASS');

    // TEST B
    console.log('TEST B: Click Get Started');
    await page.evaluate(() => {
      [...document.querySelectorAll('a')].find(a => a.innerText.includes('Get Started')).click();
    });
    await delay(1000);
    await page.screenshot({ path: 'testB_register.png' });
    console.log('TEST B PASS');

    // TEST C
    console.log('TEST C: Register');
    await page.type('input[type="email"]', 'ui-test' + Date.now() + '@sentinel.com');
    await page.type('input[type="password"]', 'test12345');
    await page.click('button[type="submit"]');
    await delay(2000);
    await page.waitForSelector('h1', { timeout: 10000 });
    const dashboardTitle = await page.evaluate(() => {
      return [...document.querySelectorAll('h1')].map(h => h.innerText).join(' ');
    });
    if (!dashboardTitle.includes('Good morning')) throw new Error('Dashboard not loaded');
    await page.screenshot({ path: 'testC_dashboard.png' });
    console.log('TEST C PASS');

    // TEST D
    console.log('TEST D: ThemeToggle');
    await page.evaluate(() => {
      [...document.querySelectorAll('button')].find(b => b.innerText.includes('🌙') || b.innerText.includes('☀️')).click();
    });
    await delay(500);
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    if (!isDark) throw new Error('Dark mode not activated');
    await page.reload({ waitUntil: 'networkidle0' });
    const isStillDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    if (!isStillDark) throw new Error('Theme not persisted');
    console.log('TEST D PASS');

    // TEST E
    console.log('TEST E: Click New Scan');
    await page.evaluate(() => {
      [...document.querySelectorAll('a')].find(a => a.innerText.includes('New Scan')).click();
    });
    await delay(1000); 
    const analyzeTitle = await page.$eval('h2', el => el.innerText);
    if (!analyzeTitle.includes('Paste content')) throw new Error('Analyze page not loaded');
    console.log('TEST E PASS');

    // TEST F
    console.log('TEST F: Click Try PII');
    await page.evaluate(() => {
      [...document.querySelectorAll('button')].find(b => b.innerText.includes('PII')).click();
    });
    await delay(500);
    const textValue = await page.$eval('textarea', el => el.value);
    if (!textValue.includes('john@example.com')) throw new Error('Textarea not filled');
    console.log('TEST F PASS');

    // TEST G
    console.log('TEST G: Click Analyze');
    await page.evaluate(() => {
      [...document.querySelectorAll('button')].find(b => b.innerText.includes('Analyze Content') || b.innerText.includes('Analyze')).click();
    });
    console.log('Waiting up to 10s...');
    await page.waitForSelector('h2', { timeout: 15000 });
    await page.waitForFunction(() => {
      return [...document.querySelectorAll('h2')].some(h2 => h2.innerText.includes('Analysis Complete'));
    }, { timeout: 15000 });
    await delay(1000);
    await page.screenshot({ path: 'testG_analyze_results.png' });
    console.log('TEST G PASS');

    // TEST H
    console.log('TEST H: Click Use Redacted');
    await page.evaluate(() => {
      [...document.querySelectorAll('button')].find(b => b.innerText.includes('Use Redacted')).click();
    });
    await delay(2000); 
    const url = page.url();
    if (!url.includes('/dashboard')) throw new Error('Not redirected to dashboard');
    console.log('TEST H PASS');

    // TEST I
    console.log('TEST I: Dashboard shows scan');
    const tableRows = await page.$$eval('tbody tr', rows => rows.length);
    if (tableRows === 0) throw new Error('No scans in table');
    await page.screenshot({ path: 'testI_dashboard_after.png' });
    console.log('TEST I PASS');

    // TEST J
    console.log('TEST J: Click scan row');
    await page.click('tbody tr');
    await delay(2000);
    const detailTitle = await page.$eval('h2', el => el.innerText);
    if (!detailTitle.includes('Scan Details')) throw new Error('Scan Details not loaded');
    console.log('TEST J PASS');

    // TEST K
    console.log('TEST K: Navigate to /settings');
    await page.evaluate(() => {
      [...document.querySelectorAll('a')].find(a => a.innerText.includes('Settings')).click();
    });
    await delay(1000);
    const settingsTitle = await page.$eval('h2', el => el.innerText);
    if (!settingsTitle.includes('Settings')) throw new Error('Settings not loaded');
    await page.screenshot({ path: 'testK_settings.png' });
    console.log('TEST K PASS');

    // TEST L
    console.log('TEST L: Resize viewport');
    await page.setViewport({ width: 600, height: 800 });
    await delay(1000);
    await page.screenshot({ path: 'testL_mobile.png' });
    console.log('TEST L PASS');

    console.log('ALL TESTS PASSED');
  } catch (err) {
    console.error('TEST FAILED:', err);
    if (page) await page.screenshot({ path: 'error.png' });
  } finally {
    if (browser) await browser.close();
  }
})();
