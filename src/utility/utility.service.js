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
        return images;
    };
    
}

module.exports = HelperService;