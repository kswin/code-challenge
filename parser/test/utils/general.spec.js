var expect = require('chai').expect;
var util = require('../../src/utils/general');

describe('General Utility functions', function(){
    describe('trimTrailingCommas:', function(){
        it('should trim commas at the end of the given string', function(){
            var withTrailingCommas =  'hello world friend,,,,,,';

            expect(util.trimTrailingCommas(withTrailingCommas)).to.be.equal('hello world friend');
        });

        it('should not remove commas in the middle of given string', function(){
            var withMiddleCommas = 'hello, world, friend';

            expect(util.trimTrailingCommas(withMiddleCommas)).to.be.equal('hello, world, friend');
        });
    });

    describe('isEmptyString', function(){
        it('should return true if string is empty', function() {
            expect(util.isEmptyString('')).to.be.true;
        });

        it('should return false for non-empty strings', function() {
            expect(util.isEmptyString('hello world')).to.be.false;
        });

        it('should throw an error for invalid inputs', function() {
            expect(util.isEmptyString.bind(null, null)).to.throw(TypeError);
            expect(util.isEmptyString.bind(null, undefined)).to.throw(TypeError);
            expect(util.isEmptyString.bind(null, ['hello world'])).to.throw(TypeError);
            expect(util.isEmptyString.bind(null, {})).to.throw(TypeError);
        });
    });

    describe('hasEmptyString', function(){
        it('should throw error if input is not an array', function(){
            expect(util.hasEmptyString.bind(null, {})).to.throw(TypeError);
        });

        it('should throw error if array has non-string values', function(){
            expect(util.hasEmptyString.bind(null, ['test', {}])).to.throw(TypeError);
        });

        it('should return false if input does not have empty strings', function() {
            expect(util.hasEmptyString([])).to.be.false;
            expect(util.hasEmptyString(['hello world', 'some test'])).to.be.false;
        });

        it('should return true if input has empty string', function() {
            expect(util.hasEmptyString(['hello world', '', ''])).to.be.true;  
        });
    });

    describe('zipListsIntoJson', function(){
        it('should throw error if keys is undefined or null', function(){
            var keys = undefined,
                values = ['val1', '', 'val2'];

            expect(util.zipListsIntoJson.bind(null, keys, values)).to.throw(Error);

            keys = null;

            expect(util.zipListsIntoJson.bind(null, keys, values)).to.throw(Error);    
        });

        it('should throw error if values is undefined or null', function(){
            var keys = ['key1', 'key2'],
                values = undefined;

            expect(util.zipListsIntoJson.bind(null, keys, values)).to.throw(Error);

            values = null;

            expect(util.zipListsIntoJson.bind(null, keys, values)).to.throw(Error);
        });

        it('should throw error if keys contains empty string', function(){
            var keys = ['key1', '', 'key2'],
                values = ['val1', '', 'val2'];

            expect(util.zipListsIntoJson.bind(null, keys, values)).to.throw(Error);
        });

        it('should return json if inputs are valid', function(){
            var keys = ['key1', 'key2'],
                values = ['val1', 'val2'];

            expect(util.zipListsIntoJson(keys, values))
                .to.be.deep.equal({
                    key1: 'val1',
                    key2: 'val2'
                });  
        });
    });

    describe('hasFileExtension:', function(){
        it('should return true if filename has given extension at the end', function(){
            expect(util.hasFileExtension('my-filename.csv', 'csv'), 'first').to.be.true;
            expect(util.hasFileExtension('my-filename.csv.csv', 'csv'), 'second').to.be.true;
        });

        it('should return false if filename does not have given extension at the end', function(){
            expect(util.hasFileExtension('my-filename.txt', 'csv')).to.be.false;
            expect(util.hasFileExtension('my-filename.csv.txt', 'csv')).to.be.false;
            expect(util.hasFileExtension('my-filename.csv.csvtxt', 'csv')).to.be.false;
        });
    });
});