var mongoose = require('mongoose'),
    debug = require('debug')('code-challenge:model'),
    helpers = require('./middleware/helpers'),
    validators = require('./middleware/validators');

var ExerciseSchema = new mongoose.Schema({
    question: {
        type: 'String',
        required: true,
        trim: true
    },
    answer: {
        type: 'String',
        required: true,
        trim: true
    },
    distractors: [{
        type: 'String',
        required: true,
        trim: true
    }],
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date
    },
    difficulty: {
        type: 'String'
    },
    keywords: [{
        type: 'String',
        trim: true,
        lowercase: true
    }]
});

ExerciseSchema.pre('save', function(next) {
    var exercise = this;

    exercise.modified = new Date();

    exercise.difficulty = helpers.getDifficulty(exercise.distractors);

    try {
        validators.validateDistractors(exercise.distractors, exercise.answer);
    } catch (e) {
        next(e);
    }

    next();
});

var Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;