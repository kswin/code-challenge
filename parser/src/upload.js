var fs = require('fs'),
    through = require('through2'),
    split = require('split'),
    main = require('./main'),
    exports = module.exports = {},
    file = fs.createWriteStream('output.json'),
    http = require('http');

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

main.parseCSV(process.argv[2]);