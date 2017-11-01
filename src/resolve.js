module.exports = (wizardConfig) => ({
  extensions: [ '.js', '.scss', '.css' ],
  modules: [
    ...wizardConfig.input.directories.modules,
    'node_modules'
  ]
});
