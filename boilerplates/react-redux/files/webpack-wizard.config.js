const path = require('path');

module.exports = {
  env: {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  },
  input: {
    favicon: path.resolve(__dirname, 'html', 'favicon.ico'),
    html: path.resolve(__dirname, 'html', 'index.html')
  }
};
