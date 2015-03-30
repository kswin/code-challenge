var expect = require('chai').expect;
var util = require('../../src/helpers/column');

describe('Column Utility functions', function(){
    describe('isValidQuestionValue', function(){
        it('should return false for empty string or undefined', function(){
            expect(util.isValidQuestionValue('')).to.be.false;
            expect(util.isValidQuestionValue(undefined)).to.be.false;
        });

        it('should return true for correctly formatted question', function(){
            var addQuestion = 'What is 123 + 345?',
                multiplyQuestion = 'What is 123 * 345?',
                divideQuestion = 'What is 123 - 345?',
                subtractQuestion = 'What is 123 / 345?';

            expect(util.isValidQuestionValue(addQuestion)).to.be.true;
            expect(util.isValidQuestionValue(multiplyQuestion)).to.be.true;
            expect(util.isValidQuestionValue(divideQuestion)).to.be.true;
            expect(util.isValidQuestionValue(subtractQuestion)).to.be.true;
        });

        it('should return false if question uses unexpected operation', function(){
            var unexpectedOperatopn = 'What is 12 # 12?';
            expect(util.isValidQuestionValue(unexpectedOperatopn)).to.be.false;
        });

        it('should return false if question uses unexpected operands', function(){
            var unexpectedOperands = 'What is aa + bb?';
            expect(util.isValidQuestionValue(unexpectedOperands)).to.be.false;
        });

        it('should return false if question uses unexpected number of operands', function(){
            var unexpectedOperands = 'What is aa ++ bb?';
            expect(util.isValidQuestionValue(unexpectedOperands)).to.be.false;
        });

        it('should return false if question does not use "What is ...?" format', function(){
            var unexpectedQuestionFormat = 'Compute 12 + 14.';
            expect(util.isValidQuestionValue(unexpectedQuestionFormat)).to.be.false;

            unexpectedQuestionFormat = 'What is 12 + 14  ?';
            expect(util.isValidQuestionValue(unexpectedQuestionFormat)).to.be.false;
        });
    });

    describe('isValidAnswerValue', function(){
        it('should return false for empty string or undefined', function(){
            expect(util.isValidAnswerValue('')).to.be.false;
            expect(util.isValidAnswerValue(undefined)).to.be.false;
        });

        it('should return true for integers', function(){
            var positiveNum = '12234',
                negativeNum = '-123';

            expect(util.isValidAnswerValue(positiveNum), 'pos').to.be.true;
            expect(util.isValidAnswerValue(negativeNum), 'neg').to.be.true;
        });

        it('should return false for non-integers', function(){
            var alphaNumeric = "1k23d4";
            expect(util.isValidAnswerValue(alphaNumeric)).to.be.false;
        })
    });

    describe('isValidDistractorsValue', function(){
        it('should return false for empty array or undefined', function(){
            expect(util.isValidDistractorsValue([])).to.be.false;
            expect(util.isValidDistractorsValue(undefined)).to.be.false;
        });

        it('should return true for integers delimited by commas', function(){
            var validDistractors = ['123','-134','12233'];
            expect(util.isValidDistractorsValue(validDistractors)).to.be.true; 
        });

        it('should return false for non-integers', function(){
            var alphaNumeric = ['b33f','l0v3','d34d'];
            expect(util.isValidDistractorsValue(alphaNumeric)).to.be.false;
        });
    });
});