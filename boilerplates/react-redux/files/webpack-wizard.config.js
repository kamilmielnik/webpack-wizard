const path = require('path');

module.exports = {
  input: {
    favicon: path.resolve(__dirname, 'html', 'favicon.ico'),
    html: path.resolve(__dirname, 'html', 'index.html'),
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'src', 'modules')
    ]
  }
};
