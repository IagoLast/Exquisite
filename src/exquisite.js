const puppeteer = require('puppeteer');
const Comparer = require('./comparer.js');
const ArgsParser = require('./args-parser.js');

/**
 * Launch the screenshot process.
 * @param {*} args 
 */
async function test(args) {
    args = ArgsParser.parseArgs(args);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: args.viewportWidth, height: args.viewportHeight });
    await page.goto(args.url);
    await page.waitFor(args.delay);
    await page.screenshot({ path: args.output });
    browser.close();
    return Comparer.compare(args.output, args.input);
}

module.exports = { test };