const resolvePathIfExists = require('./resolve-path-if-exists');

const resolveCwdPathIfExists = (relativePath) => resolvePathIfExists(process.cwd(), relativePath);

module.exports = resolveCwdPathIfExists;
