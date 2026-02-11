const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

async function takeScreenshots() {
  const screenshotsDir = path.join(__dirname, 'screenshots');

  // Create screenshots directory if it doesn't exist
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  const pages = [
    { name: 'home', url: 'http://localhost:3000' },
    { name: 'products', url: 'http://localhost:3000/products' },
    { name: 'cart', url: 'http://localhost:3000/cart' },
    { name: 'checkout', url: 'http://localhost:3000/checkout' }
  ];

  for (const pageInfo of pages) {
    try {
      console.log(`Taking screenshot: ${pageInfo.name}...`);
      await page.goto(pageInfo.url, { waitUntil: 'networkidle' });
      await page.screenshot({
        path: path.join(screenshotsDir, `${pageInfo.name}.png`),
        fullPage: true
      });
      console.log(`✓ Screenshot saved: ${pageInfo.name}.png`);
    } catch (error) {
      console.error(`✗ Error taking screenshot for ${pageInfo.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('\nAll screenshots saved to ./screenshots/');
}

takeScreenshots().catch(console.error);
