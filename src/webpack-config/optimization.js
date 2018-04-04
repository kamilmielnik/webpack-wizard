module.exports = (wizardConfig) => ({
  namedModules: true,
  splitChunks: {
    name: 'vendor',
    minChunks: 2
  },
  noEmitOnErrors: true,
  concatenateModules: true
});
