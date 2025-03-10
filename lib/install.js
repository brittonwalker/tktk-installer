/**
 * External dependencies
 */
const inquirer = require('inquirer');
const shell = require('shelljs');
const colors = require('colors');

/**
 * Internal dependencies
 */
const log = require('./log');
const questions = require('./questions');
const installTheme = require('./install-theme');

module.exports = (themeName) => {
  // console.clear();
  console.log(
    colors.cyan(`
████████╗██╗░░██╗████████╗██╗░░██╗
╚══██╔══╝██║░██╔╝╚══██╔══╝██║░██╔╝
░░░██║░░░█████═╝░░░░██║░░░█████═╝░
░░░██║░░░██╔═██╗░░░░██║░░░██╔═██╗░
░░░██║░░░██║░╚██╗░░░██║░░░██║░╚██╗
░░░╚═╝░░░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝
`)
  );

  if (themeName && themeName !== 'tktk-theme') {
    log.info(`Using custom theme name: ${themeName}`);
    installTheme(themeName);
  } else {
    inquirer
      .prompt(questions)
      .then((answers) => {
        if (!answers.location) {
          log.error(
            `Installation cancelled. Please navigate to the correct directory and retry.`
          );
          shell.exit(1);
        }

        installTheme(answers.name || 'tktk-theme');
      })
      .catch((err) => {
        log.error('An error occurred:');
        console.error(err);
      });
  }
};
