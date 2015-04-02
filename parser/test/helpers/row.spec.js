var expect = require('chai').expect;
var rowUtils = require('../../src/helpers/row');

describe('[Parser] Row helper functions', function(){
    describe('parseLine', function() {
        it('should throw error if input has an unexpected number of pipes', function(){
            expect(rowUtils.parseLine.bind(null, 'What is 1754 - 3936?|-2182|3176,6529,6903|subtraction'))
                .to.throw(Error);
        });

        it('should return an array of substrings using pipe as the delimiter', function() {
            expect(rowUtils.parseLine('What is 1754 - 3936?|-2182|3176,6529,6903')).to.be.deep.equal([
                'What is 1754 - 3936?',
                '-2182',
                '3176,6529,6903'
            ]);
        });
    });

    describe('hasPipeOccurences', function(){
        it('should return true if rowString has 3 pipes', function(){
            expect(rowUtils.hasPipeOccurences('a|b|c', 3)).to.be.true;
            expect(rowUtils.hasPipeOccurences('What is 1159 - 972?|187|8883', 3)).to.be.true;
        });

        it('should return false if rowString is not delimited by 3 pipes', function(){
            expect(rowUtils.hasPipeOccurences('a|b|c|d', 3)).to.be.false;
            expect(rowUtils.hasPipeOccurences('a-b-c', 3)).to.be.false;
        });
    });
});