module.exports = (wizardConfig) => ({
  extensions: [ '.js', '.scss', '.css' ],
  modules: [
    ...wizardConfig.input.modules,
    'node_modules'
  ]
});
