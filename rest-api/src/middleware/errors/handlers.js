var BadRequest = require('./types/BadRequest');
var NotFound = require('./types/NotFound');

exports.logErrorHandler = function(err, req, res, next){
    console.error(err.stack);
    next(err);
};

exports.notFoundHandler = function(err, req, res, next){
    if(err instanceof NotFound) {
        res.status(404).json({
            code: 404,
            message: err.message
        });
    } else {
        next(err);
    }    
};

exports.badRequestHandler = function(err, req, res, next){
    if(err instanceof BadRequest) {
        res.status(400).json({
            code: 400,
            message: err.message
        });
    } else {
        next(err);
    }
};

exports.mongooseErrorHandler = function(err, req, res, next){
    var errors = err.errors,
        humanReadableMessage = [];

    debugger;

    if(errors && err.name === 'ValidationError') {

        res.status(400);

        humanReadableMessage.push(getHumanReadableMessage('question'));
        humanReadableMessage.push(getHumanReadableMessage('answer'));
        humanReadableMessage.push(getHumanReadableMessage('distractors'));

        console.log('done');

        res.json({
            code: 400,
            message: humanReadableMessage.join(' ').trim()
        });
    } else {
        next(err);
    }

    function getHumanReadableMessage(errorName) {
        debugger;

        if(errors[errorName] !== undefined) {
            return errors[errorName].message;
        }

        return '';
    };
};

exports.genericErrorHandler = function(err, req, res, next){
    res.status(500).json({
        code: 500,
        message: err.message
    });
};