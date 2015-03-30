var express = require('express');
var bodyParser = require('body-parser');
var exercises = require('./rest-api/src/routes');
var app = express();

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.use('/', exercises);

module.exports = app;
