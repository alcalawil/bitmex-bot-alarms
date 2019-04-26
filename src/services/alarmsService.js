const SymbolWatcher = require('./SymbolWatcher');



class AlarmsService {
    // TODO: create methods to manage watcher instances

    constructor() {
        this.watchers = [];
    }

    createNewWatcher(symbol) {
        // TODO: Validate if symbol already exists
        // TODO: Allow names for watcher objects
        const watcher = new SymbolWatcher(symbol);
        this.watchers.push(watcher);
        return watcher;
    }

    createAlarm(name, symbol, targetPrice) {
        // TODO: Validate if alarm name already exists
        // TODO: return a parsed alarm object
        // TODO: Create alarm
        const id = `${symbol}_${targetPrice}`
        return {
            id,
            name,
            symbol,
            targetPrice
        }
    }
}

module.exports = new AlarmsService();