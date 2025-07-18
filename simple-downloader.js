// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: cloud-download;

// ===== CONFIGURATION =====
const GITHUB_USERNAME = "edwin"; // Remplacez par votre nom d'utilisateur GitHub
const REPO_NAME = "ios-widget-wallet"; // Nom de votre repository
const GITHUB_PAGES_URL = `https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/Wallet%20Widget.js`;
const SCRIPT_NAME = "Wallet Widget";

// ===== TÉLÉCHARGEMENT SIMPLE =====
async function downloadWidget() {
  try {
    log(`[DOWNLOAD] Téléchargement depuis: ${GITHUB_PAGES_URL}`);
    
    let req = new Request(GITHUB_PAGES_URL);
    let code = await req.loadString();
    
    // Vérifier que c'est bien du JavaScript
    if (!code.includes("Variables used by Scriptable")) {
      throw new Error("Le fichier téléchargé ne semble pas être un script Scriptable valide");
    }
    
    let fm = FileManager.iCloud();
    let scriptPath = fm.joinPath(fm.documentsDirectory(), `${SCRIPT_NAME}.js`);
    fm.writeString(scriptPath, code);
    
    log("✅ Widget téléchargé avec succès!");
    
    let alert = new Alert();
    alert.title = "✅ Téléchargement réussi";
    alert.message = "Le widget a été mis à jour depuis GitHub Pages";
    alert.addAction("OK");
    await alert.present();
    
  } catch (error) {
    log(`❌ Erreur: ${error.message}`);
    
    let alert = new Alert();
    alert.title = "❌ Erreur";
    alert.message = `Erreur: ${error.message}\n\nVérifiez que GitHub Pages est activé pour votre repository.`;
    alert.addAction("OK");
    await alert.present();
  }
}

await downloadWidget();
