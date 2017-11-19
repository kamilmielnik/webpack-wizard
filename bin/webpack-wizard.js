#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');
const webpackWizard = require('../src/index.js');
const createWebpackWizardConfig = require('../src/webpack-wizard-config');
const { resolveCwdPathIfExists } = require('../src/utils');

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
    command: 'boil <boilerplate>',
    desc: 'Use a predefined boilerplate',
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

function createCommandHandler(command) {
  return (argv) => {
    const webpackWizardConfig = readConfig(argv.config);
    const webpackConfig = webpackWizard(webpackWizardConfig);
    const script = require(`./commands/${command}`);
    return script(webpackConfig, createWebpackWizardConfig(webpackWizardConfig), argv);
  };
}

function readConfig(configPath) {
  const webpackWizardConfigPath = resolveCwdPathIfExists(configPath);

  if (!webpackWizardConfigPath) {
    console.log(chalk.yellow(`"${webpackWizardConfigPath}" does not exist, using the default config.`));
    return undefined;
  }

  return require(webpackWizardConfigPath);
}
