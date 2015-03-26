var fs = require('fs'),
    through = require('through2'),
    split = require('split'),
    util = require('./util'),
    exports = module.exports = {},
    file = fs.createWriteStream('output.json');

exports.csvToJson = function(filename){
    var lineNumber = 0,
        columnHeaders = [],
        parseCsvLine;

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
                console.log(util.zipListsIntoJson(columnHeaders, columnValues));
            } else {
                console.log('Invalid column values: ' + columnValues);
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