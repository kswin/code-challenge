var expect = require('chai').expect;
var helpers = require('../../src/middleware/helpers');

describe('[Rest Api] Exercise Helpers', function(){
    describe('getDifficulty', function(){
        it('should return hard when there are 4 or more distractors', function(){
            var distractors = ['a', 'b', 'c', 'd'];

            expect(helpers.getDifficulty(distractors)).to.be.equal('hard');

            distractors = ['a', 'b', 'c', 'd', 'e'];
            expect(helpers.getDifficulty(distractors)).to.be.equal('hard');
        });

        it('should return medium when there are 2-3 distractors', function(){
            var distractors = ['a', 'b', 'c'];

            expect(helpers.getDifficulty(distractors)).to.be.equal('medium');

            distractors = ['a', 'b'];
            expect(helpers.getDifficulty(distractors)).to.be.equal('medium');
        });

        it('should return easy when there is 1 distractors', function(){
            var distractors = ['a'];

            expect(helpers.getDifficulty(distractors)).to.be.equal('easy');
        });
    });

    describe('isValidDifficultyValue', function(){
        it('should return true for "hard", "medium" or "easy"', function(){
            expect(helpers.isValidDifficultyValue('hard')).to.be.true;
            expect(helpers.isValidDifficultyValue('medium')).to.be.true;
            expect(helpers.isValidDifficultyValue('easy')).to.be.true;
        });

        it('should return false for values not equal to "hard", "medium" or "easy"', function(){
            expect(helpers.isValidDifficultyValue('hrd')).to.be.false;
            expect(helpers.isValidDifficultyValue('')).to.be.false;
            expect(helpers.isValidDifficultyValue(undefined)).to.be.false;
        });
    });

    describe('isValidSortKeyList', function(){
        //what happens when sort on same key asc + desc?
        it('should return true for "created" and "-created"', function(){
            expect(helpers.isValidSortKeyList(['created', '-created'])).to.be.true;
        });

        it('should return true for "modified" and "-modified"', function(){
            expect(helpers.isValidSortKeyList(['modified', '-modified'])).to.be.true;
        });
        it('should return true for "difficulty" and "-difficulty"', function(){
            expect(helpers.isValidSortKeyList(['difficulty', '-difficulty'])).to.be.true;
        });

        it('should return false for invalid sort keys', function(){
            expect(helpers.isValidSortKeyList([]), '1').to.be.false;
            expect(helpers.isValidSortKeyList(['difficulty', '-creatd']), '2').to.be.false;
            expect(helpers.isValidSortKeyList(null), '3').to.be.false;
        });
    });

    describe('buildCriteria', function(){
        it('should return null for empty input', function(){
            expect(helpers.buildCriteria([])).to.be.null;
            expect(helpers.buildCriteria(undefined)).to.be.null;
            expect(helpers.buildCriteria(null)).to.be.null;
            expect(helpers.buildCriteria({})).to.be.null;
            expect(helpers.buildCriteria(0)).to.be.null;
        });

        describe('keywords', function(){
            it('should match any values specified in the given keywords array', function(){
                var requestQuery = {
                    keywords: ['math', 'addition']
                };

                expect(helpers.buildCriteria(requestQuery)).to.be.deep.equal({
                    keywords: {$in: ['math', 'addition']}
                });
            });

            it('should match values equal to the given keyword', function(){
                var requestQuery = {
                    keywords: 'multiplication'
                };

                expect(helpers.buildCriteria(requestQuery)).to.be.deep.equal({
                    keywords: {$eq: 'multiplication'}
                });
            });
        });

        describe('difficulty', function(){
            it('should throw error for invalid difficulty values', function(){
                var requestQuery = {
                    difficulty: 'diabolical'
                };

                expect(helpers.buildCriteria.bind(null, requestQuery))
                    .to.throw(/[Invalid Query Value]/);
            });

            it('should match values equal to the given difficulty', function(){
                var requestQuery = {
                    difficulty: 'medium'
                };

                expect(helpers.buildCriteria(requestQuery)).to.be.deep.equal({
                    difficulty: { $eq: 'medium' }
                });
            });
        });

        it('should build multi-key criteria', function(){
            var requestQuery = {
                difficulty: 'medium',
                keywords: 'addition'            
            };

            expect(helpers.buildCriteria(requestQuery)).to.be.deep.equal({
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

            expect(helpers.buildSortString.bind(null,requestQuery))
                .to.throw(/[Invalid Query Value]/);
        });

        it('should return string with valid keys delimited by spaces', function(){
            var requestQuery = {
                sort: 'created,-difficulty'        
            };

            expect(helpers.buildSortString(requestQuery)).to.be.equal('created -difficulty');
        });
    });

    describe('isObjectEmpty', function(){
        it('should return true for empty objects', function(){
            expect(helpers.isObjectEmpty({})).to.be.true;
        });
    });

    describe('parseInt', function(){
        it('should return number for string integer inputs', function(){
            expect(helpers.parseInt('12345')).to.be.equal(12345);
            expect(helpers.parseInt('-12345')).to.be.equal(-12345);
            expect(helpers.parseInt(1234)).to.be.equal(1234);
            expect(helpers.parseInt('Infinity')).to.be.equal(Infinity);
        });

        it('should return NaN for invalid inputs', function(){
            expect(isNaN(helpers.parseInt(NaN))).to.be.true;
            expect(isNaN(helpers.parseInt('hello'))).to.be.true;
            expect(isNaN(helpers.parseInt(undefined))).to.be.true;
            expect(isNaN(helpers.parseInt({}))).to.be.true;
        })
    });

    describe('getOffset', function(){
        it('should default to 0 for invalid inputs', function(){
            var requestQuery = {
                offset: NaN
            };

            expect(helpers.getOffset(requestQuery)).to.be.equal(0);

            requestQuery.offset = Infinity;

            expect(helpers.getOffset(requestQuery)).to.be.equal(0);

            requestQuery.offset = 'hello';

            expect(helpers.getOffset(requestQuery)).to.be.equal(0);
        });

        it('should return number for strings that represent finite integers', function() {
            var requestQuery = {
                offset: '12'
            };

            expect(helpers.getOffset(requestQuery)).to.be.equal(12);

            requestQuery.offset = '-12';

            expect(helpers.getOffset(requestQuery)).to.be.equal(-12);

            requestQuery.offset = '0';

            expect(helpers.getOffset(requestQuery)).to.be.equal(0);
        });
    });

    describe('getLimit', function(){
        it('should default to 20 for invalid inputs', function(){
            var requestQuery = {
                limit: NaN
            };

            expect(helpers.getLimit(requestQuery)).to.be.equal(20);

            requestQuery.limit = Infinity;

            expect(helpers.getLimit(requestQuery)).to.be.equal(20);

            requestQuery.limit = 'hello';

            expect(helpers.getLimit(requestQuery)).to.be.equal(20);
        });

        it('should return number for strings that represent finite integers', function() {
            var requestQuery = {
                limit: '12'
            };

            expect(helpers.getLimit(requestQuery)).to.be.equal(12);

            requestQuery.limit = '-12';

            expect(helpers.getLimit(requestQuery)).to.be.equal(-12);

            requestQuery.limit = '0';

            expect(helpers.getLimit(requestQuery)).to.be.equal(0);
        });
    });
});