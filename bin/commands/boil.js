const chalk = require('chalk');
const { execSync } = require('child_process');
const fs = require('fs');

module.exports = (webpackConfig, webpackWizardConfig, argv) => {
  const { boilerplate } = argv;
  console.log(chalk.yellow(`Boiling "${boilerplate}".`));
  installDependencies(boilerplate);
  installDevDependencies(boilerplate);
  console.log(chalk.green(`Boiling "${boilerplate}" complete.`));
};

const installDependencies = createDependenciesInstaller('dependencies.json', '--save');
const installDevDependencies = createDependenciesInstaller('dev-dependencies.json', '--save-dev');

const createDependenciesInstaller = (filename, npmInstallParam) => (boilerplate) => {
  const dependenciesPath = `./boilerplates/${boilerplate}/${filename}`;
  const dependencies = readDependencies(dependenciesPath);
  if (dependencies.length > 0) {
    execSync(`npm install ${npmInstallParam} ${dependencies.join(' ')}`);
  }
};

const readDependencies = (dependenciesPath) => {
  const fileExists = fs.existsSync(dependenciesPath);
  const dependenciesJson = fileExists ? require(dependenciesPath) : {};
  return Object.keys(dependenciesJson).reduce(
    (list, dependency) => list.concat([
      `${dependency}@${dependenciesJson[dependency]}`
    ]),
    []
  );
};
