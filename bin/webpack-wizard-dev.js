#!/usr/bin/env node

const path = require('path');
const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackWizard = require('../index.js');

const cwd = process.cwd();
const webpackWizardConfigPath = path.resolve(cwd, 'webpack-wizard.config.js');
const webpackWizardConfig = require(webpackWizardConfigPath);
const webpackConfig = webpackWizard(webpackWizardConfig);
const compiler = webpack(webpackConfig);

const app = express();
const host = webpackWizardConfig.devHost;
const port = webpackWizardConfig.devPort;

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
  response.sendFile(webpackWizardConfig.input.files.html);
});

app.listen(port, host, (error) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(`App is listening at http://${host}:${port}`);
});
