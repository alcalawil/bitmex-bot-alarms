const bitmex = require('./bitmexWrapper');
const utils = require('./utils');

class SymbolWatcher {
  constructor(symbol, buyPrice) {
    this.client = bitmex.client;
    this.symbol = symbol;
    this.stream = null;
    this.initialized = false;
  }

  initStream() {
    new Promise((resolve, reject) => {
      if(!this.initialized) {
        this.stream = this.client.addStream(this.symbol, 'instrument', () => {
          this.initialized = true;
          console.log('...');
          
          return resolve(true);
        });
      } else {
        return resolve(true);
      }
    })
  }

  closeStream() {
    return this.stream.close(); // TODO: Test this
  }

  getVariation() {
    // if(this.initialized)
    const lastPrice = this.getLastPrice();
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
  }

}

module.exports = SymbolWatcher;