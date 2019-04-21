const bitmex = require('./bitmexWrapper');
const utils = require('./utils');

class SymbolWatcher {
  constructor(symbol, entryPrice) {
    this.client = bitmex.client;
    this.symbol = symbol;
    this.entryPrice = entryPrice;
    this.stream = null;
    this.initialized = false;
    this.priceEmitter = new EventEmitter();
  }

  initStream() {
    if (this.initialized) {
      return;
    }
    this.stream = this.client.addStream(this.symbol, 'instrument', (data) => {
      this.initialized = true;
      const lastPrice = data[0].lastPrice;
      this.priceEmitter.emit('change', lastPrice);
      console.log('A');
    });
  }

  closeStream() {
    // TODO: Test this
    return this.stream.close();
  }

  getVariation(decimalPlaces = 3) {
    if (!this.initialized) {
      return null;
    }
    const lastPrice = this.getLastPrice();
    const variation = utils.calcPercent(this.entryPrice, lastPrice);
    return variation.toFixed(decimalPlaces);
  }

  getLastPrice() {
    if (!this.initialized) {
      return null;
    }
    const data = this.client.getData([this.symbol], ['instrument'])
    const lastPrice = data[0].lastPrice;
    return lastPrice;
  }

  addAlarm(alarmName, targetPrice) {
    // create eventEmitter
    this.priceEmitter.on('change', (price) => {
      console.log(`Price: ${price}`);
      
    });
  }

}

module.exports = SymbolWatcher;