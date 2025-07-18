// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: magic;
const { config } = importModule(`Wallet/config`);

const getPrices = async () => {
  let url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,SOL&convert=USD";
  let req = new Request(url);
  req.headers = {
    "X-CMC_PRO_API_KEY": config().API_CRYPTOMARKETCAP_KEY,
    "Accept": "application/json"
  };

  let res = await req.loadJSON();

  if (req.response.statusCode >= 200 && req.response.statusCode < 300) {
    return {
      btcEur: res.data.BTC.quote.USD.price,
      ethEur: res.data.ETH.quote.USD.price,
      solEur: res.data.SOL.quote.USD.price
    };
  } else {
    throw new Error(res.status.error_message);
  }
}

// Prix historiques BTC et ETH (à J-7)
const getPrices7DaysAgo = async () => {
  let ts = Math.floor((Date.now() - 7 * 24 * 3600 * 1000) / 1000);

  let urlBTC = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=${ts}`;
  let reqBTC = new Request(urlBTC);
  let resBTC = await reqBTC.loadJSON();

  let urlETH = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=${ts}`;
  let reqETH = new Request(urlETH);
  let resETH = await reqETH.loadJSON();

  let urlSol = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=SOL&tsyms=USD&ts=${ts}`;
  let reqSol = new Request(urlSol);
  let resSol = await reqSol.loadJSON();

  return {
    btcEur7d: resBTC.BTC.USD,
    ethEur7d: resETH.ETH.USD,
    solEur7d: resSol.SOL.USD
  };
}

module.exports = {
  getPrices,
  getPrices7DaysAgo
}