
const Launcher = require('./launcher.js');
const Browser = require('./browser.js');
const file = require('mz/fs');
const Comparer = require('./comparer.js');

/**
 * Launch the screenshot process.
 * @param {*} args 
 */
async function init(args) {
    const output = args.output;
    await Launcher.launchChrome();
    try {
        // Load Page
        var client = await Browser.load(args);
        // Take ScreenShot
        const screenshot = await takeScreenShot(client.Page, args.viewportWidth, args.viewportHeight);
        console.log('Screenshot taken');
        // Save image
        await saveImage({ screenshot, output });
        console.log('image saved');
        // Close the client
        client.close();
        // Return a boolean promise  pointing if the images were equal.
        return Comparer.compare(output);
    } catch (err) {
        if (client) {
            client.close();
        }
        console.error(err);
        process.exit(-1);
    }
}

/**
 * Take a png screenshot from the given Page.
 * @param {Page} Page 
 */
async function takeScreenShot(Page, width, height) {
    return await Page.captureScreenshot({
        format: 'png',
        fromSurface: true,
        clip: { width, height }
    });
}

/**
 * Save a image in the filesystem
 * @param {*} param0 
 */
async function saveImage({ screenshot, output }) {
    const buffer = new Buffer(screenshot.data, 'base64');
    await file.writeFile(output, buffer, 'base64');
}


module.exports = { init };