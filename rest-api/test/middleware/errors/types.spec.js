var expect = require('chai').expect;
var BadRequest = require('../../../src/middleware/errors/types/BadRequest');
var NotFound = require('../../../src/middleware/errors/types/NotFound');
var InternalServerError = require('../../../src/middleware/errors/types/InternalServerError');

describe('[Rest Api]: Custom Error Objects', function (argument) {
    describe('BadRequest', function(){
        it('name should be "BadRequest"', function(){
            try {
                throw new BadRequest(); 
            } catch (err) {
                expect(err.name).to.be.equal('BadRequest');
            }
        });

        it('should support custom messages', function(){
            try {
                throw new BadRequest('Incorrectly formed request.'); 
            } catch (err) {
                expect(err.message).to.be.equal('Incorrectly formed request.');
            }
        });

        it('should be instance of Error', function(){
            try {
                throw new BadRequest(); 
            } catch (err) {
                expect(err).to.be.instanceof(Error);
                expect(err).to.be.instanceof(BadRequest);
            }
        });
    });

    describe('NotFound', function(){
        it('name should be "NotFound"', function(){
            try {
                throw new NotFound(); 
            } catch (err) {
                expect(err.name).to.be.equal('NotFound');
            }
        });

        it('should support custom messages', function(){
            try {
                throw new NotFound('Entity not found.'); 
            } catch (err) {
                expect(err.message).to.be.equal('Entity not found.');
            }
        });

        it('should be instance of Error', function(){
            try {
                throw new NotFound(); 
            } catch (err) {
                expect(err).to.be.instanceof(Error);
                expect(err).to.be.instanceof(NotFound);
            }
        });
    });

    describe('InternalServerError', function(){
        it('name should be "InternalServerError"', function(){
            try {
                throw new InternalServerError(); 
            } catch (err) {
                expect(err.name).to.be.equal('InternalServerError');
            }
        });

        it('should support custom messages', function(){
            try {
                throw new InternalServerError('Unexpected failure.'); 
            } catch (err) {
                expect(err.message).to.be.equal('Unexpected failure.');
            }
        });

        it('should be instance of Error', function(){
            try {
                throw new InternalServerError(); 
            } catch (err) {
                expect(err).to.be.instanceof(Error);
                expect(err).to.be.instanceof(InternalServerError);
            }
        });
    });
});