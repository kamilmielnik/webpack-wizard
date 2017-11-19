const fs = require('fs');
const path = require('path');

const resolveFilePathIfExists = (...args) => {
  const filePath = path.resolve(...args);
  const fileExists = fs.existsSync(filePath);
  return fileExists ? filePath : undefined;
};

module.exports = resolveFilePathIfExists;
