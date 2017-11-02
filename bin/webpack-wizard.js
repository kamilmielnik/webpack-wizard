#!/usr/bin/env node

const chalk = require('chalk');
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackWizard = require('../index.js');
const readConfig = require('./read-config');

const webpackWizardConfig = readConfig();
const webpackConfig = webpackWizard(webpackWizardConfig);
const compiler = webpack(webpackConfig);

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

function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach((error) => {
    console.log(error.message || error);
    console.log();
  });
}
