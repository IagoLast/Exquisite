const path = require('path');
const fs = require('fs');

// Require the package
const exquisite = require('../src');
// Wait 2000 ms after the loaded event to take the screenshot
const delay = 2000;
// Reference image
const input = path.resolve(__dirname, 'reference.png');
// Path where the screenshot will be saved
const output = path.resolve(__dirname, 'map.png');
// Url to take the screenshot from
const url = 'https://iago-carto.carto.com/builder/fe05bdc5-af40-4227-9944-ba31e3493728/embed';
// Take the screenshot and compare it against the reference image.
exquisite.test({ input, output, url, delay }).then(imagesAreEqual => {
    // Delete the screenshot
    fs.unlinkSync(output);
    // Log the result
    console.log(`Images are ${imagesAreEqual ? 'equal' : 'different'}`);
});