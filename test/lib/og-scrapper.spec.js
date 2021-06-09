const sinon = require('sinon');
const { expect } = require('chai');

const OgScrapper = require('../../src/lib/og-scrapper');

const htmlParser = {
    parse: () => {
        return {
            querySelectorAll: () => {
                return [1, 3, 4];
            }
        }
    }
};
const axios = () => {
    return Promise.resolve({
        data: true
    })
};
const HelperService = {
    readMetaTag: () => true,
    setDefaultMetaIfOgNotExists: () => { return { a: 10} },
    getImageUrlList: () => []
}
const ogScrapper = new OgScrapper(htmlParser, HelperService, axios);
describe('Testing OgScrapper lib', () => {

    it('should return valid object for valid request for parse method', async () => {
        const result = await ogScrapper.parse('https://google.com');
        expect(result).to.be.a('object');
        expect(result.a).to.be.equal(10);
    });

    it('should return valid object for valid request for parse method', async () => {
        htmlParser.parse = undefined;
        try {
            await ogScrapper.parse('https://google.com');
        } catch (err) {
            expect(err).to.be.instanceOf(Error); 
        }
    });

});
