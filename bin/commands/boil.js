const chalk = require('chalk');

module.exports = (webpackConfig, webpackWizardConfig, argv) => {
  console.log(chalk.yellow('Boiling.', argv));
};
