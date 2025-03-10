#!/usr/bin/env node

const { program } = require('commander');
const packageJson = require('../package.json');
const install = require('../lib/install'); // Import install action

program
  .name('tktk-installer')
  .description('CLI tool for installing the TKTK WordPress theme')
  .version(packageJson.version, '-v, --version', 'Show version');

program
  .command('install')
  .alias('i')
  .description('Install the TKTK theme')
  .option('-t, --theme-name <name>', 'Specify a custom theme name')
  .action((options) => {
    install(options.themeName || 'tktk-theme'); // Pass theme name if provided
  });

program.parse(process.argv);
