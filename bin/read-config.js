const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const defaultWebpackWizardConfig = require('./default-webpack-wizard-config');

const CONFIG_FILENAME = 'webpack-wizard.config.js';

module.exports = () => {
  const cwd = process.cwd();
  const webpackWizardConfigPath = path.resolve(cwd, CONFIG_FILENAME);
  const configFileExists = fs.existsSync(webpackWizardConfigPath);

  if (!configFileExists) {
    console.log(chalk.yellow(`"${webpackWizardConfigPath}" does not exist, using the default config`));
    return defaultWebpackWizardConfig;
  }

  const webpackWizardConfig = require(webpackWizardConfigPath);
  return webpackWizardConfig;
};
