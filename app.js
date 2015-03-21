var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var exercises = require('./routes/exercises');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', exercises);

mongoose.connect('mongodb://localhost/test', function(err) {
    if(err) {
        console.log('Connection error', err);
    } else {
        console.log('Connection successful');
    }
});

module.exports = app;
