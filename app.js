var express = require('express');
var bodyParser = require('body-parser');
var exercises = require('./rest-api/src/routes');
var errorsHandlers = require('./rest-api/src/middleware/errors/handlers');
var app = express();

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.use('/', exercises);

app.use(errorsHandlers.notFoundHandler);
app.use(errorsHandlers.badRequestHandler);
app.use(errorsHandlers.mongooseErrorHandler);
app.use(errorsHandlers.genericErrorHandler);

module.exports = app;
