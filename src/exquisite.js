const puppeteer = require('puppeteer');
const Comparer = require('./comparer.js');
const ArgsParser = require('./args-parser.js');

/**
 * Launch the screenshot process.
 */
function test(args) {
  return _capture(args, () => Comparer.compare(args.output, args.input, args.threshold));
}

/**
 * Take screenshot and save it as reference image.
 */
function getReference(args) {
    return _capture(args, () => args.output);
}

function _capture(args, fn) {
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
        return page.goto(args.url);
    }).then(function () {
        return page.waitFor(args.delay);
    }).then(function () {
        return page.screenshot({ path: args.output });
    }).then(function () {
        _closeBrowser(browser);
        return fn();
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
