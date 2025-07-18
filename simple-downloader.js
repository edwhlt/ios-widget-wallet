// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: cloud-download;

// ===== CONFIGURATION =====
const GITHUB_PAGES_URL = "https://votre-username.github.io/ios-widget-wallet/Wallet Widget.js";
const SCRIPT_NAME = "Wallet Widget";

// ===== TÉLÉCHARGEMENT SIMPLE =====
async function downloadWidget() {
  try {
    let req = new Request(GITHUB_PAGES_URL);
    let code = await req.loadString();
    
    let fm = FileManager.iCloud();
    let scriptPath = fm.joinPath(fm.documentsDirectory(), `${SCRIPT_NAME}.js`);
    fm.writeString(scriptPath, code);
    
    console.log("✅ Widget téléchargé avec succès!");
    
    let alert = new Alert();
    alert.title = "✅ Téléchargement réussi";
    alert.message = "Le widget a été mis à jour";
    alert.addAction("OK");
    await alert.present();
    
  } catch (error) {
    console.error("❌ Erreur:", error);
    
    let alert = new Alert();
    alert.title = "❌ Erreur";
    alert.message = error.message;
    alert.addAction("OK");
    await alert.present();
  }
}

await downloadWidget();
