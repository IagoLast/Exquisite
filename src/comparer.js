const gm = require('gm');

/**
 * Compares two images pixel by pixel
 */
function compare(output, original) {
    if (!original) {
        throw new Error('Compare function expected a file path pointing to the reference image but received: ', original);
    }
    const options = { tolerance: 0.00000001 };
    return new Promise(function (resolve, reject) {
        gm.compare(original, output, options, function onImagesCompared(err, isEqual) {
            if (err) {
                return reject(err);
            }
            return resolve(isEqual);
        });
    });
}


module.exports = { compare };