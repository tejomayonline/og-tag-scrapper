'use strict';
require('dotenv').config();
const ENV = process.env;
const BASIC_AUTH_CREDS = ENV.BASIC_AUTH_CREDS.split(':');
const metTagList = ENV.META_TAG_LIST.split(',');

const OG_TAGS = {};

let tagKeyValue;
metTagList.forEach(tag => {
    tagKeyValue = tag.split('_');
    OG_TAGS[tagKeyValue[0]] = tagKeyValue[1];
});


module.exports = {
    BASIC_AUTH_CREDS,
    OG_TAGS
};