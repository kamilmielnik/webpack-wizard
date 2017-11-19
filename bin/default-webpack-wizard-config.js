const resolveFilePathIfExists = require('../src/utils/resolve-file-path-if-exists');

const defaultWebpackWizardConfig = {
  devHost: 'localhost',
  devPort: 3000,
  input: {
    html: resolveFilePathIfExists(process.cwd(), 'index.html')
  }
};

module.exports = defaultWebpackWizardConfig;
