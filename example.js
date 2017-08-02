const exquisite = require('./src/exquisite.js');
const ArgsParser = require('./src/args-parser.js');

let options1 = ArgsParser.parseArgs({ url: 'http://localhost:5000/map0.png' });


exquisite.init(options1).then(result => console.log('options1: ', result));