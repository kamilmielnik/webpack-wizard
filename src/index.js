const createWebpackConfig = require('./webpack-config');
const createWebpackWizardConfig = require('./webpack-wizard-config');

const webpackWizard = (config) => {
  const wizardConfig = createWebpackWizardConfig(config);
  const webpackConfig = createWebpackConfig(wizardConfig);
  return webpackConfig;
};

module.exports = webpackWizard;
