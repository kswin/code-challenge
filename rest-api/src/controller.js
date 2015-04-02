var Exercise = require('./model'),
    debug = require('debug')('code-challenge:controller'),
    queryBuilders = require('./helpers/queryBuilders'),
    errorHandlers = require('./middleware/errors/handlers'),
    NotFound = require('./middleware/errors/types/NotFound');

exports.getExercises = function(req, res, next) {
    var criteria,
        sortString;

    try {
        criteria = queryBuilders.buildCriteria(req.query);
        sortString = req.query.sort ? queryBuilders.buildSortString(req.query) : '';
    } catch (err) {
        next(err);
        return;
    }

    Exercise.find(criteria, callback)
        .sort(sortString)
        .skip(queryBuilders.sanitizeOffset(req.query.offset))
        .limit(queryBuilders.sanitizeLimit(req.query.limit));

    function callback (err, exercises) {
        if (err) {
            console.log('getExercises: ' + err.name);
            next(err);
        }
        res.json(exercises);
    };
};

exports.getExerciseById = function(req, res, next) {
    Exercise.findById(req.params.id, callback);

    function callback(err, exercise) {
        if(!exercise) {
            return next(new NotFound('Exercise with id ' + req.params.id + ' is not found'));
        } else if (err) {
            console.log('getExerciseById: ' + err.name);
            return next(err);
        }

        res.json(exercise);
    };
};

exports.createExercise = function(req, res, next) {
    Exercise.create(req.body, callback);

    function callback(err, createdExercise) {
        if (err) {
            console.log('createdExercise: ' + err.name);
            return next(err);
        }
        res.json(createdExercise);
    };
};

exports.updateExerciseById = function(req, res, next) {
    Exercise.findById(req.params.id, callback);

    function callback(err, exercise) {
        if(!exercise) {
            return next(new NotFound('Exercise with id ' + req.params.id + ' is not found'));
        } else if (err) {
            console.log('updateExerciseById: ' + err.name);
            return next(err);
        }

        exercise.question = req.body.question || exercise.question;
        exercise.answer = req.body.answer || exercise.answer;
        exercise.distractors = req.body.distractors || exercise.distractors;
        exercise.keywords = req.body.keywords || exercise.keywords;

        exercise.save(function(err) {
            if (err) {
                return next(err);
            }

            res.json(exercise);
        });
    };
};

exports.deleteExerciseById = function(req, res, next) {
    Exercise.findByIdAndRemove(req.params.id, callback);

    function callback (err, deletedExercise) {
        if(!deletedExercise) {
            return next(new NotFound('Exercise with id ' + req.params.id + ' is not found'));
        } else if (err) {
            console.log('deleteExerciseById:' + err.name);
            return next(err);
        }
        res.json(deletedExercise);
    };
};