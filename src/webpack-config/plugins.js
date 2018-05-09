const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (wizardConfig) => [
  createDefinePlugin(wizardConfig),
  createHtmlPlugin(wizardConfig),
  ...(wizardConfig.isProd ? createProdPlugins : createDevPlugins)(wizardConfig)
];

const createDefinePlugin = (wizardConfig) => new webpack.DefinePlugin({
  'process.env': wizardConfig.env
});

const createHtmlPlugin = (wizardConfig) => new HtmlWebpackPlugin({
  template: wizardConfig.input.html,
  filename: wizardConfig.output.html,
  favicon: wizardConfig.input.favicon,
  inject: true,
  hash: true,
  files: {
    css: [
      wizardConfig.output.css
    ],
    js: [
      wizardConfig.output.js
    ]
  }
});

const createProdPlugins = (wizardConfig) => [
  createExtractTextPlugin(wizardConfig),
  createCopyPlugin(wizardConfig)
];

const createExtractTextPlugin = (wizardConfig) => new ExtractTextPlugin({
  allChunks: true,
  filename: wizardConfig.output.css,
  ignoreOrder: true
});

const createCopyPlugin = (wizardConfig) => new CopyWebpackPlugin([
  {
    from: wizardConfig.input.html
  }
]);

const createDevPlugins = () => [
  new webpack.HotModuleReplacementPlugin()
];
