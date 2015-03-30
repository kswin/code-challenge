exports.trimTrailingCommas = function(str) {
    return (str || '').replace(/,+$/g, '');  
};

exports.isEmptyString = function(str) {
    return str === '';
};

exports.hasEmptyString = function (array) {
    for(var i = 0, length = array && array.length; i < length; i++) {
        if(exports.isEmptyString(array[i])) {
            return true;
        }
    }
    return false;
};

exports.removeEmptyStringsFromArray = function (array) {
    var result = [],
        currentVal,
        i,
        length = array && array.length;

    for(i = 0; i < length; i++){
        currentVal = array[i];

        if(!exports.isEmptyString(currentVal)) {
            result.push(currentVal);
        }
    }

    return result;
};

exports.zipListsIntoJson = function(keys, values) {
    var result = {},
        i,
        keysLength = keys.length;

    if(!(keys instanceof Array) || keysLength === 0) {
        throw new TypeError('Keys must be an array of non-empty values');
    }

    if(exports.hasEmptyString(keys)) {
        throw new Error('Keys must not have empty strings: ' + keys);
    }

    for(i = 0; i < keysLength; i++) {
        result[keys[i]] = values[i];
    }

    return result;
};

exports.hasFileExtension = function(filename, extension){
    var extensionPattern = new RegExp("." + extension + "$", "g");

    return extensionPattern.test(filename);
};

exports.isValidJsonString = function(string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};