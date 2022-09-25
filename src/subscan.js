const axios = require('axios').default;
const BN = require('bn.js');
const {formatBalance} = require('@polkadot/util');
const {unixTimeOfCurrentMonth} = require('./utils');

module.exports = class Subscan {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  async getRewards(stash, network='kusama') {
    const begin = unixTimeOfCurrentMonth();
    let page = 0;
    let count = 0;
    let sum = new BN('0', 10);
    while(true) {
      let res;
      try {
        res = await axios({
          method: 'post',
          url: `https://${network}.api.subscan.io/api/scan/account/reward_slash`,
          headers: {'X-API-Key': this.apiKey, 'Content-Type': 'application/json'},
          data: {
            row: 20,
            page: page,
            address: stash
          }
        })
      } catch (e) {
        if (e.response.status === 400) {
          return e.response.data.message;
        }
        console.log(e.code);
        return 'Sorry, something went wrong...';
      }
      if (res.status === 200 && res.data.message === 'Success' && res.data.data.count !==0) {
        const data = res.data.data;
        count = data.count;

        data.list.forEach(e => {
          if (e.block_timestamp >= begin) {
            const amount = new BN(e.amount, 10);
            sum = sum.add(amount);
          }
        });
        if (data.list.length === 20 && data.list[19].block_timestamp > begin) {
          page++;
          continue;
        } else {
          if (network === 'kusama') {
            return formatBalance(sum.toString(10), {
              decimals: 12,
              forceUnit: 'KSM',
              withUnit: 'KSM',
            });
          } else {
            return formatBalance(sum.toString(10), {
              decimals: 10,
              forceUnit: 'DOT',
              withUnit: 'DOT',
            });
          }
        }
      } else {
        return 'data not found';
      }
    }
  }
}
