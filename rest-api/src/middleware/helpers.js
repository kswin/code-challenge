exports.getDifficulty = function(distractors) {
    if (distractors.length >= 4) {
        return 'hard';
    }

    if (distractors.length >= 2) {
        return 'medium';
    }

    if (distractors.length >= 1) {
        return 'easy';
    };
};