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
            //[]
            //{} ? should this be valid
            //null
            //0
            //undefined
        });

        describe('keywords', function(){
            it('should match any values specified in the given keywords array');
            it('should match values equal to the given keyword');
        });

        describe('difficulty', function(){
            it('should return null for invalid difficulty values');
            it('should match values equal to the given difficulty');
        });
    });

    describe('buildSortString', function(){
        it('should return null for inputs that contain invalid sort keys');
        it('should return string delimited by spaces');
        it('should return string made of valid sort keys');
    });
});