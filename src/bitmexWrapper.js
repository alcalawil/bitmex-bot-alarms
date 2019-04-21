const BitMEXClient = require('bitmex-realtime-api');
const EventEmitter = require('events').EventEmitter;
const config = require('./config').bitmex;

const client = new BitMEXClient({ 
  testnet: false,
  apiKeyID: config.apiKeyID,
  apiKeySecret: config.apiKeySecret,
});



module.exports = {
  client
}