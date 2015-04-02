var fs = require('fs'),
    through = require('through2'),
    split = require('split'),
    rowHelpers = require('./helpers/row'),
    exerciseHelpers = require('./helpers/exercise'),
    generalHelpers = require('./helpers/general');

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

        row = rowHelpers.parseLine(buffer.toString());

        if(lineNumber === 0) {
            headers = row;
        } else if (lineNumber > 0){
            entry = row;

            exercise = generalHelpers.zipListsIntoJson(headers, entry);
            sanitizedExercise = exerciseHelpers.sanitizeExercise(exercise);
            
            if(exerciseHelpers.isValidExercise(sanitizedExercise)) {
                self.push(sanitizedExercise);
            }
        }

        lineNumber++;
        next();
    };

    if(!generalHelpers.hasFileExtension(fileSource, 'csv')){
        throw new Error('Unexpected file extension: ' + fileSource);
    }

    return fs.createReadStream(fileSource)
        .pipe(split(generalHelpers.trimTrailingCommas))
        .pipe(through.obj(transformCSVLineToJson))
        .on('data', function(data) {
            exercises.push(data);
        })
        .on('end', function(){
            return fs.writeFile(fileDestination || 'output.json', JSON.stringify(exercises, null, 4), "utf8");
        });
};

exports.parseCSV(process.argv[2], process.argv[3]);

