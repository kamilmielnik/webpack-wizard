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
    handler: createCommandHandler('build', { needsConfig: true })
  })
  .command({
    command: 'start',
    desc: 'Start development server',
    handler: createCommandHandler('start', { needsConfig: true })
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

function createCommandHandler(command, { needsConfig = false } = {}) {
  return (argv) => {
    const script = require(`./commands/${command}`);
    if (needsConfig) {
      const webpackWizardConfig = readConfig(argv.config);
      const webpackConfig = webpackWizard(webpackWizardConfig);
      return script(argv, webpackConfig, createWebpackWizardConfig(webpackWizardConfig));
    }
    return script(argv);
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
