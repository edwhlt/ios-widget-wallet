const fm = FileManager.iCloud();
const filePath = fm.joinPath(fm.documentsDirectory(), "config.json");
let cachedConfig; // variable privée pour stocker la config chargée

export const loadConfig = async () => {
  if (cachedConfig) return cachedConfig;
  
  try {
    // Vérifier si le fichier existe
    if (!fm.fileExists(filePath)) {
      throw new Error(`Fichier config non trouvé: ${filePath}`);
    }
    
    // Télécharger depuis iCloud si nécessaire
    await fm.downloadFileFromiCloud(filePath);
    const content = fm.readString(filePath);
    cachedConfig = JSON.parse(content);
    return cachedConfig;
  } catch (error) {
    log(`[ERROR] Configuration: ${error.message}`);
    // Configuration par défaut pour test
    cachedConfig = {
      BTC_ADDRESS: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      ETH_ADDRESS: "0x742c4d7d2ae6e8f2b2e8f6c7f8a9b0c1d2e3f4a5",
      SOL_ADDRESS: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
      API_CRYPTOMARKETCAP_KEY: "test-key",
      SOL_TOKEN_SYMBOL: {}
    };
    return cachedConfig;
  }
}

export const config = () => cachedConfig;