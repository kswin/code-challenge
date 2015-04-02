var debug = require('debug')('code-challenge:model'),
    BadRequest = require('../middleware/errors/types/BadRequest');

exports.validateDistractors = function (distractors, answer) {
    var i,
        distractorsLength = distractors && distractors.length;

    if(distractorsLength === 0) {
        throw new Error('Distractor list should not be empty');
    }

    distractors.sort();

    for(i = 0; i < distractorsLength; i++) {
        debug('Save: current distractor: ' + distractors[i] + ' answer: ' + answer);

        if(distractors[i] === answer) {
            debug('distractor matches answer!');

            throw new BadRequest('Distractor should not match answer');
        }

        if(distractors[i] === distractors[i+1]){
            throw new BadRequest('Distractor list should not have duplicate values');
        }
    }

    return true;
};

exports.validateDifficultyValue = function(difficulty) {
    if (difficulty !== 'hard' 
        && difficulty !== 'medium'
        && difficulty !== 'easy') {

        throw new BadRequest('Difficulty must match "easy", "medium" or "hard".');
    }

    return true;
};

exports.validateSortKeys = function(sortKeys) {
    var sortKeyPattern = /^-?(created|modified|difficulty)$/,
        i, 
        length = sortKeys && sortKeys.length;

    if(length === 0 || sortKeys === null) {
        throw new BadRequest('Sort keys must be defined.');
    }

    for(i = 0; i < length; i++) {
        if(!sortKeyPattern.test(sortKeys[i])) {
            throw new BadRequest('Sort keys must match "modified", "created" or "difficulty" with optional "-" in front to note descending order.');
        }
    }

    return true;
};