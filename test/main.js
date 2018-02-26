const exquisite = require('../src/exquisite.js');
const path = require('path');
const expect = require('chai').expect;
const fs = require('fs');
const delay = 2000;
const threshold = 0.1;
const headless = process.platform === 'linux';
const REFERENCES_FOLDER = 'references';



// Use cloudinary to upload screenshots for manual debugging
// const cloudinary = require('cloudinary');

// cloudinary.config({
//     cloud_name: 'iagolast',
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });

describe('Image comparing', () => {
    xit('Should return true when the reference and the url screenshot are equal', () => {
        const input = path.resolve(__dirname, `${REFERENCES_FOLDER}/i1.png`);
        const output = path.resolve(__dirname, `${REFERENCES_FOLDER}/i1_out.png`);
        const url = 'https://team.carto.com/u/iago-carto/builder/b46188b2-8a5b-4816-9662-df832b416866/embed';
        return exquisite.test({ input, output, url, delay, threshold, headless }).then(actual => {
            // cloudinary.uploader.upload(input);
            // cloudinary.uploader.upload(output);
            expect(actual).to.equal(true);
            fs.unlinkSync(output);
        });
    });
    it('Should return false when the reference and the url screenshot are different', () => {
        const input = path.resolve(__dirname, `${REFERENCES_FOLDER}/i1.png`);
        const output = path.resolve(__dirname, `${REFERENCES_FOLDER}/i2_out.png`);
        const url = 'https://team.carto.com/u/iago-carto/builder/e28d1296-838e-11e7-894c-0ef7f98ade21/embed';
        return exquisite.test({ input, output, url, delay, threshold, headless }).then(actual => {
            fs.unlinkSync(output);
            expect(actual).to.equal(false);
        });
    });

    it('Should use the waitForFn parameter', () => {
        const input = path.resolve(__dirname, `./${REFERENCES_FOLDER}/waitForFn.png`);
        const output = path.resolve(__dirname, `${REFERENCES_FOLDER}/waitForFn_out.png`);
        const filepath = path.resolve(__dirname, `./test-cases/waitForFn.html`);
        const URL = `file://${filepath}`;
        const options = {
            input,
            output,
            url: URL,
            headless: headless,
            waitForFn: () => document.body.style.background === 'red', // eslint-disable-line
        };
        return exquisite.test(options).then(equal => {
            expect(equal).to.equal(true);
        });
    });
});
