const HTML = require('node-html-parser');
const axios = require('axios');

const OgScrapper = require('./src/lib/og-scrapper');
const UtilityService = require('./src/utility/utility.service');


// Meta.parser('https://learnstartup.net/p/BJQWO5_Wnx', function (err, result) {

//     console.log(result);
// })


(async () => {

    const ogScrapper = new OgScrapper(HTML, UtilityService, axios);

    const scrapResponse = await ogScrapper.parse('https://www.youtube.com/watch?v=soGRyl9ztjI');

     console.log(JSON.stringify(scrapResponse, null, 3));


})();