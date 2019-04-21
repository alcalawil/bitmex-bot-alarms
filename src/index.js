const dotenv = require('dotenv');
const SymbolWatcher = require('./SymbolWatcher');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// load configs
dotenv.config();

const XBTUSD = new SymbolWatcher('XBTUSD', 5300);

(async () => {
  const started = await XBTUSD.startStream();
  const emiter = XBTUSD.getEmitter();
  emiter.on('change', () => {
    console.log(XBTUSD.getVariation());
  })
  
})();