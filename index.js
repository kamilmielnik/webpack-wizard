const path = require('path');
const createEntryConfig = require('./src/entry');
const createModuleConfig = require('./src/module');
const createOutputConfig = require('./src/output');
const createPluginsConfig = require('./src/plugins');
const createResolveConfig = require('./src/resolve');
const applyWizardConfigDefaults = require('./apply-wizard-config-defaults');
const WEBPACK_CONFIG = Symbol('webpack-wizard-config');

const webpackWizard = (config) => {
  if (config[WEBPACK_CONFIG]) {
    return config;
  }
  const wizardConfig = applyWizardConfigDefaults(config);
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

module.exports = webpackWizard;
