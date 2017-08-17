const gm = require('gm');

/**
 * Compares two images pixel by pixel
 * @param {*} output 
 */
function compare(output, original) {
    if (!original) {
        throw new Error('Compare function expected a file path pointing to the reference image but received: ', original);
    }
    const options = { tolerance: 0.00000001 };
    return new Promise(function (resolve, reject) {
        gm.compare(original, output, options, function (err, isEqual, difference, raw, path1, path2) {
            if (err) {
                reject(err);
            }
            // if the images were considered equal, `isEqual` will be true, otherwise, false.
            console.log('The images were equal: %s', isEqual);

            // to see the total equality returned by graphicsmagick we can inspect the `equality` argument.
            console.log('Actual difference: %d', difference);

            // inspect the raw output
            console.log(raw);

            // print file paths
            console.log(path1, path2);

            return resolve(isEqual);
        });
    });
}


module.exports = { compare };