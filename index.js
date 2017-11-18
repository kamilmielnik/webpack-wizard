const path = require('path');
const createEntryConfig = require('./src/entry');
const createModuleConfig = require('./src/module');
const createOutputConfig = require('./src/output');
const createPluginsConfig = require('./src/plugins');
const createResolveConfig = require('./src/resolve');
const resolveFilePathIfExists = require('./src/utils').resolveFilePathIfExists;

const WEBPACK_CONFIG = Symbol('webpack-wizard-config');

const webpackWizard = (config) => {
  if (config[WEBPACK_CONFIG]) {
    return config;
  }
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
  webpackConfig[WEBPACK_CONFIG] = true;
  return webpackConfig;
};

const applyConfigDefaults = (wizardConfig = {}) => ({
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
  stylesGlobals: input.stylesGlobals || 'globals.scss'
});

const applyOutputDefaults = (output) => ({
  directory: output.directory || resolveAbsolutePath('dist'),
  css: output.css || 'styles.css',
  html: output.html || 'index.html',
  js: output.js || 'bundle.js'
});

const resolveAbsolutePath = (relativePath) => resolveFilePathIfExists(process.cwd(), relativePath);

module.exports = webpackWizard;
