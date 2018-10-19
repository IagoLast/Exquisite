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
    if (args.browser) {
        return _browserCapture(args).then(() => Comparer.compare(args.output, args.input, args.threshold));
    }
    return _newCapture(args).then(() => Comparer.compare(args.output, args.input, args.threshold));
}

/**
 * Take screenshot and save it as reference image.
 * @return A string containing the path to the generated screenshot.
 */
function getReference(args) {
  if (args.browser) {
      return _browserCapture(args);
  }
  return _newCapture(args);
}

function browser(headless) {
    return puppeteer.launch({
        headless: headless || false
    });
}

function release(browser) {
    return _closeBrowser(browser);
}

/**
 * Re-uses a browser instance, open the given url and take an screenshot.
 * This screenshot is saved as `args.output`.
 */
function _browserCapture(args) {
    let page;
    args = ArgsParser.parseArgs(args);
    const browser = args.browser;

    return browser.newPage().then(function (_resp) {
        page = _resp;
        return _capture(page, args);
    }).then(function () {
        _closePage(page);
        return args.output;
    }).catch(function (err) {
        _closePage(page);
        throw Error(err);
    });
}

/**
 * Launch a headless chrome , open the given url and take an screenshot.
 * This screenshot is saved as `args.output`.
 */
function _newCapture(args) {
    let browser;
    args = ArgsParser.parseArgs(args);
    return puppeteer.launch({
        headless: args.headless
    }).then(function (_resp) {
        browser = _resp;
        return browser.newPage();
    }).then(function (page) {
        return _capture(page, args);
    }).then(function () {
        _closeBrowser(browser);
        return args.output;
    }).catch(function (err) {
        _closeBrowser(browser);
        throw Error(err);
    });
}

function _capture(page, args) {
    const viewport = {
        width: args.viewportWidth,
        height: args.viewportHeight,
        deviceScaleFactor: args.deviceScaleFactor
    };
    return page.setViewport(viewport).then(function () {
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
    });
}

function _closeBrowser(browser) {
    if (browser) {
        return browser.close();
    }
    return Promise.resolve();
}

function _closePage(page) {
    if (page) {
        page.close();
    }
}

module.exports = { test, getReference, browser, release };
