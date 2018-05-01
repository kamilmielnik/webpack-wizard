const chalk = require('chalk');
const history = require('connect-history-api-fallback');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = (argv, webpackConfig, webpackWizardConfig) => {
  const url = `http://${webpackWizardConfig.devHost}:${webpackWizardConfig.devPort}`;
  const logStartMessage = () => console.log(chalk.green(`Web server is listening at ${url}`));
  const compiler = webpack(webpackConfig);
  const app = express();
  let isFirstBuildComplete = false;
  let isServerUp = false;

  app.use(history());

  console.log('Starting compilation...');
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: 'minimal',
    watchOptions: {
      aggregateTimeout: 100,
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

  app.listen(webpackWizardConfig.devPort, webpackWizardConfig.devHost, (error) => {
    if (error) {
      return console.log(chalk.red(error));
    }

    if (isFirstBuildComplete) {
      logStartMessage();
    }

    isServerUp = true;
  });
};
