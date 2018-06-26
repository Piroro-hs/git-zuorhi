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

const prepare = async () => {
  const browser = await puppeteer.launch({headless: false, args: ['--headless']});
  const page = await browser.newPage();
  await page.goto('https://soundcloud.com/felinegroove/conflict-3rd');
  const playButton = await page.$('.l-listen-hero .playButton');
  return {play: playButton.click.bind(playButton), close: browser.close.bind(browser)};
};

module.exports.player = () => {
  const preparePromise = prepare();
  return async () => {
    const {play, close} = await preparePromise;
    await play();
    await new Promise(res => {
      setTimeout(res, (60 * 2 + 24) * 1000 + 500);
    });
    await close();
  }
}
