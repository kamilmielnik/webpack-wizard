const resolveCwdPathIfExists = require('./src/utils/resolve-cwd-path-if-exists');

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
  favicon: input.favicon || resolveCwdPathIfExists('favicon.ico'),
  html: input.html || resolveCwdPathIfExists('index.html'),
  js: input.js || resolveCwdPathIfExists('src/index.js'),
  jsDev: input.jsDev || resolveCwdPathIfExists('src/index-dev.js'),
  modules: input.modules || [ resolveCwdPathIfExists('src') ],
  styles: input.styles || resolveCwdPathIfExists('src/styles'),
  stylesGlobals: input.stylesGlobals
});

const applyOutputDefaults = (output) => ({
  directory: output.directory || resolveCwdPathIfExists('dist'),
  css: output.css || 'styles.css',
  html: output.html || 'index.html',
  js: output.js || 'bundle.js'
});

module.exports = applyWizardConfigDefaults;
