module.exports = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  SUBSCAN_API_KEY: process.env.SUBSCAN_API_KEY,
  SUBSCAN_API_DELAY: Number(process.env.SUBSCAN_API_DELAY),
  SUPER_POWER: process.env.SUPER_POWER,
  DEFAULT_STASH: JSON.parse(process.env.DEFAULT_STASH),
}