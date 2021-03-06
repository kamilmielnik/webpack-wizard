#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');
const webpackWizard = require('../src/index.js');
const { WEBPACK_WIZARD_CONFIG } = require('../src/constants');
const utils = require('../src/utils');

yargs
  .usage('$0 --config=[string]')
  .command({
    command: 'build',
    desc: 'Build production bundle',
    handler: createCommandHandler('build')
  })
  .command({
    command: 'start',
    desc: 'Start development server',
    handler: createCommandHandler('start')
  })
  .command({
    command: 'boil',
    desc: 'Start a new project with one of predefined boilerplates',
    handler: require('./commands/boil')
  })
  .option('config', {
    demandOption: false,
    default: 'webpack-wizard.config.js',
    describe: 'Path to webpack-wizard config',
    type: 'string'
  })
  .alias('v', 'version')
  .version()
  .help()
  .argv;

function createCommandHandler(command) {
  return (argv) => {
    const script = require(`./commands/${command}`);
    const webpackWizardConfig = readConfig(argv.config);
    const webpackConfig = webpackWizard(webpackWizardConfig);
    return script(argv, webpackConfig, webpackConfig[WEBPACK_WIZARD_CONFIG]);
  };
}

function readConfig(configPath) {
  const webpackWizardConfigPath = utils.resolveCwdPathIfExists(configPath);

  if (!webpackWizardConfigPath) {
    console.log(chalk.yellow(`"${webpackWizardConfigPath}" does not exist, default config will be used.`));
    return undefined;
  }

  const config = require(webpackWizardConfigPath);
  if (typeof config === 'function') {
    return config(webpackWizard, utils);
  }
  return config;
}
