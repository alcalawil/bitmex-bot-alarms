const dotenv = require('dotenv');
const SymbolWatcher = require('./SymbolWatcher');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// load configs
dotenv.config();

const XBTUSD = new SymbolWatcher('XBTUSD', 5300);

(async () => {
  const started = await XBTUSD.startStream();
  const emiter = XBTUSD.getEmitter();
  emiter.on('change', (price) => {
    console.log(price);
  });
  
  XBTUSD.addAlarm('reach', '>', 5000);
  XBTUSD.addAlarm('reach2', '>', 9000);
  const alarm = XBTUSD.getAlarmEmitter();
  alarm.on('reach', () => {
    console.log('BINGO!');
  });

  alarm.on('reach2', () => {
    console.log('BINGuito!');
  });
  
})();