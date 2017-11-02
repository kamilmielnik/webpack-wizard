const createEntryConfig = require('./src/entry');
const createModuleConfig = require('./src/module');
const createOutputConfig = require('./src/output');
const createPluginsConfig = require('./src/plugins');
const createResolveConfig = require('./src/resolve');

const webpackWizard = (config) => {
  const wizardConfig = applyConfigDefaults(config);
  const webpackConfig = {};
  webpackConfig.output = createOutputConfig(wizardConfig);
  webpackConfig.entry = createEntryConfig(wizardConfig);
  webpackConfig.resolve = createResolveConfig(wizardConfig);
  webpackConfig.module = createModuleConfig(wizardConfig);
  webpackConfig.plugins = createPluginsConfig(wizardConfig);
  if (wizardConfig.isDev) {
    webpackConfig.devtool = 'eval';
  }
  return webpackConfig;
};

const applyConfigDefaults = (wizardConfig) => ({
  isDev: wizardConfig.isDev || false,
  isProd: wizardConfig.isProd || false,
  devHost: wizardConfig.devHost || 'localhost',
  devPort: wizardConfig.devPort || 3000,
  env: wizardConfig.env || {},
  input: applyInputDefaults(wizardConfig.input || {}),
  output: applyOutputDefaults(wizardConfig.output || {})
});

const applyInputDefaults = (input) => ({
  favicon: input.favicon || 'favicon.ico',
  html: input.html || 'index.html',
  js: input.js || 'index.js',
  jsDev: input.jsDev || 'index-dev.js',
  modules: input.modules || [
    'src'
  ],
  styles: input.styles || 'src/styles',
  stylesGlobals: input.stylesGlobals || 'globals.scss'
});

const applyOutputDefaults = (output) => ({
  directory: output.directory || 'dist',
  css: output.css || 'styles.css',
  html: output.html || 'index.html',
  js: output.js || 'bundle.js'
});

module.exports = webpackWizard;
