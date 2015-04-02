var expect = require('chai').expect;
var fs = require('fs');
var exec = require('child_process').exec;

var rootDir = __dirname + '/..',
    script = rootDir + '/src/parser.js',
    command; 

describe('Parser', function() {      
    it('should throw error if filename with incorrect extension is entered', function(done){
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

    it('should turn csv into expected json', function(done){
        var fileInput = rootDir + '/assets/test-data/simple-exercises.csv',
            fileOutput = rootDir + '/assets/test-data/simple-exercises.test-output.json',
            expectedFileOutput = rootDir + '/assets/test-data/simple-exercises.expected.json';

        command = [
            'node',
            script,
            fileInput,
            fileOutput
        ].join(' ');
 

        exec(command, function(error, stdout, stderr){
            expect(error).to.be.null;
            
            expect(fs.readFileSync(fileOutput, {encoding: 'utf8'}))
                .to.be.equal(fs.readFileSync(expectedFileOutput, {encoding: 'utf8'}));

            exec('rm ' + fileOutput, function(error, stdout, stdout){
                done();
            });
        });
    });
});