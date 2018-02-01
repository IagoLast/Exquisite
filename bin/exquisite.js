#!/usr/bin/env node
const exquisite = require('../src/exquisite.js');
const argv = require('minimist')(process.argv.slice(2));

if (argv.reference) {
    exquisite.getReference(argv).then(() => console.log('ok')).catch(console.error);
}
else {
    exquisite.test(argv).then(console.log).catch(console.error);
}