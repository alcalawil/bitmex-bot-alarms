const bitmex = require('./bitmexWrapper');
const utils = require('./utils');

class SymbolWatcher {
  constructor(symbol, entryPrice) {
    this.client = bitmex.client;
    this.symbol = symbol;
    this.entryPrice = entryPrice;
    this.priceWatcher = null;
    this.initialized = false;
  }

  async startStream() {
    return new Promise((resolve, reject) => {
      this.priceWatcher = bitmex.createStream(this.symbol);
      this.priceWatcher.once('change', () => {
        this.initialized = true;
        resolve();
      });
    });
  }

  closeStream() {
    // TODO:
  }

  getVariation(decimalPlaces = 3) {
    const lastPrice = this.getLastPrice();
    const variation = utils.calcPercent(this.entryPrice, lastPrice);
    return variation.toFixed(decimalPlaces);
  }

  getLastPrice() {
    const lastPrice = bitmex.getLastPrice(this.symbol);
    return lastPrice;
  }

  getEmitter() {
    return this.priceWatcher;
  }

  addAlarm(alarmName, targetPrice) {
    // create eventEmitter
    this.priceWatcher.on('change', (price) => {
      console.log(`Price: ${price}`);      
    });
  }

}

module.exports = SymbolWatcher;