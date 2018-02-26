
const exquisite = require('../src/index');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, './references');
const FOLDERS = ['.'];
const BLACKLIST_FILES = ['invalid.html']; // Ignore this reference
const DELAY = 100;
const WIDTH = 400;
const HEIGHT = 300;
// Headless chrome with GPU only works with linux
const HEADLESS_FLAG = (process.platform === 'linux') ? '--headless' : '';


// Get references for all folders
FOLDERS.forEach(getReferences);

/**
 * Uses exquisite-sst from the command line to take screenshots of all html files on a folder
 * @param {*} folder
 */
function getReferences(folder) {
    const files = fs.readdirSync(path.join(__dirname, `./test-cases/${folder}`));

    files.forEach(file => {
        const filepath = path.resolve(__dirname, `./test-cases/${folder}/${file}`);
        if (file.endsWith('.html') && !BLACKLIST_FILES.includes(file)) {
            process.stdout.write(`Taking reference from ${file}\n`);
            exquisite.getReference({
                headless: HEADLESS_FLAG,
                url: `file://${filepath}`,
                output: `${OUTPUT_DIR}/${folder}/${file.replace('.html', '.png')}`,
                delay: DELAY,
                viewportWidth: WIDTH,
                viewportHeight: HEIGHT,
            });
        }
    });
}
