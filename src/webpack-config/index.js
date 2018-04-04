const { WEBPACK_CONFIG } = require('../constants');
const createEntryConfig = require('./entry');
const createModuleConfig = require('./module');
const createOutputConfig = require('./output');
const createPluginsConfig = require('./plugins');
const createResolveConfig = require('./resolve');

module.exports = (config) => {
  const configIsWebpackConfig = Boolean(config && config[WEBPACK_CONFIG]);
  if (configIsWebpackConfig) {
    return config;
  }
  return createWebpackConfig(config);
};

const createWebpackConfig = (wizardConfig) => {
  const webpackConfig = {};
  webpackConfig.mode = 'production';
  webpackConfig.entry = createEntryConfig(wizardConfig);
  webpackConfig.module = createModuleConfig(wizardConfig);
  webpackConfig.output = createOutputConfig(wizardConfig);
  webpackConfig.plugins = createPluginsConfig(wizardConfig);
  webpackConfig.resolve = createResolveConfig(wizardConfig);
  if (wizardConfig.isDev) {
    webpackConfig.mode = 'development';
    webpackConfig.devtool = 'eval';
  }
  webpackConfig[WEBPACK_CONFIG] = true;
  return webpackConfig;
};
