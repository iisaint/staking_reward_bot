const Telegram = require('./telegram');
const Subscan = require('./subscan');
const keys = require('./config/keys');

const main = async () => {
  try {
    const subscan = new Subscan(keys.SUBSCAN_API_KEY);
    const telegram = new Telegram(keys.TELEGRAM_TOKEN, subscan, keys.DEFAULT_STASH, Number(keys.SUBSCAN_API_DELAY));
    telegram.start();
  } catch (e) {
    console.error(e);
  }
}

main();