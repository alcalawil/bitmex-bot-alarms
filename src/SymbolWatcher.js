const EvenetEmitter = require('events').EventEmitter;
const bitmex = require('./bitmexWrapper');
const utils = require('./utils');

class SymbolWatcher {
  constructor(symbol, entryPrice) {
    this.client = bitmex.client;
    this.symbol = symbol;
    this.entryPrice = entryPrice;
    this.priceWatcher = null;
    this.initialized = false;
    this.alarmEvents = new EvenetEmitter();
    this.alarmArray = [];
  }

  async startStream() {
    return new Promise((resolve, reject) => {
      this.priceWatcher = bitmex.createStream(this.symbol);
      this.priceWatcher.once('change', () => {
        this.initialized = true;
        resolve();
      });
      this.priceWatcher.addListener('change', (price) => {
        this.alarmArray = this.alarmArray.filter(alarm => {
          const priceReached = eval(alarm.condition);
          if (!priceReached) {
            return true; // Keep alarm on array
          }
          this.alarmEvents.emit(alarm.name, alarm.condition);
          // Remove alarm
          return false;
        });
      });
    });
  }

  closeStream() {
    // TODO:
  }

  setEntryPrice(entryPrice) {
    this.entryPrice = entryPrice;
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

  dropAlarm(alarmName) {
    // TODO
  }

  addAlarm(alarmName, comparision, targetPrice) {
    const possibleComparisions = ['<', '>', '==', '<=', '>='];
    if (!possibleComparisions.includes(comparision)) {
      return false;
    }
    const condition = `price ${comparision} ${targetPrice}`;
    const alarm = {
      name: alarmName,
      condition: condition
    }
    this.alarmArray.push(alarm);
    return true;
  }

  getAlarmEmitter() {
    return this.alarmEvents;
  }
}

module.exports = SymbolWatcher;