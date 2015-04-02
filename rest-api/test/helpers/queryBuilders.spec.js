var expect = require('chai').expect;
var queryBuilders = require('../../src/helpers/queryBuilders');
var BadRequest = require('../../src/middleware/errors/types/BadRequest');

describe('[Rest Api] Query building functions', function() {
    describe('buildCriteria', function(){
        it('should return null for empty input', function(){
            expect(queryBuilders.buildCriteria([]), '1').to.be.null;
            expect(queryBuilders.buildCriteria(undefined), '2').to.be.null;
            expect(queryBuilders.buildCriteria(null), '3').to.be.null;
            expect(queryBuilders.buildCriteria({}), '4').to.be.null;
            expect(queryBuilders.buildCriteria(0), '5').to.be.null;
        });

        describe('keywords', function(){
            it('should match any values specified in the given keywords array', function(){
                var requestQuery = {
                    keywords: ['math', 'addition']
                };

                expect(queryBuilders.buildCriteria(requestQuery)).to.be.deep.equal({
                    keywords: {$in: ['math', 'addition']}
                });
            });

            it('should match values equal to the given keyword', function(){
                var requestQuery = {
                    keywords: 'multiplication'
                };

                expect(queryBuilders.buildCriteria(requestQuery)).to.be.deep.equal({
                    keywords: {$eq: 'multiplication'}
                });
            });
        });

        describe('difficulty', function(){
            it('should throw error for invalid difficulty values', function(){
                var requestQuery = {
                    difficulty: 'diabolical'
                };

                expect(queryBuilders.buildCriteria.bind(null, requestQuery))
                    .to.throw(BadRequest);
            });

            it('should match values equal to the given difficulty', function(){
                var requestQuery = {
                    difficulty: 'medium'
                };

                expect(queryBuilders.buildCriteria(requestQuery)).to.be.deep.equal({
                    difficulty: { $eq: 'medium' }
                });
            });
        });

        it('should build multi-key criteria', function(){
            var requestQuery = {
                difficulty: 'medium',
                keywords: 'addition'            
            };

            expect(queryBuilders.buildCriteria(requestQuery)).to.be.deep.equal({
                difficulty: { $eq: 'medium' },
                keywords: { $eq: 'addition' }
            });
        });
    });

    describe('buildSortString', function(){
        it('should throw error for invalid sort keys', function(){
            var requestQuery = {
                sort: '-hi,created'        
            };

            expect(queryBuilders.buildSortString.bind(null,requestQuery))
                .to.throw(BadRequest);
        });

        it('should return string with valid keys delimited by spaces', function(){
            var requestQuery = {
                sort: 'created,-difficulty'        
            };

            expect(queryBuilders.buildSortString(requestQuery)).to.be.equal('created -difficulty');
        });
    });

    describe('sanitizeOffset', function(){
        it('should default to 0 for invalid inputs', function(){
            expect(queryBuilders.sanitizeOffset(NaN)).to.be.equal(0);
            expect(queryBuilders.sanitizeOffset(Infinity)).to.be.equal(0);
            expect(queryBuilders.sanitizeOffset('hello')).to.be.equal(0);
        });

        it('should return number for strings that represent finite integers', function() {
            expect(queryBuilders.sanitizeOffset('12')).to.be.equal(12);
            expect(queryBuilders.sanitizeOffset('-12')).to.be.equal(-12);
            expect(queryBuilders.sanitizeOffset('0')).to.be.equal(0);
        });
    });

    describe('sanitizeLimit', function(){
        it('should default to 20 for invalid inputs', function(){
            expect(queryBuilders.sanitizeLimit(NaN)).to.be.equal(20);
            expect(queryBuilders.sanitizeLimit(Infinity)).to.be.equal(20);
            expect(queryBuilders.sanitizeLimit('hello')).to.be.equal(20);
        });

        it('should return number for strings that represent finite integers', function() {
            expect(queryBuilders.sanitizeLimit('12')).to.be.equal(12);
            expect(queryBuilders.sanitizeLimit('-12')).to.be.equal(-12);
            expect(queryBuilders.sanitizeLimit('0')).to.be.equal(0);
        });
    });
});