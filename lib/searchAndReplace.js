const fs = require('fs');

module.exports = (name) => {
  // Replace the name in the package.json file
  replaceInFile(`./${name}/package.json`, 'tktk-theme', name);

  // Replace the name that shows in WordPress theme name
  replaceInFile(
    `./${name}/style.css`,
    'TKTK',
    name.charAt(0).toUpperCase() + name.slice(1)
  );
  replaceInFile(`./${name}/style.css`, 'Britton Walker', '');
};

const replaceInFile = (file, search, replace) => {
  const data = fs.readFileSync(file, 'utf8');
  const result = data.replace(new RegExp(search, 'g'), replace);
  fs.writeFileSync(file, result, 'utf8');
};
