const path = require('path');
// Require the package
const exquisite = require('../src');

// Path where the reference screenshot will be stored.
const output = path.resolve(__dirname, 'google.png');
// Url to take the screenshot from
const url = 'https://google.com';
// Get the reference
exquisite.getReference({ url, output }).then(console.log).catch(console.error);