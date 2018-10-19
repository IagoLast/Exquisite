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


describe('Screenshot tests:', () => {
    it('Should have 0 different pixels when the images are equal', () => {
        const input = path.resolve(__dirname, `./${REFERENCES_FOLDER}/canvas.png`);
        const output = path.resolve(__dirname, `./${REFERENCES_FOLDER}/canvas_out.png`);
        const filepath = path.resolve(__dirname, `./test-cases/canvas.html`);
        const URL = `file://${filepath}`;
        const options = { input, output, url: URL, threshold: THRESHOLD, headless: HEADLESS, viewportWidth: WIDTH, viewportHeight: HEIGHT };
        return expect(exquisite.test(options)).to.eventually.eql(0)
    });

    it('Should have at least one different pixel when images are different', () => {
        const input = path.resolve(__dirname, `./${REFERENCES_FOLDER}/invalid.png`);
        const output = path.resolve(__dirname, `./${REFERENCES_FOLDER}/invalid_out.png`);
        const filepath = path.resolve(__dirname, `./test-cases/invalid.html`);
        const URL = `file://${filepath}`;
        const options = { input, output, url: URL, threshold: THRESHOLD, headless: HEADLESS, viewportWidth: WIDTH, viewportHeight: HEIGHT };
        return expect(exquisite.test(options)).to.eventually.be.at.least(1);
    });

    it('Should wait for a condition to be true when waitForFn is passed as an argument', () => {
        const input = path.resolve(__dirname, `./${REFERENCES_FOLDER}/waitForFn.png`);
        const output = path.resolve(__dirname, `./${REFERENCES_FOLDER}/waitForFn_out.png`);
        const filepath = path.resolve(__dirname, `./test-cases/waitForFn.html`);
        const URL = `file://${filepath}`;
        const options = {
            waitForFn: () => document.body.style.background == 'red', // eslint-disable-line
            input, output, url: URL, threshold: THRESHOLD, headless: HEADLESS, viewportWidth: WIDTH, viewportHeight: HEIGHT
        };
        return expect(exquisite.test(options)).to.eventually.eql(0)
    });

    it('Should redirect the console to the consoleFn parameter when is passed as an argument', () => {
        const input = path.resolve(__dirname, `./${REFERENCES_FOLDER}/console.png`);
        const output = path.resolve(__dirname, `./${REFERENCES_FOLDER}/console_out.png`);
        const filepath = path.resolve(__dirname, `./test-cases/console.html`);
        const URL = `file://${filepath}`;
        const expected = 'CONSOLE_LOG';
        return new Promise((resolve, reject) => {
            const options = {
                consoleFn: msg => {
                    msg.text() === expected ? resolve() : reject(new Error(`expected '${msg.text()}' to equal '${expected}'`));
                },
                input, output, url: URL, threshold: THRESHOLD, headless: HEADLESS, viewportWidth: WIDTH, viewportHeight: HEIGHT
            };
            exquisite.test(options);
        });
    });

    it('Should allow hooking page events', () => {
        const input = path.resolve(__dirname, `./${REFERENCES_FOLDER}/errors.png`);
        const output = path.resolve(__dirname, `./${REFERENCES_FOLDER}/errors_out.png`);
        const filepath = path.resolve(__dirname, `./test-cases/errors.html`);
        const URL = `file://${filepath}`;
        return new Promise((resolve, reject) => {
            const options = {
                pageEvents: {
                    pageerror: err => {
                        if (err.message.match(/Top level error/)) {
                            return resolve();
                        }
                        reject(new Error(`Unexepected error message '${err.message}'`));
                    }
                },

                input, output, url: URL, threshold: THRESHOLD, headless: HEADLESS, viewportWidth: WIDTH, viewportHeight: HEIGHT
            };
            exquisite.test(options);
        });
    });

    it('Should generate the reference without errors', () => {
        const input = path.resolve(__dirname, `./${REFERENCES_FOLDER}/invalid.png`);
        const output = path.resolve(__dirname, `./${REFERENCES_FOLDER}/invalid_out.png`);
        const filepath = path.resolve(__dirname, `./test-cases/invalid.html`);
        const URL = `file://${filepath}`;
        const options = { input, output, url: URL, threshold: THRESHOLD, headless: HEADLESS, viewportWidth: WIDTH, viewportHeight: HEIGHT };
        return expect(() => {
          exquisite.getReference(options);
        }).not.throw();
    });

    it('Should honor the deviceScaleFactor option', () => {
        const input = path.resolve(__dirname, `./${REFERENCES_FOLDER}/canvas@2x.png`);
        const output = path.resolve(__dirname, `./${REFERENCES_FOLDER}/canvas@2x_out.png`);
        const filepath = path.resolve(__dirname, `./test-cases/canvas.html`);
        const URL = `file://${filepath}`;
        const options = {
            input,
            output,
            url: URL,
            threshold: THRESHOLD,
            headless: HEADLESS,
            viewportWidth: WIDTH,
            viewportHeight: HEIGHT,
            deviceScaleFactor: 2
        };
        return expect(exquisite.test(options)).to.eventually.eql(0)
    });
});
