const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (webpackWizard, { resolveCwdPath }) => {
  const webpackConfig = webpackWizard({
    input: {
      favicon: resolveCwdPath('html/favicon.ico'),
      html: resolveCwdPath('html/index.html'),
      modules: [
        resolveCwdPath('src'),
        resolveCwdPath('src/modules')
      ]
    }
  });

  if (process.env.ANALYZE_BUNDLE) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
  }

  return webpackConfig;
};
