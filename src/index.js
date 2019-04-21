const dotenv = require('dotenv');
const SymbolWatcher = require('./SymbolWatcher');

// load configs
dotenv.config();

const XBTUSD = new SymbolWatcher('XBTUSD', 5300);

(async () => {

  await XBTUSD.initStream();
  console.log('hola');
  
  setInterval(() => {
    console.log(XBTUSD.getLastPrice());
    console.log(XBTUSD.getVariation());
  }, 2000);
  console.log(XBTUSD.addAlarm());
})();