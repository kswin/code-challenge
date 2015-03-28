var fs = require('fs'),
    through = require('through2'),
    split = require('split'),
    util = require('./util'),
    exports = module.exports = {},
    file = fs.createWriteStream('output.json'),
    http = require('http');

exports.csvToJson = function(filename){
    var lineNumber = 0,
        columnHeaders = [],
        parseCsvLine,
        createExercise;

    createExercise = function(exercise){
        var exerciseString,
            headers,
            options;

        exerciseString = JSON.stringify(exercise);

        headers = {
            'Content-Type': 'application/json',
            'Content-Length': exerciseString.length
        };

        options = {
          path: '/exercises',
          port: process.env.PORT || '3000', //TODO duplicated in bin/www
          method: 'POST',
          headers: headers
        };

        var request = http.request(options, function(response){
            response.setEncoding('utf-8');

            var responseString = '';

            response.on('data', function(data) {
                responseString += data;
            });

            response.on('end', function() {
                var resultObject = JSON.parse(responseString);
                console.log('Posted: ' + resultObject);
            });
        });

        request.on('error', function(e) {
            // TODO: handle error.
        });

        request.write(exerciseString);
        request.end();
    };


    parseCsvLine = through(function(buffer, encoding, next){
        var line = buffer.toString(),
            columnValues = [];

        if (!util.validatePipeOccurences(line)){
            console.log('Invalid row: ' + line);
            console.log('Skipping line: ' + lineNumber);
        } else {
            columnValues = line.split('|');

            if(lineNumber === 0 && util.areHeaderColumnsValid(columnValues)) {
                columnHeaders = columnValues;
            } else if (lineNumber > 0 && util.areColumnsValid(columnValues)){
                var exercise = util.zipListsIntoJson(columnHeaders, columnValues);
                createExercise(exercise);
            } else {
                console.log('Invalid column values: ' + columnValues);
                console.log('Skipping line: ' + lineNumber);
            }
        }

        lineNumber++;
        next();
    });

    if(!util.hasCsvExtension(filename)){
        throw new Error('Unexpected file extension: ' + filename);
    }

    fs.createReadStream(filename)
        .pipe(split(util.trimTrailingCommas))
        .pipe(parseCsvLine);
};

exports.csvToJson(process.argv[2]);