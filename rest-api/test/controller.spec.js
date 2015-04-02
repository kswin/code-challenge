var chai = require('chai');
var expect = chai.expect;
var httpMocks = require('node-mocks-http');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var BadRequest = require('../src/middleware/errors/types/BadRequest');
var NotFound = require('../src/middleware/errors/types/NotFound');

var controller; 

describe('[Rest Api] Endpoint logic', function(){
    var Exercise, 
        limitStub, 
        skipStub, 
        sortStub;

    beforeEach(function () {
        limitStub = {
            limit: sinon.stub()
        };

        skipStub = {
            skip: sinon.stub().returns(limitStub)
        };

        sortStub = {
            sort: sinon.stub().returns(skipStub)
        };

        Exercise = {
            find: sinon.stub().returns(sortStub),
            create: sinon.stub(),
            findById: sinon.stub(),
            findByIdAndRemove: sinon.stub()
        };

        controller = proxyquire('../src/controller', { './model': Exercise });
    });

    describe('getExercises', function(){
        it('should call next for malformed queries', function(){
            var req = httpMocks.createRequest({
                 query: {
                     difficulty: 'diabolical'
                }
            });

            var res = httpMocks.createResponse();

            var next = sinon.spy();

            controller.getExercises(req, res, next);
            expect(next.called).to.be.true;
            expect(true).to.be.true;
        });

        it('should call find with criteria', function(){
            var req = httpMocks.createRequest({
                query: {
                    difficulty: 'easy',
                    keywords: 'addition'
                }
            });

            var res = httpMocks.createResponse();

            var next = sinon.spy();

            controller.getExercises(req, res, next);
            expect(next.called).to.be.false;    
            expect(Exercise.find.calledWith({
                keywords: {$eq: 'addition'},
                difficulty: {$eq: 'easy'}
            })).to.be.true;        
        });

        it('should call sort with sortString', function(){
            var req = httpMocks.createRequest({
                query: {
                    sort: '-created'
                }
            });

            var res = httpMocks.createResponse();

            var next = sinon.spy();

            controller.getExercises(req, res, next);

            expect(next.called).to.be.false;    
            expect(sortStub.sort.calledWith('-created')).to.be.true;        
        });

        it('should call offset with sanitizedOffset', function(){
            var req = httpMocks.createRequest({
                query: {
                    offset: '11'
                }
            });

            var res = httpMocks.createResponse();

            var next = sinon.spy();

            controller.getExercises(req, res, next);

            expect(next.called).to.be.false;    
            expect(skipStub.skip.calledWith(11)).to.be.true;        
        });

        it('should call limit with sanitizedLimit', function(){
            var req = httpMocks.createRequest({
                query: {
                    limit: '5'
                }
            });

            var res = httpMocks.createResponse();

            var next = sinon.spy();

            controller.getExercises(req, res, next);

            expect(next.called).to.be.false;    
            expect(limitStub.limit.calledWith(5)).to.be.true;        
        });
    });

    describe('getExerciseById', function(){
        it('should call findById on request\'s id param', function(){
            var req = httpMocks.createRequest({
                params: {
                    id: '1234'
                }
            });

            var res = httpMocks.createResponse();

            var next = sinon.spy();

            controller.getExerciseById(req, res, next);

            expect(next.called).to.be.false;    
            expect(Exercise.findById.calledWith('1234')).to.be.true;
        });
    });

    describe('createExercise', function(){
        it('should call create on request body', function(){
            var mockBody = {
                answer: '12'
            };

            var req = httpMocks.createRequest({
                body: mockBody
            });

            var res = httpMocks.createResponse();

            var next = sinon.spy();

            controller.createExercise(req, res, next);

            expect(next.called).to.be.false;    
            expect(Exercise.create.calledWith(mockBody)).to.be.true;     
        });
    });

    describe('deleteExerciseById', function(){
        it('should call delete on request\'s id param', function(){
            var req = httpMocks.createRequest({
                params: {
                    id: '123'
                }
            });

            var res = httpMocks.createResponse();

            var next = sinon.spy();

            controller.deleteExerciseById(req, res, next);

            expect(next.called).to.be.false;    
            expect(Exercise.findByIdAndRemove.calledWith('123')).to.be.true;     
        });
    });
});