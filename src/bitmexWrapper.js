const BitMEXClient = require('bitmex-realtime-api');
const EventEmitter = require('events').EventEmitter;
const config = require('./config').bitmex;

const client = new BitMEXClient({
  testnet: false,
  apiKeyID: config.apiKeyID,
  apiKeySecret: config.apiKeySecret,
});

const createStream = (symbol) => {
  const priceEmitter = new EventEmitter();
  client.addStream(symbol, 'instrument', (data) => {
    const lastPrice = data[0].lastPrice;
    priceEmitter.emit('change', lastPrice);
  });
  return priceEmitter;
}

const getLastPrice = (symbol) => {
  const data = client.getData([symbol], ['instrument'])
  const lastPrice = data[0].lastPrice;
  return lastPrice;
}

const closeStream = () => {  
  // TODO:
}

module.exports = {
  client,
  createStream,
  getLastPrice
}