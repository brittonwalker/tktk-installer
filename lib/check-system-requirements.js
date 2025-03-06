/**
 * Exgernal dependencies
 */
const shell = require('shelljs');

/**
 * Internal dependencies
 */
const log = require('./log');
const systemRequirements = require('../package.json');

function checkSystemRequirements() {
  const nodeVersion = parseInt(process.version.split('.')[0].slice(1), 10);

  if (nodeVersion < 20) {
    log.error(`Requires Node 20 or higher. Please update and try again.`);
    shell.exit(1);
  }

  const npmVersion = parseInt(
    shell.exec('npm -v', { silent: true }).stdout,
    10
  );

  if (npmVersion < 10) {
    log.error(`Requires npm 10 or higher. Please update and try again.`);
    shell.exit(1);
  }

  log.info(
    `\nSystem requirements met. Node ${nodeVersion} and npm ${npmVersion} detected.`
  );
}

module.exports = checkSystemRequirements;
