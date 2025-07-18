const fm = FileManager.iCloud();
const filePath = fm.joinPath(fm.documentsDirectory(), "config.json");
let cachedConfig; // variable privée pour stocker la config chargée

export const loadConfig = async () => {
  if (cachedConfig) return cachedConfig;
  // Sinon, charger la config depuis le fichier
  await fm.downloadFileFromiCloud(filePath);
  const content = fm.readString(filePath);
  cachedConfig = JSON.parse(content);
  log(`Config loaded: ${JSON.stringify(cachedConfig)}`);
  return cachedConfig;
}

export const config = () => cachedConfig;