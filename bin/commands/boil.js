const chalk = require('chalk');
const { execSync } = require('child_process');
const fs = require('fs-extra');

module.exports = (argv) => {
  const { boilerplate, name } = argv;
  console.log(`Boiling "${boilerplate}"...`);
  createDirectoryIfNotExists(name);
  process.chdir(name);
  createPackageJson(boilerplate, name);
  installWebpackWizard();
  installDependencies(boilerplate, 'dependencies', '--save');
  installDependencies(boilerplate, 'dev-dependencies', '--save-dev');
  copyBoilerplateFiles(boilerplate);
  console.log(chalk.green(`Boiling "${boilerplate}" complete.`));
};

const createDirectoryIfNotExists = (filepath) => {
  if (!fs.existsSync(filepath)) {
    console.log(`Creating "${filepath}" directory...`);
    fs.mkdirSync(filepath);
    console.log(chalk.green(`"${filepath}" directory created.`));
  }
};

const createPackageJson = (boilerplate, name) => {
  console.log('Creating "package.json"...');
  const json = getPackageJson(name);
  const stringifiedJson = JSON.stringify(json, null, 2);
  fs.writeFileSync('./package.json', stringifiedJson);
  console.log(chalk.green('"package.json" created.'));
};

const getPackageJson = (boilerplate, name) => ({
  name,
  version: '0.0.1',
  engines: {
    node: '>=6',
  },
  scripts: {
    'build': 'better-npm-run build',
    'start': 'better-npm-run start',
    'start:prod': 'better-npm-run start:prod'
  },
  betterScripts: {
    'build': {
      command: 'webpack-wizard build',
      env: {
        NODE_ENV: 'production'
      }
    },
    'start': {
      command: 'webpack-wizard start',
      env: {
        NODE_ENV: 'development'
      }
    },
    'start:prod': {
      command: 'http-server dist'
    }
  }
});

const installWebpackWizard = () => {
  console.log('Installing webpack-wizard...');
  execSync(`npm install --save-dev webpack-wizard`);
  console.log(chalk.green('webpack-wizard installed.'));
};

const installDependencies = (boilerplate, dependenciesType, npmInstallParam) => {
  console.log(`Installing ${dependenciesType}...`);
  const dependencies = readDependencies(boilerplate, `${dependenciesType}.json`);
  const dependenciesList = Object.keys(dependencies).reduce(
    (list, dependency) => list.concat([
      `${dependency}@${dependencies[dependency]}`
    ]),
    []
  );
  execSync(`npm install ${npmInstallParam} ${dependenciesList.join(' ')}`);
  console.log(chalk.green(`${dependenciesType} installed.`));
};

const readDependencies = (boilerplate, filename) => {
  const dependenciesPath = `./node_modules/webpack-wizard/boilerplates/${boilerplate}/${filename}`;
  const fileExists = fs.existsSync(dependenciesPath);
  const dependencies = fileExists ? JSON.parse(fs.readFileSync(dependenciesPath, 'utf-8')) : {};
  return dependencies;
};

const copyBoilerplateFiles = (boilerplate) => {
  try {
    console.log(`Copying "${boilerplate}" files...`);
    fs.copySync(`${getBoilerplatePath(boilerplate)}/files`, '.');
    console.log(chalk.green(`"${boilerplate}" files copied.`));
  } catch(error) {
    console.log(chalk.red(`Copying "${boilerplate}" files failed.\n${error}`));
  }
};

const getBoilerplatePath = (boilerplate) => `./node_modules/webpack-wizard/boilerplates/${boilerplate}`;
