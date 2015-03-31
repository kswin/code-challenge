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
});