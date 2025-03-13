/**
 * External dependencies
 */
const { input, confirm } = require('@inquirer/prompts');
const shell = require('shelljs');
const colors = require('colors');
const fs = require('fs');

/**
 * Internal dependencies
 */
const log = require('./log');
const installTheme = require('./install-theme');

module.exports = async (themeName) => {
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
    try {
      // Confirm installation directory
      const locationConfirmed = await confirm({
        message: `TKTK will install in ${colors.cyan.bold(
          process.cwd()
        )}, is that correct?`,
        default: true,
      });

      if (!locationConfirmed) {
        log.error(
          `Installation cancelled. Please navigate to the correct directory and retry.`
        );
        shell.exit(1);
      }

      // Ask for theme name with validation
      const name = await input({
        message: 'Enter your theme name:',
        validate: async (input) => {
          if (!input.trim()) return 'Theme name cannot be empty.';
          if (input.includes(' '))
            return 'Theme name cannot contain spaces. Use dashes instead (e.g., my-theme).';
          if (!/^[a-zA-Z0-9-_]+$/.test(input))
            return 'Theme name can only contain letters, numbers, dashes (-), or underscores (_).';
          if (input === 'tktk-theme')
            return 'Theme name cannot be "tktk-theme". Choose a unique name.';
          if (fs.existsSync(input))
            return `A directory named "${input}" already exists. Please choose a different name.`;

          return true;
        },
      });

      installTheme(name);
    } catch (err) {
      log.error('An error occurred:');
      console.error(err);
    }
  }
};
