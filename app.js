require('dotenv').config();

const express = require('express');
const helmet = require("helmet");
const metaFinderController = require('./src/meta-finder/meta-finder.controller');
const basicAuth = require('express-basic-auth')


const app = express();
const port = process.env.PORT || 3011;

app.use(helmet());
app.use(basicAuth({
    users: { 'admin': 'supersecret' }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', metaFinderController);


app.listen(port, () => {
    console.log(`Og meta finder listening at ${port}`);
  })

