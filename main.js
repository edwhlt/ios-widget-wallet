// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: dollar-sign;
import { loadConfig } from "./Wallet/config.js";
import { getBTCBalance } from "./Wallet/btcUtils.js";
import { getETHBalance } from "./Wallet/ethUtils.js";
import { getTokenSolUsdBalance } from "./Wallet/solUtils.js";
import { getPrices } from "./Wallet/priceUtils.js";

// --- 5. Création du widget
let widget = new ListWidget();

(async () => {
  const configData = await loadConfig(); // ✅ await dans un async IIFE
  const btcAddress = configData.BTC_ADDRESS;
  const ethAddress = configData.ETH_ADDRESS;
  const solAddress = configData.SOL_ADDRESS;

  // RPC publics sans token
  let ethRpc = "https://rpc.ankr.com/eth";
  let baseRpc = "https://base.publicnode.com";
  let solRpc = "https://api.mainnet-beta.solana.com";
    
  try{
    let [btcBalance, ethBalance, baseBalance, solBalance, prices] = await Promise.all([
      getBTCBalance(btcAddress),
      getETHBalance(ethRpc, ethAddress),
      getETHBalance(baseRpc, ethAddress),
      getTokenSolUsdBalance(solRpc, solAddress),
      getPrices()
    ]);
    
    if(!btcBalance) btcBalance = 0;
    if(!ethBalance) ethBalance = 0;
    if(!solBalance) solBalance = 0;
    if(!baseBalance) baseBalance = 0;
    
    log(`[Widget] BTC: ${btcBalance}`)
    log(`[Error] ETH: ${ethBalance}, ETH (base): ${baseBalance}`)
    log(`[Error] SOL: ${solBalance}`)
    
    let totalEur = btcBalance * prices.btcEur + ethBalance * prices.ethEur + baseBalance * prices.ethEur + solBalance;
    
    log(totalEur)

    let btcLine = widget.addText(`🚀🚀 $ ${totalEur.toFixed(2)} 💸💸`);
    btcLine.font = Font.systemFont(10);
    widget.addSpacer(4);

  }
  catch(e){
    log(`[Error] ${e}`)
    let errorLine = widget.addText(e.message);
    errorLine.font = Font.systemFont(10);
  }
})();

widget.backgroundColor = new Color("#121212");

Script.setWidget(widget);
Script.complete();