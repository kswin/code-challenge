var debug = require('debug')('code-challenge:model');

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

            throw new Error('Distractor should not match answer');
        }

        if(distractors[i] === distractors[i+1]){
            throw new Error('Distractor list should not have duplicate values');
        }
    }
};