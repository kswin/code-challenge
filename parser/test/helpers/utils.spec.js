var expect = require('chai').expect;
var utils = require('../../src/helpers/utils');

describe('[Parser] General utility functions', function(){
    describe('trimTrailingCommas:', function(){
        it('should trim commas at the end of the given string', function(){
            var withTrailingCommas =  'hello world friend,,,,,,';

            expect(utils.trimTrailingCommas(withTrailingCommas)).to.be.equal('hello world friend');
        });

        it('should not remove commas in the middle of given string', function(){
            var withMiddleCommas = 'hello, world, friend';

            expect(utils.trimTrailingCommas(withMiddleCommas)).to.be.equal('hello, world, friend');
        });
    });

    describe('isEmptyString', function(){
        it('should return true if string is empty', function() {
            expect(utils.isEmptyString('')).to.be.true;
        });

        it('should return false for non-empty strings', function() {
            expect(utils.isEmptyString('hello world')).to.be.false;
        });
    });

    describe('hasEmptyString', function(){
        it('should return false if input does not have empty strings', function() {
            expect(utils.hasEmptyString([])).to.be.false;
            expect(utils.hasEmptyString(['hello world', 'some test'])).to.be.false;
        });

        it('should return true if input has empty string', function() {
            expect(utils.hasEmptyString(['hello world', '', ''])).to.be.true;  
        });
    });

    describe('removeEmptyStringsFromArray', function(){
        it('should return array without empty strings', function() {
            expect(utils.removeEmptyStringsFromArray([
                'hello',
                '',
                'world',
                '',
                ''
            ])).to.be.deep.equal([
                'hello',
                'world'
            ]);
        });
    });

    describe('zipListsIntoJson', function(){
        it('should throw error if keys is empty array, undefined or null', function(){
            var keys = undefined,
                values = ['val1', '', 'val2'];

            expect(utils.zipListsIntoJson.bind(null, keys, values)).to.throw(TypeError);

            keys = null;

            expect(utils.zipListsIntoJson.bind(null, keys, values)).to.throw(TypeError);    

            keys = [];
            expect(utils.zipListsIntoJson.bind(null, keys, values)).to.throw(TypeError);
        });

        it('should throw error if values is undefined or null', function(){
            var keys = ['key1', 'key2'],
                values = undefined;

            expect(utils.zipListsIntoJson.bind(null, keys, values)).to.throw(TypeError);

            values = null;

            expect(utils.zipListsIntoJson.bind(null, keys, values)).to.throw(TypeError);
        });

        it('should throw error if keys contains empty string', function(){
            var keys = ['key1', '', 'key2'],
                values = ['val1', '', 'val2'];

            expect(utils.zipListsIntoJson.bind(null, keys, values)).to.throw(Error);
        });

        it('should return json if inputs are valid', function(){
            var keys = ['key1', 'key2'],
                values = ['val1', 'val2'];

            expect(utils.zipListsIntoJson(keys, values))
                .to.be.deep.equal({
                    key1: 'val1',
                    key2: 'val2'
                });  
        });
    });

    describe('hasFileExtension:', function(){
        it('should return true if filename has given extension at the end', function(){
            expect(utils.hasFileExtension('my-filename.csv', 'csv'), 'first').to.be.true;
            expect(utils.hasFileExtension('my-filename.csv.csv', 'csv'), 'second').to.be.true;
        });

        it('should return false if filename does not have given extension at the end', function(){
            expect(utils.hasFileExtension('my-filename.txt', 'csv')).to.be.false;
            expect(utils.hasFileExtension('my-filename.csv.txt', 'csv')).to.be.false;
            expect(utils.hasFileExtension('my-filename.csv.csvtxt', 'csv')).to.be.false;
        });
    });

    describe('isValidJsonString', function(){
        it('should return true for json strings', function() {
            var jsonString = JSON.stringify([{
                "question": "What is 3009 * 5075?",
                "answer": "15270675",
                "distractors": [
                    "3572",
                    "9415"
                ]
            }, {
                "question": "What is 6324 * 4040?",
                "answer": "25548960",
                "distractors": [
                    "3952",
                    "3906",
                    "2694"
                ]
            }]);

            expect(utils.isValidJsonString(jsonString)).to.be.true;
        });

        it('should return false for non-json strings', function(){
            expect(utils.isValidJsonString(null), '1').to.be.false;
            expect(utils.isValidJsonString(undefined), '2').to.be.false;
            expect(utils.isValidJsonString(1234), '3').to.be.false;
            expect(utils.isValidJsonString({}), '4').to.be.false;
        });
    });
});