exports.parseLine = function(line) {
    if(exports.hasPipeOccurences(line, 3)){
        return line.split('|');
    } else {
        throw new Error('Unexpected number of columns in row: ' + line);
    }
};

exports.hasPipeOccurences = function(line, numOccurences) {
    return line.split('|').length === numOccurences;
};