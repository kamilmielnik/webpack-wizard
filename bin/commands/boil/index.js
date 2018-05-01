const chalk = require('chalk');
const path = require('path');
const {
  copyBoilerplateFiles,
  createDirectoryIfNotExists,
  injectParametersToFile,
  installDependencies,
  installWebpackWizard
} = require('./utils');
const inquiryParameters = require('./inquiry-parameters');

module.exports = () => inquiryParameters().then((answers) => {
  const { boilerplate, name } = answers;
  console.log(`Boiling "${boilerplate}"...`);
  createDirectoryIfNotExists(name);
  process.chdir(name);
  installWebpackWizard();
  copyBoilerplateFiles(boilerplate);
  const packageJsonFilepath = path.resolve(process.cwd(), 'package.json');
  const indexHtmlFilepath = path.resolve(process.cwd(), 'html/index.html');
  injectParametersToFile(packageJsonFilepath, answers);
  injectParametersToFile(indexHtmlFilepath, answers);
  installDependencies('development');
  installDependencies('production');
  console.log(chalk.green(`Boiling "${boilerplate}" complete.`));
});
