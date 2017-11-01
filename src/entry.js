module.exports = (wizardConfig) => {
  if (wizardConfig.isDev) {
    return [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      wizardConfig.input.files.jsDev
    ];
  }

  return wizardConfig.input.files.js;
};
