var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');
var sinon = require('sinon');
var BadRequest = require('../../../src/middleware/errors/types/BadRequest');
var NotFound = require('../../../src/middleware/errors/types/NotFound');
var InternalServerError = require('../../../src/middleware/errors/types/InternalServerError');
var handlers = require('../../../src/middleware/errors/handlers');

describe('[Rest Api] Middleware Error Handlers', function(){
    var err, req, res, next;

    beforeEach(function(){
        req = undefined;
        res = httpMocks.createResponse();
        next = sinon.stub();
    });

    describe('notFoundHandler', function(){
        it('should set a 404 status code', function(){
            err = new NotFound('Entity not found.');

            handlers.notFoundHandler(err, req, res, next);

            expect(res.statusCode).to.be.equal(404);

            expect(JSON.parse(res._getData())).to.be.deep.equal({
                code: 404,
                message: 'Entity not found.'
            });

            expect(res._isJSON()).to.be.true;
        });

        it('call next for other error types', function(){
            err = new BadRequest();
            handlers.notFoundHandler(err, req, res, next);
            expect(next.calledWith(err)).to.be.true;
        });
    });

    describe('badRequestHandler', function(){
        it('should set a 400 status code', function(){
            err = new BadRequest('Bad request.');

            handlers.badRequestHandler(err, req, res, next);

            expect(res.statusCode).to.be.equal(400);

            expect(JSON.parse(res._getData())).to.be.deep.equal({
                code: 400,
                message: 'Bad request.'
            });
            expect(res._isJSON()).to.be.true;
        });

        it('call next other error types', function(){
            err = new InternalServerError();
            handlers.badRequestHandler(err, req, res, next);
            expect(next.calledWith(err)).to.be.true;
        });
    });

    describe('mongooseErrorHandler', function(){
        it('should set a 400 status code and parse the validation messages set by Mongoose', function(){
            err = {
                "message": "Exercise validation failed",
                "name": "ValidationError",
                "errors": {
                    "answer": {
                        "properties": {
                            "type": "required",
                            "message": "Path `{PATH}` is required.",
                            "path": "answer",
                            "value": ""
                        },
                        "message": "Path `answer` is required.",
                        "name": "ValidatorError",
                        "kind": "required",
                        "path": "answer",
                        "value": ""
                    }
                }
            };


            handlers.mongooseErrorHandler(err, req, res, next);

            expect(res.statusCode).to.be.equal(400);

            expect(JSON.parse(res._getData())).to.be.deep.equal({
                code: 400,
                message: 'Path `answer` is required.'
            });
            expect(res._isJSON()).to.be.true;
        });
    });

    describe('genericErrorHandler', function(){
        it('should set a 500 status code', function(){
            err = new InternalServerError('Server Error.');

            handlers.genericErrorHandler(err, req, res, next);

            expect(res.statusCode).to.be.equal(500);

            expect(JSON.parse(res._getData())).to.be.deep.equal({
                code: 500,
                message: 'Server Error.'
            });
            expect(res._isJSON()).to.be.true;
        });

        it('not call nextfor other error types', function(){
            err = new Error();
            handlers.genericErrorHandler(err, req, res, next);
            expect(next.calledWith(err)).to.be.false;
        });
    });
});