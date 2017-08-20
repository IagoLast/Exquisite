# Exquisite-sst

![Build Status](https://travis-ci.org/IagoLast/Exquisite.svg?branch=master)
![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)


Easy Screenshot testing.

Screenshot testing is a kind of end-to-end testing, where all the parts of your application are being tested.
Exquisite takes a screenshot of your webpage and compares it pixel by pixel against a reference image in a short amount of time.

Screenshot testing is useful in some environments where [snapshot-testing](https://facebook.github.io/jest/docs/snapshot-testing.html) or
even selenium cannot be used easily.

![map1](https://raw.githubusercontent.com/IagoLast/Exquisite/master/.images/example_1.png)

Think about checking if a map is well painted, where most of the components are fragments of images (tiles) mixed with vector graphics
where selenium only sees a `canvas` and the only way to know if the content is correct is the human eye.

![map2](https://raw.githubusercontent.com/IagoLast/Exquisite/master/.images/example_2.png)

Can you spot the differences in those two maps? Exquisite can (in less than 3 seconds!)

## Instaling
Exquisite needs `"node": "^7.6.0"` and `graphicsmagic` installed.

Install the app as a regular node module, using `yarn` or `npm install`.

Exquisite requires `graphicsmagic` installed on your machine.

### Graphicsmagick
[Graphicsmagick](http://www.graphicsmagick.org/) is the program used to compare the images and it must be installed in order to run exquisite.

Install Graphicsmagick in OSX

    brew install graphicsmagick

Install Graphicsmagick in debian/ubuntu

    sudo apt-get install graphicsmagick --fix-missing
    
## Testing
The tests are build to run on travis, dont worry if failing on your machine!

    yarn test
    

## API

### exquisite.test(params)
 - **params.url:** Url to take the screenshot from. Default: `undefined`. Required.
 - **params.input:** Path to the reference image. Default: `original.png`
 - **params.output:** Path where the screenshot is saved. Default: `output.png`
 - **params.delay:** Milliseconds to wait between the page-loaded event and the screenshot. Default: `0`
 - **params.viewportWidth:** With of the browser screen. Default: `1440`
 - **params.viewportHeight:** Height of the browser screen. Default: `900`

## Example 

```javascript
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
```


## CLI
Yo can use exquisite from the command line using the same parameters described in the [API](https://github.com/IagoLast/exquisite#api)

    npm install -g exquisite-sst
    exquisite-sst --url http://www.google.es --input google.png

## Using cloudinary for debugging.

When using exquisite in a CI environment like [travis](https://docs.travis-ci.com/) it could be useful to watch the screenshots of the failed tests.

You can use the [cloudinary](cloudinary.com) api to save and compare the taken screenshots.

```javascript
const exquisite = require('exquisite-sst');
const path = require('path');
const fs = require('fs');
const delay = 2000;


// Use cloudinary to upload screenshots for manual debugging
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



describe('Image comparing', () => {
    it('Should return true when the reference and the url screenshot are equal', () => {
        const input = path.resolve(__dirname, 'reference/i1.png');
        const output = path.resolve(__dirname, 'reference/i1_out.png');
        const url = 'https://iago-carto.carto.com/builder/fe05bdc5-af40-4227-9944-ba31e3493728/embed';
        return exquisite.test({ input, output, url, delay }).then(result => {
            // If the result is not the expected, upload the screenshots.
            if (!result) {
                cloudinary.uploader.upload(input);
                cloudinary.uploader.upload(output);
            }
            // Delete the taken screenshot
            fs.unlinkSync(output);
            // Make the test fail
            throw new Error(`${url}: Screenshot doesn't match!`);
        });
    });
});

```