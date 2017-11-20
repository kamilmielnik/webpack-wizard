module.exports = (wizardConfig) => {
  if (wizardConfig.isDev) {
    return [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      wizardConfig.input.jsDev
    ];
  }

  return [
    'babel-polyfill',
    wizardConfig.input.js
  ];
};
