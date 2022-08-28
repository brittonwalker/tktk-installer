const inquirer = require('inquirer');
const shell = require('shelljs');
const process = require('process');
const colors = require('colors');
const fs = require('fs');

const replaceInTheme = require('../lib/searchAndReplace');

const questions = [
  {
    type: 'confirm',
    name: 'location',
    message: `TKTK will install in ${colors.bgRed(
      process.cwd()
    )}, is that correct?`,
    default: true,
  },
  {
    type: 'input',
    name: 'name',
    message: `The name of your theme`,
    default: false,
  },
];

module.exports = () => {
  console.log(``);
  console.log(`████████╗██╗░░██╗████████╗██╗░░██╗`);
  console.log(`╚══██╔══╝██║░██╔╝╚══██╔══╝██║░██╔╝`);
  console.log(`░░░██║░░░█████═╝░░░░██║░░░█████═╝░`);
  console.log(`░░░██║░░░██╔═██╗░░░░██║░░░██╔═██╗░`);
  console.log(`░░░██║░░░██║░╚██╗░░░██║░░░██║░╚██╗`);
  console.log(`░░░╚═╝░░░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝`);
  console.log(``);

  inquirer
    .prompt(questions)
    .then((answers) => {
      if (answers.location) {
        console.log(`Installing in ${process.cwd()}`);
      } else {
        console.log(
          `Not Installing in ${colors.bgRed(
            process.cwd()
          )}, please navigate to the correct directory and try again.`
        );
        shell.exit(1);
      }

      if (answers.name) {
        if (answers.name.indexOf(' ') > -1) {
          console.log(
            `${colors.bgRed(
              answers.name
            )} is not a valid name and cannot include spaces, please try again.`
          );
          shell.exit(1);
        } else {
          const nodeVersion = process.version.split('.')[0].slice(1);
          if (nodeVersion < 14) {
            console.log(
              `${colors.bgRed(
                'Requires Node 14 or higher, please switch your Node version and try again.'
              )}`
            );
            shell.exit(1);
          }
          console.log(
            `Installing theme directory name as ${colors.bgGreen(answers.name)}`
          );
          shell.exec(
            `git clone https://github.com/brittonwalker/tktk-theme.git`
          );
          shell.exec(`cd tktk-theme && rm -rf .git`);
          shell.exec(`mv tktk-theme ${answers.name}`);
          replaceInTheme(answers.name);
          console.log('');
          console.log(`Installing node packages...`.bgYellow);
          shell.exec(`cd ${answers.name} && npm install`);
          console.log('');
          console.log(`Installing composer packages...`.bgYellow);
          console.log('');
          shell.exec(`cd ${answers.name} && composer install`);
          console.log('');
          console.log(
            `Together, we have installed your theme as ${colors.bgGreen(
              answers.name
            )}, installed npm packages from the package.json, and installed your composer packages!!!`
          );
          console.log(
            `The last thing you need to do is to install the Timber plugin ${colors.bgYellow(
              '(https://wordpress.org/plugins/timber-library/)'
            )}. See the README.md for more info.`
          );
          console.log(
            `You're ready to start local development 💃. To do so, please run:`
          );
          console.log(`npm run start`.bgGreen);
        }
      } else {
        const nodeVersion = process.version.split('.')[0].slice(1);
        if (nodeVersion < 14) {
          console.log(
            `${colors.bgRed(
              'Requires Node 14 or higher, please switch your Node version and try again.'
            )}`
          );
          shell.exit(1);
        }
        shell.exec(`git clone https://github.com/brittonwalker/tktk-theme.git`);
        shell.exec(`cd tktk-theme && rm -rf .git`);
        console.log(`Installing node packages...`.bgYellow);
        shell.exec(`cd tktk-theme && npm install`);
        console.log('');
        console.log(`Installing composer packages...`.bgYellow);
        console.log('');
        shell.exec(`cd tktk-theme && composer install`);
        console.log('');
        console.log(
          `Together, we have installed your theme as ${colors.bgGreen(
            'tktk-theme'
          )}, installed npm packages from the package.json, and installed your composer packages!!!`
        );
        console.log(
          `The last thing you need to do is to install the Timber plugin ${colors.bgYellow(
            '(https://wordpress.org/plugins/timber-library/)'
          )}. See the README.md for more info.`
        );
        console.log(
          `You're ready to start local development 💃. To do so, please run:`
        );
        console.log(`npm run start`.bgGreen);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
