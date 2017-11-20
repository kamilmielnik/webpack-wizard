const chalk = require('chalk');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = (argv, webpackConfig, webpackWizardConfig) => {
  const host = webpackWizardConfig.devHost;
  const port = webpackWizardConfig.devPort;
  const compiler = webpack(webpackConfig);
  const app = express();
  let isFirstBuildComplete = false;
  let isServerUp = false;

  console.log('Starting compilation...');
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: 'minimal',
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    }
  }));

  app.use(webpackHotMiddleware(compiler));

  compiler.plugin('done', () => {
    if (!isFirstBuildComplete && isServerUp) {
      logStartMessage();
    }

    isFirstBuildComplete = true;
  });

  app.get('*', (request, response) => {
    response.sendFile(webpackWizardConfig.input.html);
  });

  app.listen(port, host, (error) => {
    if (error) {
      return console.log(chalk.red(error));
    }

    if (isFirstBuildComplete) {
      logStartMessage();
    }

    isServerUp = true;
  });

  function logStartMessage() {
    console.log(chalk.green(`Web server is listening at http://${host}:${port}`));
  }
};
