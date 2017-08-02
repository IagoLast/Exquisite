const exquisite = require('./exquisite.js');
const argv = require('minimist')(process.argv.slice(2));
const ArgsParser = require('./args-parser.js');
const ARGS = ArgsParser.parseArgs(argv);

exquisite.init(ARGS).then(console.log);
