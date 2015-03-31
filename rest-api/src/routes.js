var express = require('express');
var mongoose = require('mongoose');
var debug = require('debug')('code-challenge:routes');
var controller = require('./controller');

var router = express.Router();

router.get('/exercises', controller.getExercises);

router.get('/exercises/:id', controller.getExerciseById);

router.post('/exercises', controller.createExercise);

router.put('/exercises/:id', controller.updateExerciseById);

router.delete('/exercises/:id', controller.deleteExerciseById);

module.exports = router;
