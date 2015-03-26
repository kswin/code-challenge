var express = require('express');
var mongoose = require('mongoose');
var debug = require('debug');
var Exercise = require('./model');

var router = express.Router();

router.get('/exercises', function(req, res, next) {
    var callback = function (err, exercises) {
        if (err) {
            return next(err);
        }
        res.json(exercises);
    };

    Exercise.find(callback);
});

router.get('/exercises/:id', function(req, res, next) {
    var callback = function (err, exercise) {
        if (err) {
            return next(err);
        }
        res.json(exercise);
    };

    Exercise.findById(req.params.id, callback);
});

router.post('/exercises', function(req, res, next) {
    var callback = function (err, createdExercise) {
        if (err) {
            return next(err);
        }
        res.json(createdExercise);
    };

    Exercise.create(req.body, callback);
});

router.put('/exercises/:id', function(req, res, next) {
    var callback = function(err, updatedExercise) {
        if (err) {
            return next(err);
        }
        res.json(updatedExercise);
    };

    Exercise.findByIdAndUpdate(req.params.id, req.body, {}, callback);
});

router.delete('/exercises/:id', function(req, res, next) {
    var callback = function(err, deletedExercise) {
        if(err) {
            return next(err);
        }
        res.json(deletedExercise);
    };

    Exercise.findByIdAndRemove(req.params.id, callback);
});


module.exports = router;
