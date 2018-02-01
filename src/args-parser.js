/**
 * Parse command line arguments.
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
    // Path of the reference image
    args.input = argv.input || 'original.png';
    // Name of the saved screenshot
    args.output = argv.output || 'output.png';
    // Delay in milliseconds since onLoad event to the screenshot.
    args.delay = argv.delay || 0;
    // Headless mode, defaults to false
    args.headless = argv.headless || false;

    return args;    
}


module.exports = { parseArgs };