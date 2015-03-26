var exports = module.exports = {};

exports.hasCsvExtension = function(filename){
    var extensionPattern = /.csv$/g;

    return extensionPattern.test(filename);
};

exports.validateQuestionColumn = function(questionString){
    var questionPattern = /^What is \d+ (\+|\*|-|\/){1} \d+\?$/g;

    return questionPattern.test(questionString);
};

exports.validateAnswerColumn = function(answerString) {
    var answerPattern = /^-?\d+$/g;

    return answerPattern.test(answerString);
};

exports.validateDistractorsColumn = function(distractorsString){
    var distractorsPattern = /^(-?\d+(,|$))+$/g;

    return distractorsPattern.test(distractorsString);
};

exports.trimTrailingCommas = function(str){
    return (str || "").replace(/,+$/g, "");  
};

exports.validatePipeOccurences = function(rowString) {
    return rowString.split('|').length === 3;
};

exports.areHeaderColumnsValid = function (headerColumns) {
    var i;

    for (i = 0, length = headerColumns && headerColumns.length; i < length; i++) {
        if (headerColumns[i] === '' || headerColumns[i] === undefined) {
            return false
        }
    }

    return true;
};

exports.areColumnsValid = function(columns){
    return exports.validateQuestionColumn(columns[0])
        && exports.validateAnswerColumn(columns[1])
        && exports.validateDistractorsColumn(columns[2])
};

exports.zipListsIntoJson = function(keys, values) {
    var i,
        result = {};

    for(i = 0, length = keys && keys.length; i < length; i++) {
        result[keys[i]] = values[i];
    }

    return result;
};