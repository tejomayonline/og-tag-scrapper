
const { OG_TAGS } = require('../constants/constants');

    // {
    //     "title": "Apple iPhone 6, 16gb, Space Gray, Unlocked",
    //     "description": "Built on 64-bit desktop-class architecture, the new A8 chip delivers more power.",
    //     "images": [
    //     "http://amazon.com/sample_image1.jpg",
    //     "http: //amazon.com/sample_image2.jpg"
    //     ]
    //     }    

class OgScrapper {

    constructor(HTMLParser, HelperService, axios) {
        this.HTMLParser = HTMLParser;
        this.ogTagContainer = {};
        this.HelperService = HelperService;
        this.axios = axios;
    }

    async parse (siteUrl, ogPropList) {
        let requestToUrl = {
            method: 'get',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }

        };
        if (this.HelperService.isValidUrl(siteUrl)) {
            requestToUrl.url = siteUrl;
        }

        try {
            const { data: responseData } = await this.axios(requestToUrl);
            const ogTagContainer = {};
            const $ = this.HTMLParser.parse(responseData);
            ogTagContainer.images = this.HelperService.getImageUrlList($, 'og');
            const metas = $.querySelectorAll('meta');
            let ogPropValue;
            for (let i = 0; i < metas.length; i++) {
                const el = metas[i];
                ogPropValue = this.HelperService.readMetaTag(el, OG_TAGS.title);
                if (ogPropValue) {
                    ogTagContainer.title = ogPropValue;
                }
                ogPropValue = this.HelperService.readMetaTag(el, OG_TAGS.description);
                if (ogPropValue) {
                    ogTagContainer.description = ogPropValue;
                }
            }
            return ogTagContainer;
        } catch (err) {
            throw new Error(err);
        }
    }
}



module.exports = OgScrapper;