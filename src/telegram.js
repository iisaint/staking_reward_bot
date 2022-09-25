const TelegramBot = require('node-telegram-bot-api');
const {displayOfCurrentMonth, delay} = require('./utils');

module.exports = class Telegram {
  constructor(token, subscan, defaultStash, delay) {
    this.bot = new TelegramBot(token, {polling: true});
    this.subscan = subscan;
    this.defaultStash = defaultStash;
    this.delay = delay;
  }

  async start () {
    this.bot.onText(/\/start/, (msg, match) => {
      this.bot.sendMessage(msg.chat.id, "hello");
    });

    this.bot.onText(/\/rewards (.+)/, async (msg, match) => {
      console.log(msg);
      console.log(match);
      let response = await this.subscan.getRewards(match[1]);
      response = `${displayOfCurrentMonth()}: ` + response;

      this.bot.sendMessage(msg.chat.id, response);
    });

    this.bot.onText(/\/all/, async (msg, match) => {
      let response = '';
      for(let i=0; i < this.defaultStash.length; i++) {
        try {
          const reward = await this.subscan.getRewards(this.defaultStash[i].stash);
          response += `${this.defaultStash[i].name}: ${reward}\n`;
        } catch (e) {
          console.log(e);
        }
        await delay(this.delay);
      }
      response = `${displayOfCurrentMonth()}: \n` + response;
      this.bot.sendMessage(msg.chat.id, response);
    });
  }

}