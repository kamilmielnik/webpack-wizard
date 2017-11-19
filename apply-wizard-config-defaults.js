const resolveAbsolutePath = require('./src/utils/resolve-absolute-path');

const applyWizardConfigDefaults = (wizardConfig) => ({
  isDev: wizardConfig.isDev || process.env.NODE_ENV === 'development',
  isProd: wizardConfig.isProd || process.env.NODE_ENV === 'production',
  devHost: wizardConfig.devHost || 'localhost',
  devPort: wizardConfig.devPort || 3000,
  env: wizardConfig.env || {},
  input: applyInputDefaults(wizardConfig.input || {}),
  output: applyOutputDefaults(wizardConfig.output || {})
});

const applyInputDefaults = (input) => ({
  favicon: input.favicon || resolveAbsolutePath('favicon.ico'),
  html: input.html || resolveAbsolutePath('index.html'),
  js: input.js || resolveAbsolutePath('src/index.js'),
  jsDev: input.jsDev || resolveAbsolutePath('src/index-dev.js'),
  modules: input.modules || [ resolveAbsolutePath('src') ],
  styles: input.styles || resolveAbsolutePath('src/styles'),
  stylesGlobals: input.stylesGlobals
});

const applyOutputDefaults = (output) => ({
  directory: output.directory || resolveAbsolutePath('dist'),
  css: output.css || 'styles.css',
  html: output.html || 'index.html',
  js: output.js || 'bundle.js'
});

module.exports = applyWizardConfigDefaults;
