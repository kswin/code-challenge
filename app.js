var express = require('express');
var bodyParser = require('body-parser');
var exercises = require('./routes/exercises');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.use('/', exercises);

module.exports = app;
