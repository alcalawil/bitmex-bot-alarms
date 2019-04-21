const BitMEXClient = require('bitmex-realtime-api');
const utils = require('./utils');
const config = require('./config').bitmex;

const client = new BitMEXClient({ 
  testnet: false,
  apiKeyID: config.apiKeyID,
  apiKeySecret: config.apiKeySecret,
});

// Example
// const buyPrice = 5300;
// console.log(client.addStream('XBTUSD', 'instrument', (data) => {}));
//   const currentPrice = data[0].lastPrice;
//   const percentage = utils.calcPercent(buyPrice, currentPrice);
//   console.log(currentPrice);
//   console.log(`Variation: ${percentage.toFixed(3)} %`);
//   console.log('--------------------------');
// });

module.exports = {
  client
}