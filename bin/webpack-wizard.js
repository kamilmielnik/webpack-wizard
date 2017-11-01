#!/usr/bin/env node

const path = require('path');
const webpack = require('webpack');
const express = require('express');
const webpackWizard = require('../index.js');

const cwd = process.cwd();
const webpackWizardConfigPath = path.resolve(cwd, 'webpack-wizard.config.js');
const webpackWizardConfig = require(webpackWizardConfigPath);
const webpackConfig = webpackWizard(webpackWizardConfig);
const compiler = webpack(webpackConfig);

let lastHash = null;

compiler.run((error, stats) => {
  if (error) {
    compiler.purgeInputFileSystem();
    lastHash = null;
    console.error(error.stack || error);
    if (error.details) {
      console.error(error.details);
    }
    process.exit(1);
  }

  if (stats.hash !== lastHash) {
    lastHash = stats.hash;
    var statsString = stats.toString();
    if (statsString) {
      process.stdout.write(`${statsString}\n`);
    }
  }

  if (stats.hasErrors()) {
    process.exitCode = 2;
  }
});
