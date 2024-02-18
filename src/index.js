const Telegram = require('./telegram');
const Subscan = require('./subscan');
const Onekv = require('./onekv');
const keys = require('./config/keys');

const main = async () => {
  try {
    const subscan = new Subscan(keys.SUBSCAN_API_KEY);
    const onekv = new Onekv();
    const telegram = new Telegram(keys.TELEGRAM_TOKEN, subscan, onekv, keys.SUPER_POWER, keys.DEFAULT_STASH, keys.SUBSCAN_API_DELAY);
    telegram.start();
  } catch (e) {
    console.error(e);
  }
}

main();