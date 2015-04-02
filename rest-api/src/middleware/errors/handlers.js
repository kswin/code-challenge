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

exports.genericErrorHandler = function(err, req, res, next){
    res.status(500).json({
        code: 500,
        message: err.message
    });
};