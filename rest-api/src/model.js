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

ExerciseSchema.methods.setDifficultyLevel = function() {
    if (distractors.length >= 4) {
        this.difficulty = 'hard';
    }

    if (distractors.length >= 2) {
        this.difficulty = 'medium';
    }

    if (distractors.length >= 1) {
        this.difficulty = 'easy';
    };
};

ExerciseSchema.pre('save', function(next) {
    var exercise = this;

    exercise.modified = new Date();

    exercise.setDifficultyLevel();

    try {
        validators.validateDistractors(exercise.distractors, exercise.answer);
    } catch (e) {
        next(e);
    }

    next();
});

ExerciseSchema.index({keywords: 1});

var Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;