exports.isObjectEmpty = function(json) {
    //may not work in ie8-9
    return Object.keys(json).length === 0;
};

exports.parseInt = function(value) {
    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
        return Number(value);
    }
    return NaN;
};