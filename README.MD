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

```javascript
const exquisite = require('exquisite.js');
const delay = 2000; // Delay (ms) once the page is loaded
// Usage with mocha
describe('Image comparing', () => {
    it('Should return true when the reference and the url screenshot are equal', () => {
        // Reference image
        const input = path.resolve(__dirname, 'reference/i1.png');
        // Path where the screenshot will be saved
        const output = path.resolve(__dirname, 'reference/i1_out.png');
        // Url to take the screenshot
        const url = 'https://iago-carto.carto.com/builder/fe05bdc5-af40-4227-9944-ba31e3493728/embed';
        // Call exquisite.text(params)
        return exquisite.test({ input, output, url, delay })
            .then(imagesAreEqual => {
                // Delete the screenshot
                fs.unlinkSync(output);
                // Assert if screenshots were equal
                expect(imagesAreEqual).to.equal(true);
            });
        });
});
```