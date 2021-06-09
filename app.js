'use strict';

require('dotenv').config();

const serverless = require('serverless-http');
const express = require('express');
const helmet = require("helmet");
const basicAuth = require('express-basic-auth');

const metaFinderController = require('./src/meta-finder/meta-finder.controller');
const { BASIC_AUTH_CREDS } = require('./src/environment');

const app = express();
const port = process.env.PORT || 3011;

app.use(helmet());
app.use(basicAuth({
    users: { [BASIC_AUTH_CREDS[0]]: BASIC_AUTH_CREDS[1] }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', metaFinderController);


app.listen(port, () => {
    console.log(`Og meta finder listening at ${port}`);
  })

module.exports.handler = serverless(app);