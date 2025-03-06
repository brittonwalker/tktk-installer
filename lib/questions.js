const colors = require('colors');

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
    message: `Enter your theme name:`,
    validate: (input) => {
      if (!input) return 'Theme name cannot be empty.';
      if (input.includes(' ')) return 'Theme name cannot contain spaces.';
      return true;
    },
  },
];

module.exports = questions;
