const puppeteer = require('puppeteer');
const { PerformanceObserver, performance } = require('perf_hooks');

const config = {
    username: 'hotel@email.com',
    password: 'my-secure-password',
};

const t0 = performance.now();

(async () => {
    // Setup
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 })

    // Start navigation
    await page.goto('https://backoffice.slope.it/login', { waitUntil: 'networkidle2' });

    // Perform login
    await page.focus('#username');
    await page.keyboard.type(config.username);
    await page.focus('#password');
    await page.keyboard.type(config.password);
    await page.click('#login');

    // Open the daily planning
    await page.waitForSelector('#menu_main_daily_planning');
    await page.click('#menu_main_daily_planning');
    await page.waitForSelector('#departings');

    // Capture screenshot
    await page.screenshot({ path: 'screenshots/daily-planning-' + Date.now() + '.png', fullPage: true });

    await browser.close();
})().then(() => {
    const t1 = performance.now();
    console.log("Script took " + ((t1 - t0) / 1000) + " seconds.");
});