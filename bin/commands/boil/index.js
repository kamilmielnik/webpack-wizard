const chalk = require('chalk');
const {
  copyBoilerplateFiles,
  createDirectoryIfNotExists,
  injectParametersToFile,
  installDependencies,
  installWebpackWizard
} = require('./utils');
const inquiryParameters = require('./inquiry-parameters');

module.exports = () => {
  inquiryParameters().then((answers) => {
    const { boilerplate, name } = answers;
    console.log(`Boiling "${boilerplate}"...`);
    createDirectoryIfNotExists(name);
    process.chdir(name);
    installWebpackWizard();
    copyBoilerplateFiles(boilerplate);
    installDependencies();
    injectParametersToFile('package.json', answers);
    injectParametersToFile('html/index.html', answers);
    console.log(chalk.green(`Boiling "${boilerplate}" complete.`));
  });
};
