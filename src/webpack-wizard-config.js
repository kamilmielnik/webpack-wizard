const { WEBPACK_CONFIG } = require('./constants');
const { resolveCwdPath, resolveCwdPathIfExists } = require('./utils');

module.exports = (config) => {
  const configIsWebpackConfig = Boolean(config && config[WEBPACK_CONFIG]);
  if (configIsWebpackConfig) {
    return config;
  }
  return createWebpackWizardConfig(config);
};

const createWebpackWizardConfig = (wizardConfig) => ({
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
  html: input.html || resolveCwdPath('index.html'),
  js: input.js || resolveCwdPath('src/index.js'),
  jsDev: input.jsDev || resolveCwdPath('src/index-dev.js'),
  modules: input.modules || resolveCwdPath('src'),
  styles: input.styles || resolveCwdPathIfExists('src/styles'),
  stylesGlobals: input.stylesGlobals || 'globals.scss'
});

const applyOutputDefaults = (output) => ({
  directory: output.directory || resolveCwdPath('dist'),
  css: output.css || 'styles.css',
  html: output.html || 'index.html',
  js: output.js || 'bundle.js'
});
