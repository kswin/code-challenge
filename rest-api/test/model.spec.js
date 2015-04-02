var expect = require('chai').expect;
var Exercise = require('../src/model');

describe('[Rest Api] Exercise Methods', function(){
    var sampleExercise;

    describe('setDifficultyLevel', function(){
        it('should return hard when there are 4 or more distractors', function(){
            sampleExercise = new Exercise({
                question: 'What is 2 * 2?',
                answer: '4',
                distractors: ['1', '2', '3', '5']
            });

            sampleExercise.setDifficultyLevel();
            expect(sampleExercise.difficulty).to.be.equal('hard');

            sampleExercise.distractors = ['1', '2', '3', '5', '6'];
            expect(sampleExercise.difficulty).to.be.equal('hard');
        });

        it('should return medium when there are 2-3 distractors', function(){
            sampleExercise = new Exercise({
                question: 'What is 2 * 2?',
                answer: '4',
                distractors: ['1', '2', '3']
            });

            sampleExercise.setDifficultyLevel();
            expect(sampleExercise.difficulty).to.be.equal('medium');

            sampleExercise.distractors = ['1', '2'];
            expect(sampleExercise.difficulty).to.be.equal('medium');
        });

        it('should return easy when there is 1 distractors', function(){
            sampleExercise = new Exercise({
                question: 'What is 2 * 2?',
                answer: '4',
                distractors: ['1']
            });

            sampleExercise.setDifficultyLevel();
            expect(sampleExercise.difficulty).to.be.equal('easy');
        });
    });
});