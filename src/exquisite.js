const puppeteer = require('puppeteer');
const Comparer = require('./comparer.js');
const ArgsParser = require('./args-parser.js');

/**
 * Launch the screenshot process.
 */
async function test(args) {
    var browser;
    try {
        args = ArgsParser.parseArgs(args);
        browser = await puppeteer.launch({
            headless: args.headless,
        });
        const page = await browser.newPage();
        await page.setViewport({ width: args.viewportWidth, height: args.viewportHeight });
        await page.goto(args.url);
        await page.waitFor(args.delay);
        await page.screenshot({ path: args.output });
        return Comparer.compare(args.output, args.input, args.threshold);
    } catch (err) {
        throw Error(err);
    } finally {
        _closeBrowser(browser);
    }

}

/**
 * Take screenshot and save it as reference image.
 */
async function getReference(args) {
    var browser;
    try {
        args = ArgsParser.parseArgs(args);
        browser = await puppeteer.launch({
            headless: args.headless,
        });
        const page = await browser.newPage();
        await page.setViewport({ width: args.viewportWidth, height: args.viewportHeight });
        await page.goto(args.url);
        await page.waitFor(args.delay);
        await page.screenshot({ path: args.output });
        return args.output;
    } catch (err) {
        throw new Error(err);
    } finally {
        _closeBrowser(browser);
    }
}

function _closeBrowser(browser) {
    if (browser) {
        browser.close();
    }
}

module.exports = { test, getReference };