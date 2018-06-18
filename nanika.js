const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--headless',
    ]
  });
  const page = await browser.newPage();
  await page.goto('https://soundcloud.com/felinegroove/conflict-3rd');
  await page.$('.l-listen-hero').then(elm => elm.$('.playButton')).then(elm => elm.click());

  // await browser.close();
})();
