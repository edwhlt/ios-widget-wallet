import { config } from "./config.js";

export const getTokenSolUsdBalance = async (rpcUrl, addr) => {
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "getTokenAccountsByOwner",
    params: [
      addr,
      { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
      { encoding: "jsonParsed" }
    ]
  };

  const req = new Request(rpcUrl);
  req.method = "POST";
  req.headers = { "Content-Type": "application/json" };
  req.body = JSON.stringify(payload);

  const res = await req.loadJSON();
  log(`[DEBUG] Number of token accounts found: ${res?.result?.value?.length || 0}`);

  let result = [];

  if (res?.result && res?.result?.value) {
    for (const tokenAccount of res.result.value) {
      const info = tokenAccount.account.data.parsed.info;
      const mint = info.mint;
      const amount = info.tokenAmount.uiAmount;
      const decimals = info.tokenAmount.decimals;
      const symbol = config().SOL_TOKEN_SYMBOL[mint];
      log(`[DEBUG] Mint ${mint}: ${symbol}`);

      if (!symbol || amount === 0) continue;

      let priceReq = new Request(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`);
      priceReq.method = "GET";
      priceReq.headers = {
        "X-CMC_PRO_API_KEY": config().API_CRYPTOMARKETCAP_KEY,
        "Accept": "application/json"
      };
  
      let priceRes = await priceReq.loadJSON();
      let priceUSD = priceRes.data[symbol].quote.USD.price;

      log(`[DEBUG] ${symbol}: ${priceUSD} USD`);

      result.push({
        mint,
        amount: amount * priceUSD,
        decimals
      });
    }
  }

  return result.reduce((sum, item) => sum + item.amount, 0);
}