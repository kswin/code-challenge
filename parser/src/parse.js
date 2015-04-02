var fs = require('fs'),
    through = require('through2'),
    split = require('split'),
    rowUtils = require('./helpers/row'),
    exerciseUtils = require('./helpers/exercise'),
    utils = require('./helpers/utils');

exports.parseCSV = function(fileSource, fileDestination){
    var lineNumber = 0,
        headers,
        transformCSVLineToJson,
        exercises = [];

    transformCSVLineToJson = function (buffer, encoding, next) {
        var row,
            entry,
            exercise,
            sanitizedExercise,
            self = this;

        row = rowUtils.parseLine(buffer.toString());

        if(lineNumber === 0) {
            headers = row;
        } else if (lineNumber > 0){
            entry = row;

            exercise = utils.zipListsIntoJson(headers, entry);
            sanitizedExercise = exerciseUtils.sanitizeExercise(exercise);
            
            if(exerciseUtils.isValidExercise(sanitizedExercise)) {
                self.push(sanitizedExercise);
            }
        }

        lineNumber++;
        next();
    };

    if(!utils.hasFileExtension(fileSource, 'csv')){
        throw new Error('Unexpected file extension: ' + fileSource);
    }

    return fs.createReadStream(fileSource)
        .pipe(split(utils.trimTrailingCommas))
        .pipe(through.obj(transformCSVLineToJson))
        .on('data', function(data) {
            exercises.push(data);
        })
        .on('end', function(){
            return fs.writeFile(fileDestination || 'output.json', JSON.stringify(exercises, null, 4), "utf8");
        });
};

exports.parseCSV(process.argv[2], process.argv[3]);

