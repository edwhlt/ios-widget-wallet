import { loadConfig } from "./Wallet/config.js";
import { getBTCBalance } from "./Wallet/btcUtils.js";
import { getETHBalance } from "./Wallet/ethUtils.js";
import { getTokenSolUsdBalance } from "./Wallet/solUtils.js";
import { getPrices } from "./Wallet/priceUtils.js";

// --- 5. Création du widget
let widget = new ListWidget();
widget.backgroundColor = new Color("#121212");

(async () => {
  try {
    log("[DEBUG] Début du chargement du widget");
    
    // Chargement de la configuration
    const configData = await loadConfig();
    log(`[DEBUG] Config chargée: ${JSON.stringify(configData)}`);
    
    const btcAddress = configData.BTC_ADDRESS;
    const ethAddress = configData.ETH_ADDRESS;
    const solAddress = configData.SOL_ADDRESS;

    // RPC publics sans token
    let ethRpc = "https://rpc.ankr.com/eth";
    let baseRpc = "https://base.publicnode.com";
    let solRpc = "https://api.mainnet-beta.solana.com";
    
    log("[DEBUG] Début des requêtes API");
    
    // Mode dégradé : récupération séquentielle pour debug
    let btcBalance = 0, ethBalance = 0, baseBalance = 0, solBalance = 0, prices = null;
    
    try {
      btcBalance = await getBTCBalance(btcAddress);
      log(`[DEBUG] BTC OK: ${btcBalance}`);
    } catch (e) {
      log(`[ERROR] BTC: ${e.message}`);
    }
    
    try {
      ethBalance = await getETHBalance(ethRpc, ethAddress);
      log(`[DEBUG] ETH OK: ${ethBalance}`);
    } catch (e) {
      log(`[ERROR] ETH: ${e.message}`);
    }
    
    try {
      baseBalance = await getETHBalance(baseRpc, ethAddress);
      log(`[DEBUG] BASE OK: ${baseBalance}`);
    } catch (e) {
      log(`[ERROR] BASE: ${e.message}`);
    }
    
    try {
      solBalance = await getTokenSolUsdBalance(solRpc, solAddress);
      log(`[DEBUG] SOL OK: ${solBalance}`);
    } catch (e) {
      log(`[ERROR] SOL: ${e.message}`);
    }
    
    try {
      prices = await getPrices();
      log(`[DEBUG] PRICES OK: ${JSON.stringify(prices)}`);
    } catch (e) {
      log(`[ERROR] PRICES: ${e.message}`);
      // Prix par défaut
      prices = { btcEur: 50000, ethEur: 3000, solEur: 100 };
    }
    
    // S'assurer que les valeurs sont des nombres
    btcBalance = Number(btcBalance) || 0;
    ethBalance = Number(ethBalance) || 0;
    baseBalance = Number(baseBalance) || 0;
    solBalance = Number(solBalance) || 0;
    
    let totalEur = btcBalance * prices.btcEur + ethBalance * prices.ethEur + baseBalance * prices.ethEur + solBalance;
    
    log(`[DEBUG] Total calculé: ${totalEur}`);

    // Affichage du widget
    if (totalEur > 0) {
      let btcLine = widget.addText(`🚀🚀 $ ${totalEur.toFixed(2)} 💸💸`);
      btcLine.font = Font.systemFont(16);
      btcLine.textColor = Color.white();
      widget.addSpacer(4);
    } else {
      let errorLine = widget.addText("❌ Aucune donnée");
      errorLine.font = Font.systemFont(14);
      errorLine.textColor = Color.red();
    }

  } catch(e) {
    log(`[ERROR GLOBAL] ${e.message}`);
    let errorLine = widget.addText(`❌ Erreur: ${e.message}`);
    errorLine.font = Font.systemFont(12);
    errorLine.textColor = Color.red();
  }
  
  // ✅ IMPORTANT: Appeler setWidget et complete APRÈS avoir terminé
  Script.setWidget(widget);
  Script.complete();
})();