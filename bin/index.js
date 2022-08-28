#!/usr/bin/env node

const program = require('commander');

const install = require('../lib/install');
const ver = require('../lib/ver');

program
  .usage('[options] <file>')
  .description('A commandline interface for installing the TKTK theme')
  .option('-v, --version', 'show version', ver, '')
  .action((file, options) => {
    console.log('file name: ', file);
  });

program
  .command('install')
  .alias('i')
  .description('Install the TKTK theme in a local directory')
  .action(function () {
    install();
  });

program.parse(process.argv);
