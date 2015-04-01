var Exercise = require('./model'),
    debug = require('debug')('code-challenge:controller'),
    helpers = require('./middleware/helpers');

exports.getExercises = function(req, res, next) {
    var criteria,
        sortString,
        query;

    try {
        criteria = helpers.buildCriteria(req.query);

        query = Exercise.find(criteria, function(err, exercises) {
            if (err) {
                return next(err);
            }
            res.json(exercises);
        });

        if(req.query.sort){
            sortString = helpers.buildSortString(req.query);
            query.sort(sortString);
        }

        query.skip(helpers.getOffset(req.query))
            .limit(helpers.getLimit(req.query));

    } catch (e) {
        next(e);
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