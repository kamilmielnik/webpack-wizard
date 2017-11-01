const createEntryConfig = require('./src/entry');
const createModuleConfig = require('./src/module');
const createOutputConfig = require('./src/output');
const createPluginsConfig = require('./src/plugins');
const createResolveConfig = require('./src/resolve');

module.exports = function webpackWizard(wizardConfig) {
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
}
