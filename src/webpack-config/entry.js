module.exports = (wizardConfig) => {
  const entry = [];

  if (wizardConfig.useBabelPolyfill) {
    entry.push('@babel/polyfill');
  }

  if (wizardConfig.isDev) {
    entry.push(
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      wizardConfig.input.jsDev
    );
    return entry;
  }

  entry.push(wizardConfig.input.js);
  return entry;
};
