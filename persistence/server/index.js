const express = require('express');
const app = express();
// const api = require('./api');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cores = require('cores');

app.use('port', process.env.PORT || 7070);

app.use(bodyParser.json());


