module.exports = (wizardConfig) => {
  if (wizardConfig.isDev) {
    return [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      wizardConfig.input.jsDev
    ];
  }

  return wizardConfig.input.js;
};
