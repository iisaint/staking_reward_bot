const moment = require('moment');

const unixTimeOfCurrentMonth = () => {
  const year = moment().year();
  const month = moment().month();

  const begin = moment(`${year}-${month + 1}-01 00:00:00`, 'YYYY-MM-DD hh:mm:ss');
  return begin.unix();
} 

const displayOfCurrentMonth = () => {
  const year = moment().year();
  const month = moment().month();
  return `${year}-${month + 1}`;
}

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  unixTimeOfCurrentMonth,
  displayOfCurrentMonth,
  delay
}