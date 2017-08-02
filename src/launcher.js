const ChromeLauncher = require('chrome-launcher');

/**
 * Launches a debugging instance of Chrome.
 * @param {Number} port 
 * @param {String[]} flags 
 * @return {Promise<ChromeLauncher>}
 */
function launchChrome(port = 9222, flags = ['--disable-gpu', '--headless']) {
    return ChromeLauncher.launch({
        port: port,
        chromeFlags: flags
    });
}


module.exports = { launchChrome };