const exquisite = require('../src/exquisite.js');
const path = require('path');
const expect = require('chai').expect;
const fs = require('fs');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'iagolast',
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



describe('Image comparing', () => {
    it('Should return true when the reference and the url screenshot are equal', () => {
        const input = path.resolve(__dirname, 'reference/i1.png');
        const output = path.resolve(__dirname, 'reference/i1_out.png');
        const url = 'http://example.com/';
        return exquisite.test({ input, output, url }).then(actual => {
            cloudinary.uploader.upload(input, { public_id: 'reference_1' });
            cloudinary.uploader.upload(output, { public_id: 'output_1' });
            expect(actual).to.equal(true);
            fs.unlinkSync(output);
        });
    });
    it('Should return false when the reference and the url screenshot are different', () => {
        const input = path.resolve(__dirname, 'reference/i1.png');
        const output = path.resolve(__dirname, 'reference/i2_out.png');
        const url = 'https://google.es';
        return exquisite.test({ input, output, url }).then(actual => {
            expect(actual).to.equal(false);
            fs.unlinkSync(output);
        });
    });
});