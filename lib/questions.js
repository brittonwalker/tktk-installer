const colors = require('colors');
const fs = require('fs');

const questions = [
  {
    type: 'confirm',
    name: 'location',
    message: `TKTK will install in ${colors.cyan.bold(
      process.cwd()
    )}, is that correct?`,
    default: true,
  },
  {
    type: 'input',
    name: 'name',
    message: `Enter your theme name:`,
    validate: (input) => {
      if (!input.trim()) return `\nTheme name cannot be empty.\n`;
      if (input.includes(' '))
        return `Theme name cannot contain spaces. Use dashes instead (e.g., my-theme).`;
      if (!/^[a-zA-Z0-9-_]+$/.test(input))
        return `Theme name can only contain letters, numbers, dashes (-), or underscores (_).`;
      if (input === 'tktk-theme')
        return `Theme name cannot be "tktk-theme". Choose a unique name.`;

      // Check if directory with the same name already exists
      if (fs.existsSync(input)) {
        return `A directory named "${input}" already exists. Please choose a different name.`;
      }

      return true;
    },
  },
];

module.exports = questions;
