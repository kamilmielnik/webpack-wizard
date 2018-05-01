const chalk = require('chalk');
const { execSync } = require('child_process');
const fs = require('fs-extra');

const copyBoilerplateFiles = (boilerplate) => {
  try {
    console.log(`Copying "${boilerplate}" files...`);
    fs.copySync(`${getBoilerplatePath(boilerplate)}`, '.');
    console.log(chalk.green(`"${boilerplate}" files copied.`));
  } catch(error) {
    console.log(chalk.red(`Copying "${boilerplate}" files failed.\n${error}`));
  }
};

const getBoilerplatePath = (boilerplate) => `./node_modules/webpack-wizard/boilerplates/${boilerplate}`;

const createDirectoryIfNotExists = (filepath) => {
  if (!fs.existsSync(filepath)) {
    console.log(`Creating "${filepath}" directory...`);
    fs.mkdirSync(filepath);
    console.log(chalk.green(`"${filepath}" directory created.`));
  }
};

const injectParametersToFile = (filepath, parameters) => {
  console.log(`Updating "${filepath}..."`);
  const file = fs.readFileSync(filepath, 'utf-8');
  const updatedFile = Object.keys(parameters).reduce(
    (updated, key) => updated.replace(new RegExp(`\\$${key}`, 'g'), parameters[key]),
    file
  );
  fs.writeFileSync(filepath, updatedFile);
  console.log(chalk.green(`"${filepath}" updated.`));
};

const installDependencies = (only) => {
  console.log(`Installing ${only} dependencies...`);
  execSync(`npm install --only=${only}`, { stdio: [ 0, 1, 2 ] });
  console.log(chalk.green('Dependencies installed.'));
};

const installWebpackWizard = () => {
  console.log('Installing webpack-wizard...');
  execSync(`npm install webpack-wizard`, { stdio: [ 0, 1, 2 ] });
  console.log(chalk.green('webpack-wizard installed.'));
};

module.exports = {
  copyBoilerplateFiles,
  createDirectoryIfNotExists,
  injectParametersToFile,
  installDependencies,
  installWebpackWizard
};
