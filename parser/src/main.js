var fs = require('fs'),
    through = require('through2'),
    split = require('split'),
    util = require('./util'),
    exports = module.exports = {},
    file = fs.createWriteStream('output.json'),
    http = require('http');

exports.parseCSV = function(filename){
    var lineNumber = 0,
        columnHeaders,
        transformCSVLineToJson,
        exercises = [];

    transformCSVLineToJson = function (buffer, encoding, next) {
        var columnValues,
            sanitizedColumnValues,
            exercise;


        columnValues = util.parseLine(buffer.toString());

        if(lineNumber === 0) {
            columnHeaders = columnValues;
        } else if (lineNumber > 0){
            sanitizedColumnValues = util.sanitizeColumnValues(columnValues);
            exercise = util.zipListsToJson(columnHeaders, sanitizedColumnValues);
            exercises.push(exercise);
        }

        lineNumber++;
        next();
    });

    if(!util.hasCsvExtension(filename)){
        throw new Error('Unexpected file extension: ' + filename);
    }

    fs.createReadStream(filename)
        .pipe(split(util.trimTrailingCommas))
        .pipe(through(transformCSVLineToJson));
};

