const CDP = require('chrome-remote-interface');
const timeout = require('delay');

/**
 * Load a url in a headless chrome through the chrome-remote-interface (CDP).
 * @param {*} param0 
 */
async function load({ url, delay, viewportWidth, viewportHeight }) {
    // Start the Chrome Debugging Protocol
    const client = await CDP();
    // Verify version
    await checkVersion(CDP);
    const { Page } = await setUpClient(client, viewportWidth, viewportHeight);
    // Navigate to target page
    await Page.navigate({ url });
    // Wait for page load event to take screenshot
    await Page.loadEventFired();
    // Wait the delay
    await timeout(delay);
    // Return the client
    return client;
}

/**
 * Check the browser version.
 * This project is designed to run with chrome 60, otherwise a messsage will be shown.
 * @param {*} CDP 
 */
async function checkVersion(CDP) {
    const { Browser } = await CDP.Version();
    const browserVersion = Browser.match(/\/(\d+)/)[1];
    if (Number(browserVersion) <= 59) {
        console.warn(`This script requires Chrome 60, however you are using version ${browserVersion}. The script is not guaranteed to work and you may need to modify it.`);
    }
}

/**
 * Set up the CDP client.
 * Listen to Page, DOM, and Newtwork events and set custom viewport.
 * @param {*} client 
 * @param {*} opts 
 */
async function setUpClient(client, viewportWidth, viewportHeight) {
    const { DOM, Emulation, Network, Page } = client;
    await Page.enable();
    await DOM.enable();
    await Network.enable();
    await overrideViewport({ Emulation, viewportWidth, viewportHeight });
    return { Page, DOM, Network };
}

/**
 * Set a custom viewport in the browser.
 * @param {*} param0 
 */
async function overrideViewport({ Emulation, viewportWidth, viewportHeight }) {
    // Set up viewport resolution, etc.
    const deviceMetrics = {
        width: viewportWidth,
        height: viewportHeight,
        deviceScaleFactor: 0,
        mobile: false,
        fitWindow: false,
    };
    await Emulation.setDeviceMetricsOverride(deviceMetrics);
    await Emulation.setVisibleSize({
        width: viewportWidth,
        height: viewportHeight,
    });
}


module.exports = { load };