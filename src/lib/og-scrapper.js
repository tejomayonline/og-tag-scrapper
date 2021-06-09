'use strict';

const { OG_TAGS } = require('../environment');

class OgScrapper {

    constructor(HTMLParser, HelperService, axios) {
        this.HTMLParser = HTMLParser;
        this.HelperService = HelperService;
        this.axios = axios;
    }

    async parse (siteUrl) {
        try {
            const requestToUrl = {
                method: 'get',
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                },
                url: siteUrl
            };
            const { data: responseData } = await this.axios(requestToUrl);
            let ogTagContainer = {};
            const $ = this.HTMLParser.parse(responseData);
            ogTagContainer.images = this.HelperService.getImageUrlList($, 'og');
            const metas = $.querySelectorAll('meta');
            let ogPropValue;
            for (let i = 0; i < metas.length; i++) {
                const el = metas[i];
                for (let tagkey in OG_TAGS) {
                    ogPropValue = this.HelperService.readMetaTag(el, OG_TAGS[tagkey]);
                    if (ogPropValue) {
                        ogTagContainer[tagkey] = ogPropValue;
                    }
                }
            }
            ogTagContainer = this.HelperService.setDefaultMetaIfOgNotExists(metas, ogTagContainer);
            return ogTagContainer;
        } catch (err) {
            throw new Error(err);
        }
    }
}



module.exports = OgScrapper;