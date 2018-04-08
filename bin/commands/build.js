const chalk = require('chalk');
const webpack = require('webpack');

module.exports = (argv, webpackConfig) => {
  const compiler = webpack(webpackConfig);
  console.log('Starting compilation...');
  compiler.run((error, stats) => {
    if (error) {
      printErrors('Failed to compile.', [ err ]);
      process.exit(1);
    }

    const compilation = stats.compilation;
    const errors = compilation && compilation.errors;
    const warnings = compilation && compilation.warnings;

    if (errors && errors.length) {
      printErrors('Failed to compile.', errors);
      process.exit(1);
    }

    if (process.env.CI && warnings && warnings.length) {
      printErrors(
        'Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.',
        warnings
      );
      process.exit(1);
    }

    console.log(stats.toString({
      modules: false,
      chunks: false,
      colors: true
    }));
    console.log(chalk.green('Compiled successfully.'));
  });
};

const printErrors = (summary, errors) => {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach((error) => {
    console.log(chalk.red(error.message || error));
    console.log();
  });
};
