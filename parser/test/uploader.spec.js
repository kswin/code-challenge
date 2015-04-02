var expect = require('chai').expect;
var fs = require('fs');
var exec = require('child_process').exec;

var rootDir = __dirname + '/..',
    script = rootDir + '/src/uploader.js',
    command; 

describe('Upload to /exercises api', function(){
    it('should throw error if non-json file is passed', function(done){
        command = [
            'node',
            script,
            rootDir + '/assets/test-data/not-csv.txt'
        ].join(' ');

        exec(command, function(error, stdout, stderr){
            expect(error).not.to.be.null;
            done();
        });
    });

    it('should throw error if json file has broken syntax', function(done){
        command = [
            'node',
            script,
            rootDir + '/assets/test-data/broken-syntax.json'
        ].join(' ');

        exec(command, function(error, stdout, stderr){
            expect(error).not.to.be.null;
            done();
        });
    });
});