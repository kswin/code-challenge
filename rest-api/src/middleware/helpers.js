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
    var criteria = {};

    if(!requestQuery) {
        return null;
    }

    if(requestQuery.keywords) {
        criteria.keywords = Array.isArray(requestQuery.keywords) 
            ? { $in: requestQuery.keywords} 
            : { $eq: requestQuery.keywords};
    }

    if(requestQuery.difficulty) {
        if(!exports.isValidDifficultyValue(requestQuery.difficulty)) {
            throw new Error('[Invalid Query Value] Difficulty must match "easy", "medium" or "hard".');
        }

        criteria.difficulty = { $eq: requestQuery.difficulty };
    }

    if(exports.isObjectEmpty(criteria)) {
        return null;
    }

    return criteria;
};

exports.buildSortString = function(requestQuery) {
    var sortKeys = requestQuery.sort.split(',');

    if(!exports.isValidSortKeyList(sortKeys)) {
        throw new Error('[Invalid Query Value] Sort keys must match "modified", "created" or "difficulty" with optional "-" in front to note descending order.');
    }

   return sortKeys.join(' ');
};

exports.isObjectEmpty = function(json) {
    //may not work in ie8-9
    return Object.keys(json).length === 0;
};