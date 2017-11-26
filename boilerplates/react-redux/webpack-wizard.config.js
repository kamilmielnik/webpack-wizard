module.exports = (webpackConfig, { resolveCwdPath }) => ({
  input: {
    favicon: resolveCwdPath('html/favicon.ico'),
    html: resolveCwdPath('html/index.html'),
    modules: [
      resolveCwdPath('src'),
      resolveCwdPath('src/modules')
    ]
  }
});
