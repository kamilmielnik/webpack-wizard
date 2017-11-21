#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');
const webpackWizard = require('../src/index.js');
const { WEBPACK_WIZARD_CONFIG } = require('../src/constants');
const createWebpackWizardConfig = require('../src/webpack-wizard-config');
const utils = require('../src/utils');

yargs
  .usage('$0 --config=[string]')
  .command({
    command: 'build',
    desc: 'Build production bundle',
    handler: createCommandHandler('build', { needsConfigs: true })
  })
  .command({
    command: 'start',
    desc: 'Start development server',
    handler: createCommandHandler('start', { needsConfigs: true })
  })
  .command({
    command: 'boil <boilerplate> <name>',
    desc: 'Create a <name> project with a predefined boilerplate',
    handler: createCommandHandler('boil')
  })
  .option('config', {
    demandOption: false,
    default: 'webpack-wizard.config.js',
    describe: 'Path to webpack-wizard config',
    type: 'string'
  })
  .help()
  .argv;

function createCommandHandler(command, { needsConfigs = false } = {}) {
  return (argv) => {
    const script = require(`./commands/${command}`);
    if (needsConfigs) {
      const webpackWizardConfig = readConfig(argv.config);
      const webpackConfig = webpackWizard(webpackWizardConfig);
      return script(argv, webpackConfig, webpackConfig[WEBPACK_WIZARD_CONFIG]);
    }
    return script(argv);
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
