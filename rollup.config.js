export default {
  input: 'main.js',
  output: {
    file: 'dist/Wallet Widget.js',
    format: 'es', // IIFE = format que Scriptable peut exécuter directement
    name: 'WalletWidget'
  },
  // Pas d'external pour inclure tous les modules locaux
  onwarn: (warning, warn) => {
    // Ignorer certains warnings spécifiques à Scriptable
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  }
}
