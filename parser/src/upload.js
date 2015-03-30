var fs = require('fs'),
  http = require('http'),
  generalHelpers = require('./helpers/general'),
  exerciseHelpers = require('./helpers/exercise');

var createExercises = function(exercises) {
    var headers,
      options;

    headers = {
      'Content-Type': 'application/json',
      'Content-Length': exercises.length
    };

    options = {
      path: '/exercises',
      port: process.env.PORT || '3000', //TODO duplicated in bin/www
      method: 'POST',
      headers: headers
    };

    var request = http.request(options, function(response) {
      response.setEncoding('utf-8');

      var fullResponse = '';

      response.on('data', function(data) {
        fullResponse += data;
      });

      response.on('end', function() {
        console.log('[upload: createExercises] full response: ' + fullResponse);
      });
    });

    request.on('error', function(e) {
      console.error('[upload: createExercises] error: ' + e);
    });

    request.write(exercises);
    request.end();
  };;

var fileToUpload = process.argv[2];

if (!generalHelpers.hasFileExtension(fileToUpload, 'json')) {
  throw new Error('Unexpected file extension: ' + fileToUpload);
}

fs.readFile(fileToUpload, 'utf8', function(err, data) {
  if (err) {
    console.error('[upload: readFile] error: ' + err);
    return;
  }

  if (!generalHelpers.isValidJsonString(data)) {
    throw new Error('JSON parse error');
  }

  createExercises(data);
});