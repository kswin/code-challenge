var expect = require('chai').expect;
var util = require('../../src/helpers/exercise');

describe('Exercise Utility functions', function(){
    describe('sanitizeExercise', function() {
        it('should sanitize question property into string', function(){
            var exercise = {
                question: 1234,
                answer: '-2182',
                distractors: '3176,6529,6903'
            };

            var sanitizedExercise = util.sanitizeExercise(exercise);

            expect(sanitizedExercise.question).to.be.equal('1234');
        });
        
        it('should sanitize answer property into string', function(){
            var exercise = {
                question: 'What is 1754 - 3936?',
                answer: -2182,
                distractors: '3176,6529,6903'
            };

            var sanitizedExercise = util.sanitizeExercise(exercise);

            expect(sanitizedExercise.answer).to.be.equal('-2182');
        });

        it('should sanitize distractors property into array of strings', function(){
            var exercise = {
                question: 'What is 1754 - 3936?',
                answer: '-2182',
                distractors: '3176,6529,6903'
            };

            var sanitizedExercise = util.sanitizeExercise(exercise);

            expect(sanitizedExercise.distractors).to.be.deep.equal(['3176','6529','6903']);

            exercise.distractors = '3176,,6903';
            sanitizedExercise = util.sanitizeExercise(exercise);

            expect(sanitizedExercise.distractors).to.be.deep.equal(['3176','6903']);
        });

        it('return unchanged exercise if no sanitization is needed', function() {
            var exercise = {
                question: 'What is 1754 - 3936?',
                answer: '-2182',
                distractors: ['3176','6529','6903']
            };

            var sanitizedExercise = util.sanitizeExercise(exercise);

            expect(sanitizedExercise).to.be.deep.equal({
                question: 'What is 1754 - 3936?',
                answer: '-2182',
                distractors: ['3176','6529','6903']
            });
        });
    });

    describe('isValidExercise', function(){
        it('should return false for invalid question value', function() {
            var exercise = {
                question: 'bad question',
                answer: '-2182',
                distractors: '3176,6529,6903'
            };

            expect(util.isValidExercise(exercise)).to.be.false;
        });

        it('should return false for invalid answer value', function() {
            var exercise = {
                question: 'What is 1754 - 3936?',
                answer: -2182,
                distractors: '3176,6529,6903'
            };

            expect(util.isValidExercise(exercise)).to.be.false;
        });

        it('should return false for invalid distractors value', function() {
            var exercise = {
                question: 'bad question',
                answer: '-2182',
                distractors: '3176,6529,6903'
            };

            expect(util.isValidExercise(exercise)).to.be.false;

            exercise.distractors = '3176,6529,6903,,,';
            expect(util.isValidExercise(exercise)).to.be.false;


            exercise.distractors = 'b33f|l0v3|d34d';
            expect(util.isValidExercise(exercise)).to.be.false;

            exercise.distractors = ['b33f','l0v3','d34d'];
            expect(util.isValidExercise(exercise)).to.be.false;

            exercise.distractors = [3176,6529,6903];
            expect(util.isValidExercise(exercise)).to.be.false;
        });

        it('should return true for exercises with valid question, answer and distractors value', function() {
            var exercise = {
                question: 'What is 1754 - 3936?',
                answer: '-2182',
                distractors: ['3176','6529','6903']
            };

            expect(util.isValidExercise(exercise)).to.be.true;
        });
    });
});