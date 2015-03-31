var expect = require('chai').expect;
var helpers = require('../src/helpers');

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

    describe('validateDistractors', function(){
        it('should throw error if distractors list has duplicate values', function(){
            var distractors = ['-123', '12', '-123', '11'],
                answer = '11';

            expect(helpers.validateDistractors.bind(null, distractors, answer))
                .to.throw('Distractor list should not have duplicate values');
        });

        it('should throw error if a value in distractors list matches the answer', function(){
            var distractors = ['123', '12', '1234', '11'],
                answer = '11';

            expect(helpers.validateDistractors.bind(null, distractors, answer))
                .to.throw('Distractor should not match answer');
        });

        it('should throw error if distractors list is empty', function(){
            var distractors = [],
                answer = '11';

            expect(helpers.validateDistractors.bind(null, distractors, answer))
                .to.throw('Distractor list should not be empty');
        });
    });
});