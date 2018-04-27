const puppeteer = require('puppeteer');
const Comparer = require('./comparer.js');
const ArgsParser = require('./args-parser.js');

/**
 * Launch the screenshot process.
 * Take a screenshot and compare it against the reference image.
 * 
 * @return true when the images are equal, false otherwise.
 */
function test(args) {
    return _capture(args).then(() => Comparer.compare(args.output, args.input, args.threshold));
}

/**
 * Take screenshot and save it as reference image.
 * @return A string containing the path to the generated screenshot.
 */
function getReference(args) {
    return _capture(args);
}

/**
 * Launch a headless chrome , open the given url and take an screenshot.
 * This screenshot is saved as `args.output`.
 */
function _capture(args) {
    let page;
    let browser;
    args = ArgsParser.parseArgs(args);
    return puppeteer.launch({
        headless: args.headless
    }).then(function (_resp) {
        browser = _resp;
        return browser.newPage();
    }).then(function (_resp) {
        page = _resp;
        return page.setViewport({ width: args.viewportWidth, height: args.viewportHeight });
    }).then(function () {
        Object.keys(args.pageEvents).forEach(eventName => {
            page.on(eventName, args.pageEvents[eventName]);
        });
        if (args.consoleFn) {
            page.on('console', args.consoleFn);
        }
    }).then(function () {
        return page.goto(args.url);
    }).then(function () {
        if (args.waitForFn) {
            return page.waitForFunction(args.waitForFn);
        }
        return page.waitFor(args.delay);
    }).then(function () {
        return page.screenshot({ path: args.output });
    }).then(function () {
        _closeBrowser(browser);
        return args.output;
    }).catch(function (err) {
        _closeBrowser(browser);
        throw Error(err);
    });
}

function _closeBrowser(browser) {
    if (browser) {
        browser.close();
    }
}

module.exports = { test, getReference };
