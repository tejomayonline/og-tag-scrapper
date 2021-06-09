const sinon = require('sinon');
const { expect } = require('chai');

const metFinderController = require('../../src/meta-finder/meta-finder.controller');

const OgScrapper = require('../../src/lib/og-scrapper');


describe('Testing meta finder controller', () => {
    let sandbox;
    let req;
    let res;
    let next;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            body: { url: 'https://github.com' },
        };
        res = {
            json: sandbox.stub()
        };
        next = sandbox.spy();
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('for invalid url it should return error response with 400 code', async () => {
        req.body.url = '...';
        await metFinderController(req, res, next);
        expect(res.json.calledOnce).to.be.true;
        const result = res.json.getCall(0).args[0];
        expect(result.error_code).to.equal(400);
        expect(result.error_message).to.equal('invalid URL');
    });

    it('should return error response with 500 code when OgScrapper throws an error', async () => {

        req.body.url = 'https://sinonjs.org/releases/latest/sandbox';
        sandbox.stub(OgScrapper.prototype, 'parse').throws(new Error('custom error'));
        await metFinderController(req, res, next);
        expect(res.json.calledOnce).to.be.true;
        const result = res.json.getCall(0).args[0];
        expect(result.error_code).to.equal(500);
        expect(result.error_message).to.equal('custom error');
    });

    it('should return json response if OgScrapper executes successfully', async () => {

        req.body.url = 'https://sinonjs.org/releases/latest/sandbox';
        sandbox.stub(OgScrapper.prototype, 'parse').resolves({ a: 10});
        await metFinderController(req, res, next);
        expect(res.json.calledOnce).to.be.true;
        const result = res.json.getCall(0).args[0];
        expect(result.a).to.equal(10);
    });
})
