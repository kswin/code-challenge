var expect = require('chai').expect;
var helpers = require('../../src/helpers/column');

describe('[Parser] Column helper functions', function(){
    describe('isValidQuestionValue', function(){
        it('should return false for empty string or undefined', function(){
            expect(helpers.isValidQuestionValue('')).to.be.false;
            expect(helpers.isValidQuestionValue(undefined)).to.be.false;
        });

        it('should return true for correctly formatted question', function(){
            var addQuestion = 'What is 123 + 345?',
                multiplyQuestion = 'What is 123 * 345?',
                divideQuestion = 'What is 123 - 345?',
                subtractQuestion = 'What is 123 / 345?';

            expect(helpers.isValidQuestionValue(addQuestion)).to.be.true;
            expect(helpers.isValidQuestionValue(multiplyQuestion)).to.be.true;
            expect(helpers.isValidQuestionValue(divideQuestion)).to.be.true;
            expect(helpers.isValidQuestionValue(subtractQuestion)).to.be.true;
        });

        it('should return false if question uses unexpected operation', function(){
            var unexpectedOperatopn = 'What is 12 # 12?';
            expect(helpers.isValidQuestionValue(unexpectedOperatopn)).to.be.false;
        });

        it('should return false if question uses unexpected operands', function(){
            var unexpectedOperands = 'What is aa + bb?';
            expect(helpers.isValidQuestionValue(unexpectedOperands)).to.be.false;
        });

        it('should return false if question uses unexpected number of operands', function(){
            var unexpectedOperands = 'What is aa ++ bb?';
            expect(helpers.isValidQuestionValue(unexpectedOperands)).to.be.false;
        });

        it('should return false if question does not use "What is ...?" format', function(){
            var unexpectedQuestionFormat = 'Compute 12 + 14.';
            expect(helpers.isValidQuestionValue(unexpectedQuestionFormat)).to.be.false;

            unexpectedQuestionFormat = 'What is 12 + 14  ?';
            expect(helpers.isValidQuestionValue(unexpectedQuestionFormat)).to.be.false;
        });
    });

    describe('isValidAnswerValue', function(){
        it('should return false for empty string or undefined', function(){
            expect(helpers.isValidAnswerValue('')).to.be.false;
            expect(helpers.isValidAnswerValue(undefined)).to.be.false;
        });

        it('should return true for integers', function(){
            var positiveNum = '12234',
                negativeNum = '-123';

            expect(helpers.isValidAnswerValue(positiveNum), 'pos').to.be.true;
            expect(helpers.isValidAnswerValue(negativeNum), 'neg').to.be.true;
        });

        it('should return false for non-integers', function(){
            var alphaNumeric = "1k23d4";
            expect(helpers.isValidAnswerValue(alphaNumeric)).to.be.false;
        })
    });

    describe('isValidDistractorsValue', function(){
        it('should return false for empty array or undefined', function(){
            expect(helpers.isValidDistractorsValue([])).to.be.false;
            expect(helpers.isValidDistractorsValue(undefined)).to.be.false;
        });

        it('should return true for integers delimited by commas', function(){
            var validDistractors = ['123','-134','12233'];
            expect(helpers.isValidDistractorsValue(validDistractors)).to.be.true; 
        });

        it('should return false for non-integers', function(){
            var alphaNumeric = ['b33f','l0v3','d34d'];
            expect(helpers.isValidDistractorsValue(alphaNumeric)).to.be.false;
        });
    });
});