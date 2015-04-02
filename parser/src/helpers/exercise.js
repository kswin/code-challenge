var columnUtils = require('./column'),
    utils = require('./utils');

exports.sanitizeExercise = function(json) {
    if(typeof json.question !== 'string') {
        json.question = JSON.stringify(json.question);
    }

    if(typeof json.answer !== 'string') {
        json.answer = JSON.stringify(json.answer);
    }

    if(!Array.isArray(json.distractors)) {
        var distractors = json.distractors.split(',');
        json.distractors = utils.removeEmptyStringsFromArray(distractors);
    }

    var exerciseType = exports.getExerciseType(json.question);

    json.keywords = [exerciseType];

    return json;
};

exports.isValidExercise = function(json) {
    return columnUtils.isValidQuestionValue(json.question)
        && columnUtils.isValidAnswerValue(json.answer)
        && columnUtils.isValidDistractorsValue(json.distractors);
};

exports.getExerciseType = function(question) {
    var addition = /\+/,
        subtraction = /\-/,
        division = /\//,
        multiplication = /\*/;

    if(addition.test(question)){
        return 'addition';
    }

    if(subtraction.test(question)){
        return 'subtraction';
    }

    if(division.test(question)) {
        return 'division';
    }

    if(multiplication.test(question)) {
        return 'multiplication';
    }
};