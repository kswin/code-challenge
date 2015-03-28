// var expect = require('chai').expect;
// var util = require('../src/util');

// describe('Utility functions', function(){
//     describe('hasCsvExtension:', function(){
//         it('should return true if filename has .csv at the end', function(){
//             expect(util.hasCsvExtension('my-filename.csv')).to.be.true;
//             expect(util.hasCsvExtension('my-filename.csv.csv')).to.be.true;
//         });

//         it('should return false if filename does not have .csv at the end', function(){
//             expect(util.hasCsvExtension('my-filename.txt')).to.be.false;
//             expect(util.hasCsvExtension('my-filename.csv.txt')).to.be.false;
//         });
//     });

//     describe('trimTrailingCommas:', function(){
//         it('should trim commas at the end of the given string', function(){
//             var withTrailingCommas =  'hello world friend,,,,,,';

//             expect(util.trimTrailingCommas(withTrailingCommas)).to.be.equal('hello world friend');
//         });

//         it('should not remove commas in the middle of given string', function(){
//             var withMiddleCommas = 'hello, world, friend';

//             expect(util.trimTrailingCommas(withMiddleCommas)).to.be.equal('hello, world, friend');
//         });
//     });

//     describe('validateQuestionColumn', function(){
//         it('should return false for empty string or undefined', function(){
//             expect(util.validateQuestionColumn('')).to.be.false;
//             expect(util.validateQuestionColumn(undefined)).to.be.false;
//         });

//         it('should return true for correctly formatted question', function(){
//             var addQuestion = 'What is 123 + 345?',
//                 multiplyQuestion = 'What is 123 * 345?',
//                 divideQuestion = 'What is 123 - 345?',
//                 subtractQuestion = 'What is 123 / 345?';

//             expect(util.validateQuestionColumn(addQuestion)).to.be.true;
//             expect(util.validateQuestionColumn(multiplyQuestion)).to.be.true;
//             expect(util.validateQuestionColumn(divideQuestion)).to.be.true;
//             expect(util.validateQuestionColumn(subtractQuestion)).to.be.true;
//         });

//         it('should return false if question uses unexpected operation', function(){
//             var unexpectedOperatopn = 'What is 12 # 12?';
//             expect(util.validateQuestionColumn(unexpectedOperatopn)).to.be.false;
//         });

//         it('should return false if question uses unexpected operands', function(){
//             var unexpectedOperands = 'What is aa + bb?';
//             expect(util.validateQuestionColumn(unexpectedOperands)).to.be.false;
//         });

//         it('should return false if question does not use "What is ...?" format', function(){
//             var unexpectedQuestionFormat = 'Compute 12 + 14.';
//             expect(util.validateQuestionColumn(unexpectedQuestionFormat)).to.be.false;

//             unexpectedQuestionFormat = 'What is 12 + 14  ?';
//             expect(util.validateQuestionColumn(unexpectedQuestionFormat)).to.be.false;
//         });
//     });

//     describe('validateAnswerColumn', function(){
//         it('should return false for empty string or undefined', function(){
//             expect(util.validateAnswerColumn('')).to.be.false;
//             expect(util.validateAnswerColumn(undefined)).to.be.false;
//         });

//         it('should return true for integers', function(){
//             var positiveNum = '12234',
//                 negativeNum = '-123';

//             expect(util.validateAnswerColumn(positiveNum), 'pos').to.be.true;
//             expect(util.validateAnswerColumn(negativeNum), 'neg').to.be.true;
//         });

//         it('should return false for non-integers', function(){
//             var alphaNumeric = "1k23d4";
//             expect(util.validateAnswerColumn(alphaNumeric)).to.be.false;
//         })
//     });

//     describe('validateDistractorsColumn', function(){
//         it('should return false for empty string or undefined', function(){
//             expect(util.validateDistractorsColumn('')).to.be.false;
//             expect(util.validateDistractorsColumn(undefined)).to.be.false;
//         });

//         it('should return true for integers delimited by commas', function(){
//             var validDistractorsString = '123,-134,12233';
//             expect(util.validateDistractorsColumn(validDistractorsString)).to.be.true; 
//         });

//         it('should return false for non-integers', function(){
//             var alphaNumeric = "b33f,l0v3,d34d";
//             expect(util.validateDistractorsColumn(alphaNumeric)).to.be.false;
//         });

//         it('should return false for distractors with invalid delimiters', function(){
//             var delimitedByPipe = "b33f|l0v3|d34d";
//             expect(util.validateDistractorsColumn(delimitedByPipe)).to.be.false;

//             var delimitedByLodash = "b33f_l0v3_d34d";
//             expect(util.validateDistractorsColumn(delimitedByLodash)).to.be.false;

//             var commaLastOnly = "b33f_l0v3,d34d";
//             expect(util.validateDistractorsColumn(commaLastOnly)).to.be.false;

//             var commaFirstOnly = "b33f,l0v3_d34d";
//             expect(util.validateDistractorsColumn(commaFirstOnly)).to.be.false;

//         });
//     });

//     describe('validatePipeOccurences', function(){
//         it('should return true if rowString has 3 pipes', function(){
//             expect(util.validatePipeOccurences('a|b|c')).to.be.true;
//             expect(util.validatePipeOccurences('What is 1159 - 972?|187|8883')).to.be.true;
//         });

//         it('should return false if rowString is not delimited by 3 pipes', function(){
//             expect(util.validatePipeOccurences('a|b|c|d')).to.be.false;
//             expect(util.validatePipeOccurences('a-b-c')).to.be.false;
//         });
//     });

//     describe('areHeaderColumnsValid', function() {
//         it('should return true if headerColumns have text', function(){
//             expect(util.areHeaderColumnsValid(['a', 'b', 'c'])).to.be.true;
//         });

//         it('should return false, if headerColumns have empty string or undefined', function(){
//             expect(util.areHeaderColumnsValid(['a', '', 'c'])).to.be.false;
//             expect(util.areHeaderColumnsValid(['a', undefined, 'c'])).to.be.false;
//         });
//     });

//     describe('areColumnsValid', function() {
//         it('should return true if question, answer and distractors are valid', function(){
//             expect(util.areColumnsValid(['What is 20 - 30?', '-10', '10,9,11'])).to.be.true;
//         });

//         it('should return false if any column field is invalid', function(){
//             expect(util.areColumnsValid(['What is 20 - a?', '-10', '10,9,11'])).to.be.false;
//             expect(util.areColumnsValid(['What is 20 - 30?', 'a', '10,9,11'])).to.be.false;
//             expect(util.areColumnsValid(['What is 20 - 30?', '-10', 'a10,9,11'])).to.be.false;
//             expect(util.areColumnsValid(['What is 20 % 30?', '', '10,b,11'])).to.be.false;
//         });
//     });

//     it('zipListsIntoJson');
// });