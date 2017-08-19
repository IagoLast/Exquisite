# Exquisite

Easy Screenshot testing.

## Instaling
Install the app as a regular node module, using `yarn` or `npm install` you must have graphicsmagick installed on your machine.

### Graphicsmagick
Graphicsmagick is the program used to compare the images and it must be installed in order to run exquisite.

Install Graphicsmagick in OSX

    brew install graphicsmagick

Install Graphicsmagick in debian/ubuntu

    sudo apt-get install graphicsmagick --fix-missing
    
## Testing

    yarn test
    
## Usage

Exquisite needs `"node": "^7.6.0"` and `graphicsmagic` installed.

### API

#### exquisite.test(params)
 - **params.url:** Url to take the screenshot from. Default: `undefined`. Required.
 - **params.input:** Path to the reference image. Default: `original.png`
 - **params.output:** Path where the screenshot is saved. Default: `output.png`
 - **params.delay:** Milliseconds to wait between the page-loaded event and the screenshot. Default: `0`
 - **params.viewportWidth:** With of the browser screen. Default: `1440`
 - **params.viewportHeight:** Height of the browser screen. Default: `900`

### Example 

```javascript
// Require the package
const exquisite = require('exquisite.js');
// Wait 2000 ms after the loaded event to take the screenshot
const delay = 2000; 

// Reference image
const input = path.resolve(__dirname, 'reference/i1.png');
// Path where the screenshot will be saved
const output = path.resolve(__dirname, 'reference/i1_out.png');
// Url to take the screenshot from
const url = 'https://iago-carto.carto.com/builder/fe05bdc5-af40-4227-9944-ba31e3493728/embed';
// Take the screenshot and compare it against the reference image.
exquisite.test({ input, output, url, delay }).then(imagesAreEqual => {
    // Delete the screenshot
    fs.unlinkSync(output);
    // Assert if screenshots were equal
    expect(imagesAreEqual).to.equal(true);
});
```


### Usage (CLI)

    node bin/exquisite.js --url http://www.google.es --input test/reference/i1.png
    