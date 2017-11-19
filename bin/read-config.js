const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const applyWizardConfigDefaults = require('../apply-wizard-config-defaults');

const CONFIG_FILENAME = 'webpack-wizard.config.js';

module.exports = () => {
  const cwd = process.cwd();
  const webpackWizardConfigPath = path.resolve(cwd, CONFIG_FILENAME);
  const configFileExists = fs.existsSync(webpackWizardConfigPath);

  if (!configFileExists) {
    console.log(chalk.yellow(`"${webpackWizardConfigPath}" does not exist, using the default config`));
    return applyWizardConfigDefaults({});
  }

  const wizardConfig = require(webpackWizardConfigPath);
  return applyWizardConfigDefaults(wizardConfig);
};
