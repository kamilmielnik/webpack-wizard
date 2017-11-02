const path = require('path');

const CONFIG_FILENAME = 'webpack-wizard.config.js';

module.exports = () => {
  const cwd = process.cwd();
  const webpackWizardConfigPath = path.resolve(cwd, CONFIG_FILENAME);
  const webpackWizardConfig = require(webpackWizardConfigPath);
  return webpackWizardConfig;
};
