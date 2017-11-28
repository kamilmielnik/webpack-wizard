const { WEBPACK_WIZARD_CONFIG } = require('./constants');
const createWebpackConfig = require('./webpack-config');
const createWebpackWizardConfig = require('./webpack-wizard-config');

const webpackWizard = (config) => {
  if (config && config[WEBPACK_WIZARD_CONFIG]) {
    return config;
  }
  const wizardConfig = createWebpackWizardConfig(config);
  const webpackConfig = createWebpackConfig(wizardConfig);
  webpackConfig[WEBPACK_WIZARD_CONFIG] = wizardConfig;
  return webpackConfig;
};

module.exports = webpackWizard;
