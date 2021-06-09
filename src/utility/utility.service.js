'use strict';

const { OG_TAGS } = require('../environment');

class HelperService {

    static isValidUrl (urlStr ) {
        return urlStr && /((http(s)?):\/\/[\w\.\/\-=?#]+)/i.test(urlStr);
    };

    static readMetaTag (el, name)  {
        const attr = el.getAttribute('name') || el.getAttribute('property');
        return attr === name ? el.getAttribute('content') : null;
    };

    static getImageUrlList ($, tag = 'og')  {

        const images = [];
        if (tag === 'og') {
            $.querySelectorAll('meta').forEach(function (el) {

                let propName = el.getAttribute('property') || el.getAttribute('name');
                let content = el.getAttribute('content');
                if (propName === 'og:image' || propName === 'og:image:url') {
                    images.push(content);
                }
            });
        }
        if (!images.length) {
            $.querySelectorAll('img').forEach(function (el) {
                const src = el.getAttribute('src');
                if (src && HelperService.isValidUrl(src)) {
                    images.push(src);
                }
            });
            
        }
        return images;
    };

    static setDefaultMetaIfOgNotExists(metas, ogTagContainer) {
        let siteMeta;
        for (let i = 0; i < metas.length; i++) {
            const el = metas[i];
            for (let metaKey in OG_TAGS) {
                if (!ogTagContainer[metaKey]) {
                    siteMeta = HelperService.readMetaTag(el, metaKey);
                    if (siteMeta) {
                        ogTagContainer[metaKey] = siteMeta;
                    }
    
                }
            }
        }
        return ogTagContainer;
    }
    
}

module.exports = HelperService;