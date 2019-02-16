const express = require('express');
const pg = require('postgres');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');

const app = express();

app.use('morgan');
app.use('bodyParser');
app.use('method-override');

module.exports = app;
