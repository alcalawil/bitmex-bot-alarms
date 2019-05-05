const SymbolWatcher = require('../SymbolWatcher');

class AlarmsService {
  // TODO: create methods to manage watcher instances
  constructor() {
    this.alarms = new Map();
    this.watchers = new Map();
  }

  createNewWatcher(symbol) {
    if (this.watchers.has(symbol)) {
      return this.watchers.get(symbol);
    }

    // TODO: Add alarm object to the alarm Map

    const watcher = new SymbolWatcher(symbol);
    this.watchers.set(symbol, watcher);
    return watcher;
  }

  getWatcher(symbol) {
    if (this.watchers.has(symbol)) {
      return this.watchers.get(symbol);
    }
    const watcher = this.createNewWatcher(symbol);
    return watcher;
  }

  getAllAlarms() {
    return this.alarms.
  }

  getAlarm(id) {
    return this.alarms.get(id);
  }

  addAlarm(name, symbol, targetPrice, comparison = '>=') {
    const watcher = this.getWatcher(symbol);
    const id = `${symbol}_${targetPrice}`;
    // TODO: Parse comparison symbol before passing it to watcher
    if (!this.alarms.has(id)) {
      watcher.addAlarm(id, targetPrice, comparison);
    }
    return {
      id,
      name,
      symbol,
      targetPrice
    };
  }

  dropAlarm(id) {
    // TODO: Also delete watcher when it does not have associated alarms
    // TODO: Unsubscribe from events
    return this.alarms.delete(id);
  }
}

module.exports = new AlarmsService();
