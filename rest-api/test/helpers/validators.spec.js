var expect = require('chai').expect;
var validators = require('../../src/helpers/validators');
var BadRequest = require('../../src/middleware/errors/types/BadRequest');

describe('[Rest Api] Middleware', function(){
    describe('validateDistractors', function(){
        it('should throw error if distractors list has duplicate values', function(){
            var distractors = ['-123', '12', '-123', '11'],
                answer = '11';

            expect(validators.validateDistractors.bind(null, distractors, answer))
                .to.throw('Distractor list should not have duplicate values');
        });

        it('should throw error if a value in distractors list matches the answer', function(){
            var distractors = ['123', '12', '1234', '11'],
                answer = '11';

            expect(validators.validateDistractors.bind(null, distractors, answer))
                .to.throw('Distractor should not match answer');
        });

        it('should throw error if distractors list is empty', function(){
            var distractors = [],
                answer = '11';

            expect(validators.validateDistractors.bind(null, distractors, answer))
                .to.throw('Distractor list should not be empty');
        });
    });

    describe('validateDifficultyValue', function(){
        it('should return true for "hard", "medium" or "easy"', function(){
            expect(validators.validateDifficultyValue('hard')).to.be.true;
            expect(validators.validateDifficultyValue('medium')).to.be.true;
            expect(validators.validateDifficultyValue('easy')).to.be.true;
        });

        it('should throw error values not equal to "hard", "medium" or "easy"', function(){
            expect(validators.validateDifficultyValue.bind(null, 'hrd')).to.throw(BadRequest);
            expect(validators.validateDifficultyValue.bind(null, '')).to.throw(BadRequest);
            expect(validators.validateDifficultyValue.bind(null, undefined)).to.throw(BadRequest);
        });
    });

    describe('validateSortKeys', function(){
        it('should return true for "created" and "-created"', function(){
            expect(validators.validateSortKeys(['created', '-created'])).to.be.true;
        });

        it('should return true "modified" and "-modified"', function(){
            expect(validators.validateSortKeys(['modified', '-modified'])).to.be.true;
        });
        it('should return true "difficulty" and "-difficulty"', function(){
            expect(validators.validateSortKeys(['difficulty', '-difficulty'])).to.be.true;
        });

        it('should throw error invalid sort keys', function(){
            expect(validators.validateSortKeys.bind(null, [])).to.throw(BadRequest);
            expect(validators.validateSortKeys.bind(null, ['difficulty', '-creatd'])).to.throw(BadRequest);
            expect(validators.validateSortKeys.bind(null, null)).to.throw(BadRequest);
        });
    });
});