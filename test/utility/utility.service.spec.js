const sinon = require('sinon');
const { expect } = require('chai');

const HelperService = require('../../src/utility/utility.service');




describe('Testing UtilityService', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });

    describe('Testing isValidUrl method', () => {
        it('should return false for invalid URL', () => {
            const result = HelperService.isValidUrl('.....');
            expect(result).to.be.false;
        });
        it('should return true for invalid URL', () => {
            const result = HelperService.isValidUrl('https://sinonjs.org/releases/latest/sandbox');
            expect(result).to.be.true;
        });
    });

    describe('Testing readMetaTag method', () => {
        it('should return valid value when attribute found', () => {
            const el = { getAttribute: () => true };
            const result = HelperService.readMetaTag(el, true)
            expect(result).to.be.true;
        });
        it('should return true for invalid URL', () => {
            const el = { getAttribute: () => true };
            const result = HelperService.readMetaTag(el, 'abc')
            expect(result).to.be.equal(null);
        });
    });

    describe('Testing getImageUrlList method', () => {
        it('should return valid when og tag found', () => {
            const el = {
                querySelectorAll: () => {
                    return [{
                        getAttribute: () => 'og:image'
                    }];
                }
            };
            const result = HelperService.getImageUrlList(el, 'og')
            expect(result).to.be.a('array');
            expect(result[0]).to.be.equal('og:image');
        });

        it('should return valid when og tag found', () => {
            const el = {
                querySelectorAll: () => {
                    return [{
                        getAttribute: () => 'https://sinonjs.org/releases/latest/sandbox'
                    }];
                }
            };
            const result = HelperService.getImageUrlList(el, 'og')
            expect(result).to.be.a('array');
            expect(result[0]).to.be.equal('https://sinonjs.org/releases/latest/sandbox');
        });

 
    });
    
    describe('Testing setDefaultMetaIfOgNotExists method', () => {
        it('should return valid when og tag found', () => {
            const el = {
                querySelectorAll: () => {
                    return [{
                        getAttribute: () => 'og:image'
                    }];
                }
            };
            const metas = [1, 3, 5];
            const container = {};
            sandbox.stub(HelperService, 'readMetaTag').returns(true);
            const result = HelperService.setDefaultMetaIfOgNotExists(metas, container);
            expect(result).to.be.a('object');
            expect(result).to.have.all.keys(['title', 'description']);
        });
    });
})
