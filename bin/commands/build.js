const chalk = require('chalk');
const webpack = require('webpack');

module.exports = (webpackConfig) => {
  const compiler = webpack(webpackConfig);
  console.log(chalk.yellow('Starting compilation.'));
  compiler.run((error, stats) => {
    if (error) {
      printErrors('Failed to compile.', [ err ]);
      process.exit(1);
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors);
      process.exit(1);
    }

    if (process.env.CI && stats.compilation.warnings.length) {
      printErrors(
        'Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.',
        stats.compilation.warnings
      );
      process.exit(1);
    }

    console.log(chalk.green('Compiled successfully.'));
    console.log();
  });
};

const printErrors = (summary, errors) => {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach((error) => {
    console.log(chald.red(error.message || error));
    console.log();
  });
};
