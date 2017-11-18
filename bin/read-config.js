const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const merge = require('lodash.merge');

const CONFIG_FILENAME = 'webpack-wizard.config.js';
const DEFAULT_WEBPACK_WIZARD_CONFIG = {
  devHost: 'localhost',
  devPort: 3000,
  input: {
    html: path.resolve(process.cwd(), 'index.html')
  }
};

module.exports = () => {
  const cwd = process.cwd();
  const webpackWizardConfigPath = path.resolve(cwd, CONFIG_FILENAME);
  const configFileExists = fs.existsSync(webpackWizardConfigPath);

  if (!configFileExists) {
    console.log(chalk.yellow(`"${webpackWizardConfigPath}" does not exist, using the default config`));
    return DEFAULT_WEBPACK_WIZARD_CONFIG;
  }

  const webpackWizardConfig = merge(
    DEFAULT_WEBPACK_WIZARD_CONFIG,
    require(webpackWizardConfigPath)
  );
  return webpackWizardConfig;
};
