/*
  External dependencies
*/
const shell = require('shelljs');
const path = require('path');

/*
  Internal dependencies
*/
const replaceInTheme = require('./searchAndReplace');
const checkSystemRequirements = require('./check-system-requirements');
const log = require('./log');
const colors = require('colors');

function installTheme(themeName) {
  checkSystemRequirements();

  log.info('\nCloning the TKTK theme repository...');
  const result = shell.exec(
    'git clone --quiet https://github.com/brittonwalker/tktk-theme.git',
    { silent: true }
  );

  if (result.code !== 0) {
    log.error('\n❌  Installation Failed\n');

    if (
      result.stderr.includes('destination path') &&
      result.stderr.includes('already exists')
    ) {
      log.error('⚠️  A folder with the same name already exists.\n');
      log.info('🛠  Try one of the following solutions:\n');
      log.info('   1️⃣  Delete the existing folder:');
      console.log(colors.cyan(`      $ rm -rf tktk-theme\n`));
      log.info('   2️⃣  Install the theme in a different directory:');
      console.log(
        colors.cyan(`      $ tktk-installer install --name new-theme\n`)
      );
    } else {
      log.error(`🔍 Git Error: ${result.stderr.trim()}\n`);
      log.info('➡️  Possible causes:');
      log.info(colors.yellow('   - Invalid repository URL'));
      log.info(colors.yellow('   - No internet connection'));
      log.info(colors.yellow('   - Authentication issue (if private repo)'));
    }

    shell.exit(1);
  }

  log.info('\nCleaning up repository...');
  shell.exec('rm -rf tktk-theme/.git');

  if (themeName !== 'tktk-theme') {
    shell.exec(`mv tktk-theme ${themeName} > /dev/null 2>&1`);
  }

  replaceInTheme(themeName);

  shell.pushd('-q', themeName);

  log.info('\nInstalling Node.js packages...');
  shell.exec('npm install --silent --no-progress 2> /dev/null');

  log.info('\nInstalling Composer packages...');
  shell.exec('composer install --no-progress --quiet 2>/dev/null');

  shell.popd('-q');

  const themePath = path.resolve(process.cwd(), themeName);

  log.success(
    `\nDone: WordPress theme "${themeName}" bootstrapped in the ${themePath} directory.\n`
  );

  log.info(`You can run several commands inside:\n`);

  console.log(colors.cyan(`  $ npm start`));
  console.log(`    Starts the build for development.\n`);

  console.log(colors.cyan(`  $ npm build`));
  console.log(`    Builds the code for production.\n`);

  console.log(colors.cyan(`  $ npm run format`));
  console.log(`    Formats files.\n`);

  console.log(colors.cyan(`  $ npm run lint:css`));
  console.log(`    Lints CSS files.\n`);

  console.log(colors.cyan(`  $ npm run lint:js`));
  console.log(`    Lints JavaScript files.\n`);

  console.log(colors.cyan(`  $ npm run theme-zip`));
  console.log(`    Creates a zip file for a WordPress theme.\n`);

  console.log(colors.cyan(`  $ npm run packages-update`));
  console.log(`    Updates WordPress packages to the latest version.\n`);

  log.success(`You can start development with:\n`);
  console.log(colors.cyan(`  $ npm start\n`));
}

module.exports = installTheme;
