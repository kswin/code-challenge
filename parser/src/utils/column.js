var exports = module.exports = {};

exports.isValidQuestionValue = function(questionString){
    var questionPattern = /^What is \d+ (\+|\*|-|\/){1} \d+\?$/g;

    return questionPattern.test(questionString);
};

exports.isValidAnswerValue = function(answerString) {
    var answerPattern = /^-?\d+$/g;

    return answerPattern.test(answerString);
};

exports.isValidDistractorsValue = function(distractorsString) {
    var distractorsPattern = /(-?\d+(,|$))+$/g;

    return distractorsPattern.test(distractorsString);
};

exports.sanitizeColumnValues = function(columnValues) {
    //TODO
};