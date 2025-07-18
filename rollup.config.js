export default {
  input: 'main.js',
  output: {
    file: 'dist/Wallet Widget.js',
    format: 'iife', // IIFE = format que Scriptable peut exécuter directement
    name: 'WalletWidget',
    banner: `// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: dollar-sign;`
  },
  // Pas d'external pour inclure tous les modules locaux
  onwarn: (warning, warn) => {
    // Ignorer certains warnings spécifiques à Scriptable
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  }
}
