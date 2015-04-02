var utils = require('./utils'),
    validators = require('./validators'),
    debug = require('debug');

exports.sanitizeOffset = function(queryOffset) {
    var offset = queryOffset && utils.parseInt(queryOffset);

    if(!queryOffset || !Number.isFinite(offset)) {
        return 0;
    } 

    return offset;
};

exports.sanitizeLimit = function(queryLimit) {
    var limit = queryLimit && utils.parseInt(queryLimit);

    if(!queryLimit || !Number.isFinite(limit)) {
        return 20;
    }

    return limit;
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
        debug('hi: ' + requestQuery.difficulty);
        validators.validateDifficultyValue(requestQuery.difficulty);
        criteria.difficulty = { $eq: requestQuery.difficulty };
    }

    if(utils.isObjectEmpty(criteria)) {
        return null;
    }

    return criteria;
};

exports.buildSortString = function(requestQuery) {
    var sortKeys = requestQuery.sort.split(',');

    validators.validateSortKeys(sortKeys);

   return sortKeys.join(' ');
};