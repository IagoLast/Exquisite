const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

function compare(output, original, threshold) {
    return new Promise(resolve => {
        const img1 = fs.createReadStream(output).pipe(new PNG()).on('parsed', doneReading);
        const img2 = fs.createReadStream(original).pipe(new PNG()).on('parsed', doneReading);

        let filesRead = 0;
        function doneReading() {
            // Wait until both files are read.
            if (++filesRead < 2) {
                return;
            }

            // Do the visual diff.
            const diff = new PNG({ width: img1.width, height: img2.height });
            const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold });

            resolve(numDiffPixels);
        }
    });
}


module.exports = { compare };
