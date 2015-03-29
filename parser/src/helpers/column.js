exports.isValidQuestionValue = function(question){
    var questionPattern = /^What is \d+ (\+|\*|-|\/){1} \d+\?$/g;

    return questionPattern.test(question);
};

exports.isValidAnswerValue = function(answer) {
    var answerPattern = /^-?\d+$/g;

    return answerPattern.test(answer);
};

exports.isValidDistractorsValue = function(distractors) {
    var i,
        length = distractors && distractors.length;

    if(length === 0 || !(distractors instanceof Array) ) {
        return false;
    }

    for(i = 0; i < length; i++) {
        if(!exports.isValidAnswerValue(distractors[i])) {
            return false;
        }
    }

    return true;
};