var fs = require('fs'),
    http = require('http'),
    generalHelpers = require('./helpers/general');

exports.createExercises = function(exercises){
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

    var request = http.request(options, function(response){
      response.setEncoding('utf-8');

      var fullResponse = '';

      response.on('data', function(data) {
        fullResponse += data;
      });

      response.on('end', function(){
        console.log(fullResponse);
      });
    });

    request.on('error', function(e) {
      console.log('[createExercises] error: ' + e);
    });
  
    request.write(exercises);
    request.end();
};

var fileToUpload = process.argv[2];

if(!generalHelpers.hasFileExtension(fileName, 'json')){
  throw new Error('Unexpected file extension: ' + fileName);
}

fs.readFile(fileToUpload, 'utf8', function (err, data) {
  if (err) {
    console.log('[readFile] error: ' + err);
    return;
  }

  if(!generalHelpers.isValidJson(data)) {
    throw new Error('JSON parse error');
  }

  exports.createExercises(data);
});

