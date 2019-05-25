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
    return [...this.alarms.keys()];
  }

  alarmExists(id) {
    return this.alarms.has(id);
  }

  addAlarm(symbol, targetPrice, comparison = '>=', label) {
    // TODO: Parse comparison symbol before passing it to watcher
    const watcher = this.getWatcher(symbol);
    const id = `${symbol}_${targetPrice}`;
    const alarm = {
      id,
      symbol,
      targetPrice,
      comparison,
      label
    };
    if (!this.alarms.has(id)) {
      watcher.addAlarm(id, targetPrice, comparison);
      //  watcher.getAlarmEmitter()
      this.alarms.set(id, alarm);
    }
    return alarm;
  }

  getSymbolFromId(id) {
    return id.split('_')[0];
  }

  dropAlarm(id) {
    // TODO: Also delete watcher when it does not have associated alarms
    const symbol = this.getSymbolFromId(id);
    this.watchers.delete(symbol);
    return this.alarms.delete(id);
  }
}

module.exports = new AlarmsService();
