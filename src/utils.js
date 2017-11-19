const fs = require('fs');
const path = require('path');

const resolveCwdPath = (relativePath) => path.resolve(process.cwd(), relativePath);
const resolveCwdPathIfExists = (relativePath) => resolvePathIfExists(process.cwd(), relativePath);
const resolvePathIfExists = (...args) => {
  const filePath = path.resolve(...args);
  const fileExists = fs.existsSync(filePath);
  return fileExists ? filePath : undefined;
};

module.exports = {
  resolveCwdPath,
  resolveCwdPathIfExists,
  resolvePathIfExists
};
