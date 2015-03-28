var util = require('./util'),
    exports = module.exports = {};

exports.parseRow = function(row) {
    if(exports.hasPipeOccurences(row, 3)){
        return row.split('|');
    } else {
        throw new Error('Unexpected number of columns in row: ' + row);
    }
};

exports.hasPipeOccurences = function(row, numOccurences) {
    return row.split('|').length === numOccurences;
};