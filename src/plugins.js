const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (wizardConfig) => ([
  createDefinePlugin(wizardConfig),
  createHtmlPlugin(wizardConfig),
  ...(wizardConfig.isProd ? createProdPlugins : createDevPlugins)(wizardConfig)
]);

const createDefinePlugin = (wizardConfig) => new webpack.DefinePlugin({
  'process.env': wizardConfig.env
});

const createHtmlPlugin = (wizardConfig) => new HtmlWebpackPlugin({
  template: wizardConfig.input.files.html,
  filename: wizardConfig.output.html,
  favicon: wizardConfig.input.files.favicon,
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
  createStyleExtPlugin(),
  createUglifyPlugin(),
  createCopyPlugin(wizardConfig)
];

const createExtractTextPlugin = (wizardConfig) => new ExtractTextPlugin({
  allChunks: true,
  filename: wizardConfig.output.css,
  ignoreOrder: true
});

const createStyleExtPlugin = () => new StyleExtHtmlWebpackPlugin();

const createUglifyPlugin = () => new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  mangle: true,
  sourceMap: false
});

const createCopyPlugin = (wizardConfig) => new CopyWebpackPlugin([
  {
    from: wizardConfig.input.files.html
  }
]);

const createDevPlugins = () => [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
];
