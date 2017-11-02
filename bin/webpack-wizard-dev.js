#!/usr/bin/env node

const chalk = require('chalk');
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackWizard = require('../index.js');
const readConfig = require('./read-config');

const webpackWizardConfig = readConfig();
const webpackConfig = webpackWizard(webpackWizardConfig);
const compiler = webpack(webpackConfig);

const app = express();
const host = webpackWizardConfig.devHost || 'localhost';
const port = webpackWizardConfig.devPort || 3000;

app.use(webpackDevMiddleware(compiler, {
  compress: true,
  noInfo: true,
  historyApiFallback: true,
  hot: true,
  inline: true,
  open: true,
  publicPath: webpackConfig.output.publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  }
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', (request, response) => {
  response.sendFile(webpackWizardConfig.input.html || 'index.html');
});

app.listen(port, host, (error) => {
  if (error) {
    return console.log(chalk.red(error));
  }

  console.log(`App is listening at http://${host}:${port}`);
});
