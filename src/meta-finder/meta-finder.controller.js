'use strict';
const HTML = require('node-html-parser');
const axios = require('axios');

const OgScrapper = require('../lib/og-scrapper');
const UtilityService = require('../utility/utility.service');

module.exports = async (req, res) => {
    const { url } = req.body;
    const isUrlValid = UtilityService.isValidUrl(url);
    if (!isUrlValid) {
        console.log('invalid URL');
        return res.json({
            error_code: 400,
            error_message: 'invalid URL'
        });   
    }
    const ogScrapper = new OgScrapper(HTML, UtilityService, axios);
    try {
        const scrapResponse = await ogScrapper.parse(url);
        return res.json(scrapResponse);
    } catch (err) {
        console.log(err);
        return res.json({
            error_code: 500,
            error_message: err.message
        })
    }

}