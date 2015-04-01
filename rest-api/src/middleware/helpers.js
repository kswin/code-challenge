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

exports.isValidDifficultyValue = function(difficulty) {
    return difficulty === 'hard' 
        || difficulty === 'medium'
        || difficulty === 'easy';
};

exports.isValidSortKeyList = function(sortKeys) {
    var sortKeyPattern = /^-?(created|modified|difficulty)$/,
        i, 
        length = sortKeys && sortKeys.length;

    if(length === 0 || sortKeys === null) {
        return false;
    }

    for(i = 0; i < length; i++) {
        if(!sortKeyPattern.test(sortKeys[i])) {
            return false;
        }
    }

    return true;
};

exports.buildCriteria = function(requestQuery) {
    if(!requestQueryObj) {
        return null;
    }

    var criteria = {};

    if(requestQuery.keywords) {
        criteria.keywords = Array.isArray(requestQuery.keywords) 
            ? { $in: requestQuery.keywords} 
            : { $eq: requestQuery.keywords};
    }

    if(requestQuery.difficulty) {
        if(!exports.isValidDifficultyValue(requestQuery.difficulty)) {
            next(new Error('Invalid value for difficulty param'));
        }

        criteria.difficulty = requestQuery.difficulty;
    }
};

exports.buildSortString = function(requestQuery) {
    var sortKeys = requestQueryObj.sort.split(',');

    if(exports.isValidSortKeyList(sortKeys)) {
       return sortKeys.join(' ');
    }

    return null;
};