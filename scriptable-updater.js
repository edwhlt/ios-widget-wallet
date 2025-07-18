// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: download;

// ===== CONFIGURATION =====
const GITHUB_REPO = "edwin/ios-widget-wallet"; // Remplacez par votre nom d'utilisateur/repo
const SCRIPT_NAME = "Wallet Widget"; // Nom du script dans Scriptable

// ===== FONCTIONS =====
async function downloadLatestWidget() {
  try {
    // 1. Récupérer la dernière release
    let releaseUrl = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
    let releaseReq = new Request(releaseUrl);
    let release = await releaseReq.loadJSON();
    
    // 2. Trouver l'asset du widget (chercher "Wallet Widget.js")
    let asset = release.assets.find(a => a.name === "Wallet Widget.js");
    if (!asset) {
      throw new Error("Fichier 'Wallet Widget.js' non trouvé dans la release");
    }
    
    // 3. Télécharger le fichier
    let downloadReq = new Request(asset.download_url);
    let code = await downloadReq.loadString();
    
    // 4. Sauvegarder dans Scriptable
    let fm = FileManager.iCloud();
    let scriptPath = fm.joinPath(fm.documentsDirectory(), `${SCRIPT_NAME}.js`);
    fm.writeString(scriptPath, code);
    
    // 5. Confirmation
    let alert = new Alert();
    alert.title = "✅ Mise à jour réussie";
    alert.message = `Widget mis à jour vers la version ${release.tag_name}`;
    alert.addAction("OK");
    await alert.present();
    
    console.log(`Widget mis à jour vers ${release.tag_name}`);
    
  } catch (error) {
    let alert = new Alert();
    alert.title = "❌ Erreur de mise à jour";
    alert.message = error.message;
    alert.addAction("OK");
    await alert.present();
    
    console.error("Erreur:", error);
  }
}

// ===== EXECUTION =====
await downloadLatestWidget();
