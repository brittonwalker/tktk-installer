#!/usr/bin/env node

const program = require('commander');

const install = require('../lib/install');
const ver = require('../lib/ver');

program
  .usage('[options] <file>')
  .description('A commandline interface for installing the TKTK theme')
  .option('-v, --version', 'show version', ver, '')
  .action((file, options) => {
    console.log('usage: tktk-installer [-v|--version] <command> [<args>]');
    console.log('');
    console.log('Commands:');
    console.log('  install');
    console.log('');
    console.log('Options:');
    console.log('  -v, --version  output the version number');
    console.log('');
    console.log('Examples:');
    console.log('  $ tktk-installer install');
    console.log('');
    console.log('  $ tktk-installer -v');
    console.log('');
  });

program
  .command('install')
  .alias('i')
  .description('Install the TKTK theme in a local directory')
  .action(async () => {
    install();
  });

program.parse(process.argv);
