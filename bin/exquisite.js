const exquisite = require('../src/exquisite.js');
const argv = require('minimist')(process.argv.slice(2));

exquisite.test(argv).then(console.log).catch(console.error);
