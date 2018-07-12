const exquisite = require('../src/index');
const path = require('path');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;

const REFERENCES_FOLDER = 'references';
const WIDTH = 400;
const HEIGHT = 300;
const THRESHOLD = 0.1;
// Headless chrome with GPU only works with linux
const HEADLESS = (process.platform === 'linux');


describe('Browser acquire', () => {

    before(done => {
        exquisite.browser().then(_browser => {
            this.browser = _browser;
            done();
        });
    });

    after(done => {
        exquisite.release(this.browser).then(done);
    });

    it('Should have 0 different pixels when the images are equal', () => {
        const input = path.resolve(__dirname, `./${REFERENCES_FOLDER}/canvas.png`);
        const output = path.resolve(__dirname, `./${REFERENCES_FOLDER}/canvas_out.png`);
        const filepath = path.resolve(__dirname, `./test-cases/canvas.html`);
        const URL = `file://${filepath}`;
        const options = {
            browser: this.browser,
            input,
            output,
            url: URL,
            threshold: THRESHOLD,
            headless: HEADLESS,
            viewportWidth: WIDTH,
            viewportHeight: HEIGHT
        };
        return expect(exquisite.test(options)).to.eventually.eql(0)
    });

    it('Should have at least one different pixel when images are different', () => {
        const input = path.resolve(__dirname, `./${REFERENCES_FOLDER}/invalid.png`);
        const output = path.resolve(__dirname, `./${REFERENCES_FOLDER}/invalid_out.png`);
        const filepath = path.resolve(__dirname, `./test-cases/invalid.html`);
        const URL = `file://${filepath}`;
        const options = {
            browser: this.browser,
            input,
            output,
            url: URL,
            threshold: THRESHOLD,
            headless: HEADLESS,
            viewportWidth: WIDTH,
            viewportHeight: HEIGHT
        };
        return expect(exquisite.test(options)).to.eventually.be.at.least(1);
    });
});