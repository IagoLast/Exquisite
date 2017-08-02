/**
 * Parse command line arguments.
 * @param {*} argv 
 */
function parseArgs(argv) {
    let args = {};
    // Url parameter is required
    if (!argv.url) {
        throw new Error('url parameter was not provided.');
    }
    // Url where to take the screenshot from
    args.url = argv.url;
    // Emulated screen width
    args.viewportWidth = argv.viewportWidth || 1440;
    // Emulated screen height
    args.viewportHeight = argv.viewportHeight || 900;
    // Time to wait once the pageLoad event is fired
    args.delay = argv.delay || 2000;
    // Name of the saved screenshot
    args.output = argv.output || 'output.png';

    return args;
}


module.exports = { parseArgs };