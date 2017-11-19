const resolveFilePathIfExists = require('./resolve-file-path-if-exists');

const resolveAbsolutePath = (relativePath) => resolveFilePathIfExists(process.cwd(), relativePath);

module.exports = resolveAbsolutePath;
