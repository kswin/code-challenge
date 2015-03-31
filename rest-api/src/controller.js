var Exercise = require('./model'),
    debug = require('debug')('code-challenge:controller');

exports.getExercises = function(req, res, next) {
    var callback, 
        criteria;

    callback = function(err, exercises) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(exercises);
    };

    if(req.query) {
        criteria = {};
    }

    if(req.query.keywords) {
        criteria.keywords = Array.isArray(req.query.keywords) 
            ? { $in: req.query.keywords}
            : req.query.keywords
    }

    if(req.query.difficulty) {
        if(req.query.difficulty !== 'easy' && 
            req.query.difficulty !== 'medium' && 
            req.query.difficulty !== 'hard') {
            next(new Error('Invalid value for difficulty param'));
        }

        criteria.difficulty = req.query.difficulty;
    }

    var query = Exercise.find(criteria, callback);

    if(req.query.sortBy) {
        //TODO modified date?
        if(req.query.sortBy !== 'oldest' &&
            req.query.sortBy !== 'newest') {
            next(new Error('Invalid value for created param'));
        }

        query.sort({
            created: req.query.sortBy === 'oldest' ? 'asc' : 'desc'
        });
    }
};

exports.getExerciseById = function(req, res, next) {
    var callback = function(err, exercise) {
        if (err) {
            return next(err);
        }
        res.json(exercise);
    };

    Exercise.findById(req.params.id, callback);
};

exports.createExercise = function(req, res, next) {
    var callback = function(err, createdExercise) {
        if (err) {
            return next(err);
        }
        res.json(createdExercise);
    };
    debug('create ' + req.body);

    Exercise.create(req.body, callback);
};

exports.updateExerciseById = function(req, res, next) {
    Exercise.findById(req.params.id, function(err, exercise) {
        if (err) {
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
    });
};

exports.deleteExerciseById = function(req, res, next) {
    var callback = function(err, deletedExercise) {
        if (err) {
            return next(err);
        }
        res.json(deletedExercise);
    };

    Exercise.findByIdAndRemove(req.params.id, callback);
};