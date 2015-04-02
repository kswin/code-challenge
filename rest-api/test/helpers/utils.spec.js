var expect = require('chai').expect;
var utils = require('../../src/helpers/utils');

describe('[Rest Api] General helper functions', function() {
    describe('isObjectEmpty', function() {
        it('should return true for empty objects', function() {
            expect(utils.isObjectEmpty({})).to.be.true;
        });
    });

    describe('parseInt', function() {
        it('should return number for string integer inputs', function() {
            expect(utils.parseInt('12345')).to.be.equal(12345);
            expect(utils.parseInt('-12345')).to.be.equal(-12345);
            expect(utils.parseInt(1234)).to.be.equal(1234);
            expect(utils.parseInt('Infinity')).to.be.equal(Infinity);
        });

        it('should return NaN for invalid inputs', function() {
            expect(isNaN(utils.parseInt(NaN))).to.be.true;
            expect(isNaN(utils.parseInt('hello'))).to.be.true;
            expect(isNaN(utils.parseInt(undefined))).to.be.true;
            expect(isNaN(utils.parseInt({}))).to.be.true;
        })
    });
});