var expect = require('chai').expect;
var validators = require('../../src/middleware/validators');

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
});