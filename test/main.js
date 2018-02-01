const exquisite = require('../src/exquisite.js');
const path = require('path');
const expect = require('chai').expect;
const fs = require('fs');
const delay = 2000;


// Use cloudinary to upload screenshots for manual debugging
// const cloudinary = require('cloudinary');

// cloudinary.config({
//     cloud_name: 'iagolast',
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });



describe('Image comparing', () => {
    it('Should return true when the reference and the url screenshot are equal', () => {
        const input = path.resolve(__dirname, 'reference/i1.png');
        const output = path.resolve(__dirname, 'reference/i1_out.png');
        const url = 'https://team.carto.com/u/iago-carto/builder/b46188b2-8a5b-4816-9662-df832b416866/embed';
        return exquisite.test({ input, output, url, delay }).then(actual => {
            // cloudinary.uploader.upload(input);
            // cloudinary.uploader.upload(output);
            expect(actual).to.equal(true);
            fs.unlinkSync(output);
        });
    });
    it('Should return false when the reference and the url screenshot are different', () => {
        const input = path.resolve(__dirname, 'reference/i1.png');
        const output = path.resolve(__dirname, 'reference/i2_out.png');
        const url = 'https://team.carto.com/u/iago-carto/builder/e28d1296-838e-11e7-894c-0ef7f98ade21/embed';
        return exquisite.test({ input, output, url, delay }).then(actual => {
            fs.unlinkSync(output);
            expect(actual).to.equal(false);
        });
    });
});