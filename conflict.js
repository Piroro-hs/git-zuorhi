const EventEmitter = require('events');

const puppeteer = require('puppeteer');

module.exports.detecter = rl => {
  const emitter = new EventEmitter();
  rl.on('line', line => {
    if (/^CONFLICT \(.+\): /.test(line)) {
      emitter.emit('conflict');
    }
  });
  return emitter;
}

module.exports.play = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--headless',
    ]
  });
  const page = await browser.newPage();
  await page.goto('https://soundcloud.com/felinegroove/conflict-3rd');
  await page.$('.l-listen-hero .playButton').then(elm => elm.click());
  await new Promise(res => {
    setTimeout(res, (60 * 2 + 24) * 1000 + 500);
  });
  await browser.close();
}
