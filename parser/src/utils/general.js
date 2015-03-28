exports.trimTrailingCommas = function(str) {
    return (str || '').replace(/,+$/g, '');  
};

exports.isEmptyString = function(str) {
    if(typeof str !== 'string') {
        throw new TypeError('isEmptyString requires string input');
    }

    return str === '';
};

exports.hasEmptyString = function (array) {
    if(!(array instanceof Array)) {
        throw new TypeError('hasEmptyString requires array input');
    }

    for(var i = 0, length = array && array.length; i < length; i++) {
        if(exports.isEmptyString(array[i])) {
            return true;
        }
    }
    return false;
};

exports.zipListsIntoJson = function(keys, values) {
    var result = {},
        i,
        keysLength = keys.length;

    if(exports.hasEmptyString(keys) && keysLength > 0) {
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