var columnHelpers = require('./column'),
    generalHelpers = require('./general');

exports.sanitizeExercise = function(json) {
    if(typeof json.question !== 'string') {
        json.question = JSON.stringify(json.question);
    }

    if(typeof json.answer !== 'string') {
        json.answer = JSON.stringify(json.answer);
    }

    if(!(json.distractors instanceof Array)) {
        var distractors = json.distractors.split(',');
        json.distractors = generalHelpers.removeEmptyStringsFromArray(distractors);
    }

    return json;
};

exports.isValidExercise = function(json) {
    return columnHelpers.isValidQuestionValue(json.question)
        && columnHelpers.isValidAnswerValue(json.answer)
        && columnHelpers.isValidDistractorsValue(json.distractors);
};