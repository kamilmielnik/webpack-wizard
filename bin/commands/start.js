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

  console.log('webpack building...');
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    }
  }));

  app.use(webpackHotMiddleware(compiler));

  app.get('*', (request, response) => {
    response.sendFile(webpackWizardConfig.input.html);
  });

  app.listen(port, host, (error) => {
    if (error) {
      return console.log(chalk.red(error));
    }

    console.log(chalk.green(`web server is listening at http://${host}:${port}`));
  });
};
